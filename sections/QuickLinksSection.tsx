import type { ReactNode } from 'react';
import {
  Bell,
  FileText,
  Layers3,
  ShieldCheck,
} from 'lucide-react';
import QuickLinkCard from '@/components/QuickLinkCard';

interface QuickLinkItem {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
}

const quickLinks: QuickLinkItem[] = [
  {
    title: 'Convocatorias',
    description: 'Consulta oportunidades abiertas y filtra por categoria.',
    href: '/convocatorias',
    icon: <Layers3 size={22} aria-hidden="true" />,
  },
  {
    title: 'Noticias',
    description: 'Mantente al dia con novedades y comunicados del portal.',
    href: '/noticias',
    icon: <Bell size={22} aria-hidden="true" />,
  },
  {
    title: 'Requisitos',
    description: 'Revisa criterios y documentos para aplicar correctamente.',
    href: '/quienes-somos',
    icon: <FileText size={22} aria-hidden="true" />,
  },
  {
    title: 'Soporte y Contacto',
    description: 'Encuentra canales oficiales para resolver inquietudes.',
    href: '/contacto',
    icon: <ShieldCheck size={22} aria-hidden="true" />,
  },
];

const accentBackgrounds = [
  'bg-gradient-to-br from-emerald-50 to-white',
  'bg-gradient-to-br from-cyan-50 to-white',
  'bg-gradient-to-br from-sky-50 to-white',
  'bg-gradient-to-br from-teal-50 to-white',
];

export default function QuickLinksSection() {
  return (
    <section aria-labelledby="quick-links-title" className="mt-10">
      <div className="mb-5 flex items-end justify-between gap-3">
        <div>
          <h2 id="quick-links-title" className="text-2xl font-bold text-slate-900">
            Accesos Directos
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Ingresa rapidamente a las funcionalidades mas consultadas.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {quickLinks.map((item, index) => (
          <QuickLinkCard
            key={item.title}
            title={item.title}
            description={item.description}
            href={item.href}
            icon={item.icon}
            accentClassName={accentBackgrounds[index % accentBackgrounds.length]}
          />
        ))}
      </div>
    </section>
  );
}