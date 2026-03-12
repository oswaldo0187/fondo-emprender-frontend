import Link from 'next/link';
import QuickLinksSection from '@/sections/QuickLinksSection';
import {
  fetchBanner,
  fetchConvocatorias,
  fetchNews,
  fetchStatistics,
  type Banner,
  type Convocatoria,
  type NewsItem,
  type Statistics,
} from '@/lib/api';

interface BannerSectionProps {
  banner: Banner | null;
}

interface NewsSectionProps {
  news: NewsItem[];
}

interface ConvocatoriasSectionProps {
  convocatorias: Convocatoria[];
}

interface StatisticsSectionProps {
  statistics: Statistics;
}

function BannerSection({ banner }: BannerSectionProps) {
  return (
    <section style={{ marginTop: '2rem' }}>
      <h2>Banner</h2>
      <p>{banner?.title ?? 'No hay banner activo.'}</p>
    </section>
  );
}

function NewsSection({ news }: NewsSectionProps) {
  return (
    <section style={{ marginTop: '2rem' }}>
      <h2>Noticias</h2>
      <ul>
        {news.length > 0 ? (
          news.map((item) => <li key={item.id}>{item.title}</li>)
        ) : (
          <li>No hay noticias disponibles.</li>
        )}
      </ul>
    </section>
  );
}

function ConvocatoriasSection({
  convocatorias,
}: ConvocatoriasSectionProps) {
  return (
    <section style={{ marginTop: '2rem' }}>
      <h2>Convocatorias activas</h2>
      <ul>
        {convocatorias.length > 0 ? (
          convocatorias.map((item) => <li key={item.id}>{item.title}</li>)
        ) : (
          <li>No hay convocatorias activas.</li>
        )}
      </ul>
    </section>
  );
}

function StatisticsSection({ statistics }: StatisticsSectionProps) {
  return (
    <section style={{ marginTop: '2rem' }}>
      <h2>Estadisticas</h2>
      <ul>
        <li>Convocatorias activas: {statistics.activeConvocatorias}</li>
        <li>Noticias publicadas: {statistics.publishedNews}</li>
        <li>Postulaciones registradas: {statistics.totalApplications}</li>
      </ul>
    </section>
  );
}

export default async function Page() {
  const [news, convocatorias, banner, statistics] = await Promise.all([
    fetchNews(),
    fetchConvocatorias(),
    fetchBanner(),
    fetchStatistics(),
  ]);

  return (
    <main style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1>Fondo Emprender</h1>
      <p>Bienvenido. Estos datos se cargan en el servidor.</p>

      <BannerSection banner={banner} />
      <ConvocatoriasSection convocatorias={convocatorias} />
      <NewsSection news={news} />
      <StatisticsSection statistics={statistics} />

      <QuickLinksSection />

      <nav style={{ marginTop: '2rem' }}>
        <ul>
          <li>
            <Link href="/quienes-somos">Quienes Somos</Link>
          </li>
          <li>
            <Link href="/convocatorias">Convocatorias</Link>
          </li>
          <li>
            <Link href="/noticias">Noticias</Link>
          </li>
          <li>
            <Link href="/contacto">Contacto</Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}