import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CaseWorks — Gestão de obras de engenharia',
  description:
    'Toda a obra, do canteiro ao caixa, num só sistema. Planejamento, diário de obra, suprimentos e financeiro para engenheiros, gestores e equipes de campo.',
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
      </head>
      <body>{children}</body>
    </html>
  );
}
