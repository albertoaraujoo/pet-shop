import type { Metadata } from 'next';
import { Geist, Inter, Inter_Tight } from 'next/font/google';

import '@/styles/globals.css';

import { TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
});

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
  weight: ['700'],
});

export const metadata: Metadata = {
  title: 'Mundo Pet',
  description:
    'Aqui você pode ver todos os clientes e serviços agendados para hoje.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        'h-full',
        'antialiased',
        inter.variable,
        interTight.variable,
        'font-sans',
        geist.variable
      )}
    >
      <TooltipProvider>
        <body className="flex min-h-full flex-col">{children}</body>
      </TooltipProvider>
    </html>
  );
}
