import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-100">
      <div className="bg-primary text-white p-18 rounded-lg shadow-medium space-y-6">
        
        <h1 className="text-3xl font-primary">
          Este es Inter (Primary)
        </h1>

        <p className="text-xl font-secondary">
          Este debería verse diferente usando Roboto (Secondary)
        </p>

      </div>
    </main>
  );
}