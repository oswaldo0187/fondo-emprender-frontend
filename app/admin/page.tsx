export default function AdminPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <section className="w-full max-w-2xl rounded-xl bg-white p-8 shadow-md">
        <h1 className="mb-3 text-3xl font-semibold text-slate-900">Panel de administracion</h1>
        <p className="text-slate-600">
          Esta ruta esta protegida por middleware y solo permite usuarios con rol ADMIN.
        </p>
      </section>
    </main>
  );
}