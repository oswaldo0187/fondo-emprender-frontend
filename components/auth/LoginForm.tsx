"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type LoginFormData = {
  email: string;
  password: string;
};

type LoginFormErrors = Partial<Record<keyof LoginFormData, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [generalError, setGeneralError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const validateForm = (): LoginFormErrors => {
    const nextErrors: LoginFormErrors = {};

    if (!formData.email.trim()) {
      nextErrors.email = "El email es obligatorio";
    } else if (!EMAIL_REGEX.test(formData.email)) {
      nextErrors.email = "Ingresa un email válido";
    }

    if (!formData.password) {
      nextErrors.password = "La contraseña es obligatoria";
    }

    return nextErrors;
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
    setGeneralError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setGeneralError("");

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setGeneralError("Credenciales incorrectas");
        return;
      }

      if (result?.ok) {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setGeneralError("Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label
          htmlFor="email"
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          disabled={loading}
        />
        {errors.email ? (
          <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          aria-invalid={Boolean(errors.password)}
          aria-describedby={errors.password ? "password-error" : undefined}
          disabled={loading}
        />
        {errors.password ? (
          <p
            id="password-error"
            className="mt-1 text-sm text-red-600"
            role="alert"
          >
            {errors.password}
          </p>
        ) : null}
      </div>

      {generalError ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
          {generalError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-300"
      >
        {loading ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
}
