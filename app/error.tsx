"use client";

import { useEffect } from 'react';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error('Error rendering home route:', error);
  }, [error]);

  return (
    <main style={{ padding: '2rem', maxWidth: '720px', margin: '0 auto' }}>
      <h1>Ocurrio un problema</h1>
      <p>
        No pudimos cargar la informacion en este momento. Intenta nuevamente en
        unos segundos.
      </p>
      <button
        type="button"
        onClick={reset}
        style={{
          marginTop: '1rem',
          padding: '0.75rem 1rem',
          border: '1px solid #222',
          borderRadius: '8px',
          background: '#fff',
          cursor: 'pointer',
        }}
      >
        Reintentar
      </button>
    </main>
  );
}
