import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <section className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-semibold text-slate-900">
          Iniciar sesión
        </h1>
        <LoginForm />
      </section>
    </main>
  );
}
