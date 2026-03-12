import { expect, test } from '@playwright/test';

interface AnchorSnapshot {
  href: string;
  target: string;
  rel: string;
  text: string;
}

interface FocusSnapshot {
  tag: string;
  className: string;
  isVisible: boolean;
  hasOutline: boolean;
  hasBoxShadow: boolean;
  hasFocusClassHint: boolean;
}

const INTERACTIVE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[role="button"]',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

const disallowedUrlChars = /\s|undefined|null/;

function isInternalPath(href: string): boolean {
  return href.startsWith('/') && !href.startsWith('//');
}

function isExternalUrl(href: string, baseURL: string): boolean {
  if (!/^https?:\/\//i.test(href)) {
    return false;
  }

  try {
    return new URL(href).origin !== new URL(baseURL).origin;
  } catch {
    return true;
  }
}

test.describe('Home link and navigation validation', () => {
  test('internal links resolve and are clean URLs', async ({ page, baseURL }) => {
    const currentBaseURL = baseURL ?? 'http://127.0.0.1:3000';

    await page.goto('/', { waitUntil: 'networkidle' });

    const anchors = await page.locator('a[href]').evaluateAll((nodes) => {
      return nodes.map((node) => ({
        href: node.getAttribute('href') ?? '',
        target: node.getAttribute('target') ?? '',
        rel: node.getAttribute('rel') ?? '',
        text: node.textContent?.trim() ?? '',
      }));
    });

    const internalAnchors = anchors.filter((anchor) => isInternalPath(anchor.href));
    expect(internalAnchors.length).toBeGreaterThan(0);

    const malformedLinks = internalAnchors.filter(
      (anchor) => disallowedUrlChars.test(anchor.href) || anchor.href.includes('??')
    );

    expect(
      malformedLinks,
      `Internal links malformed: ${JSON.stringify(malformedLinks, null, 2)}`
    ).toEqual([]);

    const linksWithQueryParams = internalAnchors.filter((anchor) => anchor.href.includes('?'));
    expect(
      linksWithQueryParams,
      `Internal links should avoid query params: ${JSON.stringify(linksWithQueryParams, null, 2)}`
    ).toEqual([]);

    const uniqueInternalPaths = [...new Set(internalAnchors.map((anchor) => anchor.href))];

    for (const path of uniqueInternalPaths) {
      const response = await page.goto(new URL(path, currentBaseURL).toString(), {
        waitUntil: 'domcontentloaded',
      });

      expect(response, `No response navigating to ${path}`).not.toBeNull();
      expect(response?.status(), `${path} returned HTTP 404`).not.toBe(404);
      expect(
        page.url().includes('/404'),
        `${path} redirected to 404 page`
      ).toBeFalsy();
    }
  });

  test('external links use target blank and secure rel', async ({ page, baseURL }) => {
    const currentBaseURL = baseURL ?? 'http://127.0.0.1:3000';

    await page.goto('/', { waitUntil: 'networkidle' });

    const anchors: AnchorSnapshot[] = await page.locator('a[href]').evaluateAll((nodes) => {
      return nodes.map((node) => ({
        href: node.getAttribute('href') ?? '',
        target: node.getAttribute('target') ?? '',
        rel: node.getAttribute('rel') ?? '',
        text: node.textContent?.trim() ?? '',
      }));
    });

    const externalLinks = anchors.filter((anchor) => isExternalUrl(anchor.href, currentBaseURL));

    for (const link of externalLinks) {
      expect(link.target, `External link missing target _blank: ${link.href}`).toBe('_blank');

      const relTokens = link.rel.toLowerCase().split(/\s+/).filter(Boolean);
      expect(relTokens, `External link missing noopener: ${link.href}`).toContain('noopener');
      expect(relTokens, `External link missing noreferrer: ${link.href}`).toContain('noreferrer');
    }
  });

  test('keyboard navigation reaches interactive elements with visible focus', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    const interactiveCount = await page.locator(INTERACTIVE_SELECTOR).count();
    expect(interactiveCount).toBeGreaterThan(0);

    const focusSnapshots: FocusSnapshot[] = [];
    const maxTabs = Math.min(interactiveCount, 25);

    for (let i = 0; i < maxTabs; i += 1) {
      await page.keyboard.press('Tab');
      const focusState = await page.evaluate(() => {
        const active = document.activeElement as HTMLElement | null;
        if (!active) {
          return null;
        }

        const interactiveSelector = [
          'a[href]',
          'button:not([disabled])',
          'input:not([disabled])',
          'select:not([disabled])',
          'textarea:not([disabled])',
          '[role="button"]',
          '[tabindex]:not([tabindex="-1"])',
        ].join(',');

        if (!active.matches(interactiveSelector)) {
          return null;
        }

        const style = window.getComputedStyle(active);
        const rect = active.getBoundingClientRect();
        const className = active.className ?? '';
        const hasOutline = style.outlineStyle !== 'none' && style.outlineWidth !== '0px';
        const hasBoxShadow = style.boxShadow !== 'none';

        return {
          tag: active.tagName.toLowerCase(),
          className,
          isVisible: rect.width > 0 && rect.height > 0,
          hasOutline,
          hasBoxShadow,
          hasFocusClassHint: /focus|ring|outline/.test(className),
        };
      });

      if (focusState) {
        focusSnapshots.push(focusState);
      }
    }

    expect(focusSnapshots.length).toBeGreaterThan(0);

    const invisibles = focusSnapshots.filter((item) => !item.isVisible);
    expect(invisibles, `Focused elements not visible: ${JSON.stringify(invisibles, null, 2)}`).toEqual([]);

    const noFocusIndicators = focusSnapshots.filter(
      (item) => !item.hasOutline && !item.hasBoxShadow && !item.hasFocusClassHint
    );
    expect(
      noFocusIndicators,
      `Focused elements without visible focus style: ${JSON.stringify(noFocusIndicators, null, 2)}`
    ).toEqual([]);

    const firstFocusable = page.locator(INTERACTIVE_SELECTOR).first();
    await firstFocusable.focus();
    const firstHref = await firstFocusable.getAttribute('href');

    if (firstHref && isInternalPath(firstHref)) {
      await page.keyboard.press('Enter');
      await expect(page).toHaveURL(new RegExp(`${firstHref.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`));
    }

    await page.keyboard.press('Shift+Tab');
    const hasActiveElementAfterReverseTab = await page.evaluate(() => {
      return Boolean(document.activeElement);
    });
    expect(hasActiveElementAfterReverseTab).toBeTruthy();
  });

  test('no browser console errors or 404 responses during home navigation', async ({ page }) => {
    const consoleErrors: string[] = [];
    const responses404: string[] = [];

    page.on('console', (message) => {
      if (message.type() === 'error') {
        consoleErrors.push(message.text());
      }
    });

    page.on('response', (response) => {
      if (response.status() === 404) {
        responses404.push(response.url());
      }
    });

    await page.goto('/', { waitUntil: 'networkidle' });

    const internalPaths = await page.locator('a[href^="/"]').evaluateAll((nodes) => {
      return [...new Set(nodes.map((node) => node.getAttribute('href') ?? '').filter(Boolean))];
    });

    for (const path of internalPaths) {
      await page.goto(path, { waitUntil: 'domcontentloaded' });
    }

    expect(
      consoleErrors,
      `Console errors detected while validating navigation: ${JSON.stringify(consoleErrors, null, 2)}`
    ).toEqual([]);
    expect(
      responses404,
      `HTTP 404 responses detected while validating navigation: ${JSON.stringify(responses404, null, 2)}`
    ).toEqual([]);
  });
});