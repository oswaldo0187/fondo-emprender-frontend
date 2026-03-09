import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-100 p-10">
      <div className="mx-auto max-w-3xl rounded-lg bg-white p-8 shadow-medium">
        <h1 className="mb-3 text-4xl font-primary text-neutral-900">
          Fondo Emprender
        </h1>
        <p className="mb-6 text-lg font-secondary text-neutral-700">
          Bienvenido. Selecciona una sección para navegar por el sitio.
        </p>

        <nav>
          <ul className="space-y-3">
            <li>
              <Link
                href="/quienes-somos"
                className="text-lg font-primary text-blue-700 underline-offset-4 hover:underline"
              >
                Quienes Somos
              </Link>
            </li>
            <li>
              <Link
                href="/convocatorias"
                className="text-lg font-primary text-blue-700 underline-offset-4 hover:underline"
              >
                Convocatorias
              </Link>
            </li>
            <li>
              <Link
                href="/noticias"
                className="text-lg font-primary text-blue-700 underline-offset-4 hover:underline"
              >
                Noticias
              </Link>
            </li>
            <li>
              <Link
                href="/contacto"
                className="text-lg font-primary text-blue-700 underline-offset-4 hover:underline"
              >
                Contacto
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  );
}