'use client';

import Link from 'next/link';
import {
  useActiveBanner,
  useActiveConvocatorias,
  useNews,
} from '../hooks/useHomeData';

export default function Home() {
  const {
    data: news,
    error: newsError,
    isLoading: newsLoading,
  } = useNews(3);
  const {
    data: convocatorias,
    error: convocatoriasError,
    isLoading: convocatoriasLoading,
  } = useActiveConvocatorias();
  const {
    data: banner,
    error: bannerError,
    isLoading: bannerLoading,
  } = useActiveBanner();

  return (
    <main style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1>Fondo Emprender</h1>
      <p>Bienvenido. Estos datos se cargan de forma dinamica desde la API.</p>

      <section style={{ marginTop: '2rem' }}>
        <h2>Banner</h2>
        {bannerLoading && <p>Cargando...</p>}
        {bannerError && <p>Error al cargar el banner.</p>}
        {!bannerLoading && !bannerError && (
          <p>{banner?.title ?? 'No hay banner activo.'}</p>
        )}
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Convocatorias activas</h2>
        {convocatoriasLoading && <p>Cargando...</p>}
        {convocatoriasError && <p>Error al cargar las convocatorias.</p>}
        {!convocatoriasLoading && !convocatoriasError && (
          <ul>
            {convocatorias && convocatorias.length > 0 ? (
              convocatorias.map((item) => <li key={item.id}>{item.title}</li>)
            ) : (
              <li>No hay convocatorias activas.</li>
            )}
          </ul>
        )}
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Noticias</h2>
        {newsLoading && <p>Cargando...</p>}
        {newsError && <p>Error al cargar las noticias.</p>}
        {!newsLoading && !newsError && (
          <ul>
            {news && news.length > 0 ? (
              news.slice(0, 3).map((item) => <li key={item.id}>{item.title}</li>)
            ) : (
              <li>No hay noticias disponibles.</li>
            )}
          </ul>
        )}
      </section>

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