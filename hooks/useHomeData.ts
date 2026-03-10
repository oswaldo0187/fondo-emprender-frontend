'use client';

import useSWR from 'swr';

export interface NewsItem {
  id: number | string;
  title: string;
  summary?: string;
  imageUrl?: string;
  publishedAt?: string;
  slug?: string;
}

export interface Convocatoria {
  id: number | string;
  title: string;
  description?: string;
  isActive: boolean;
  openDate?: string;
  closeDate?: string;
}

export interface Banner {
  id: number | string;
  title: string;
  imageUrl: string;
  link?: string;
  isActive: boolean;
}

export interface HookState<T> {
  data: T | undefined;
  error: Error | undefined;
  isLoading: boolean;
}

const SWR_OPTIONS = {
  revalidateOnFocus: true,
  dedupingInterval: 60_000,
};

const MOCK_DELAY_MS = 500;

const mockNews: NewsItem[] = [
  {
    id: 1,
    title: 'Se abren nuevas oportunidades para emprendimientos sostenibles',
    summary: 'Convocatoria orientada a proyectos con enfoque ambiental.',
    publishedAt: '2026-03-08',
    slug: 'oportunidades-emprendimientos-sostenibles',
  },
  {
    id: 2,
    title: 'Fondo Emprender impulsa iniciativas de base tecnologica',
    summary: 'Nuevas lineas de apoyo para startups en etapa temprana.',
    publishedAt: '2026-03-07',
    slug: 'apoyo-startups-tecnologia',
  },
  {
    id: 3,
    title: 'Programa de acompanamiento para emprendedores regionales',
    summary: 'Mentorias y formacion especializada en gestion empresarial.',
    publishedAt: '2026-03-06',
    slug: 'acompanamiento-emprendedores-regionales',
  },
  {
    id: 4,
    title: 'Resultados preliminares de convocatorias del primer trimestre',
    summary: 'Se publicaron avances del proceso de evaluacion.',
    publishedAt: '2026-03-05',
    slug: 'resultados-preliminares-convocatorias',
  },
];

const mockConvocatorias: Convocatoria[] = [
  {
    id: 'c-101',
    title: 'Convocatoria Nacional de Innovacion 2026',
    description: 'Dirigida a proyectos con componente de innovacion aplicada.',
    isActive: true,
    openDate: '2026-03-01',
    closeDate: '2026-04-15',
  },
  {
    id: 'c-102',
    title: 'Convocatoria Economia Popular y Solidaria',
    description: 'Apoyo a unidades productivas comunitarias.',
    isActive: true,
    openDate: '2026-02-20',
    closeDate: '2026-04-01',
  },
  {
    id: 'c-103',
    title: 'Convocatoria Reactivacion Local para MiPymes',
    description: 'Financiacion para crecimiento y fortalecimiento comercial.',
    isActive: false,
    openDate: '2026-01-15',
    closeDate: '2026-02-28',
  },
];

const mockBanner: Banner = {
  id: 'b-1',
  title: 'Postulate hoy y transforma tu idea en empresa',
  imageUrl: '/banner-home.jpg',
  link: '/convocatorias',
  isActive: true,
};

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const mockFetcher = async <T>(factory: () => T): Promise<T> => {
  await delay(MOCK_DELAY_MS);
  return factory();
};

export const useNews = (limit: number): HookState<NewsItem[]> => {
  const { data, error, isLoading } = useSWR<NewsItem[], Error>(
    ['mock/news', limit],
    () => mockFetcher(() => mockNews.slice(0, limit)),
    SWR_OPTIONS
  );

  return {
    data,
    error,
    isLoading,
  };
};

export const useActiveConvocatorias = (): HookState<Convocatoria[]> => {
  const { data, error, isLoading } = useSWR<Convocatoria[], Error>(
    'mock/convocatorias/active',
    () =>
      mockFetcher(() => mockConvocatorias.filter((item) => item.isActive)),
    SWR_OPTIONS
  );

  return {
    data,
    error,
    isLoading,
  };
};

export const useActiveBanner = (): HookState<Banner | null> => {
  const { data, error, isLoading } = useSWR<Banner | null, Error>(
    'mock/banner/active',
    () => mockFetcher(() => (mockBanner.isActive ? mockBanner : null)),
    SWR_OPTIONS
  );

  return {
    data,
    error,
    isLoading,
  };
};
