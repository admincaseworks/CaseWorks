import type { Metadata } from 'next';
import './globals.css';

const SITE_URL = 'https://caseworks-gestao-de-obras.vercel.app';
const DESC =
  'CaseWorks é o sistema de gestão de obras de engenharia que reúne planejamento, diário de obra (RDO), cronograma/Gantt, suprimentos e financeiro num só lugar — para engenheiros, gestores e equipes de campo.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'CaseWorks | Gestão de obras',
    template: '%s · CaseWorks',
  },
  description: DESC,
  applicationName: 'CaseWorks',
  keywords: [
    'gestão de obras',
    'software de engenharia civil',
    'diário de obra',
    'RDO',
    'cronograma de obra',
    'gantt',
    'planejamento de obra',
    'controle de custos',
    'suprimentos',
    'construtora',
    'gestão de canteiro',
  ],
  authors: [{ name: 'CaseWorks' }],
  creator: 'CaseWorks',
  publisher: 'CaseWorks',
  category: 'technology',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE_URL,
    siteName: 'CaseWorks',
    title: 'CaseWorks — Gestão de obras de engenharia',
    description: DESC,
    images: [{ url: '/logo.png', width: 512, height: 512, alt: 'CaseWorks' }],
  },
  twitter: {
    card: 'summary',
    title: 'CaseWorks — Gestão de obras de engenharia',
    description: DESC,
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: { icon: '/icon.png', apple: '/icon.png' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'CaseWorks',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, iOS, Android',
  description: DESC,
  url: SITE_URL,
  offers: { '@type': 'Offer', category: 'Demonstração' },
  audience: { '@type': 'Audience', audienceType: 'Engenharia civil, construtoras' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@500;600&display=swap"
          rel="stylesheet"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
