import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <section className="w-full max-w-lg rounded-xl bg-white p-8 text-center shadow-md">
        <h1 className="mb-3 text-2xl font-semibold text-slate-900">Acceso denegado</h1>
        <p className="mb-6 text-slate-600">
          No tienes permisos para acceder a esta seccion.
        </p>
        <Link
          href="/"
          className="inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Volver al inicio
        </Link>
      </section>
    </main>
  );
}