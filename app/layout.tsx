import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { DarkModeProvider } from './DarkModeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Find My Device - Track Your Devices',
  description: 'Bugsmirror Assignment',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} transition-colors duration-300 bg-gray-50 dark:bg-gray-900`}>
        <DarkModeProvider>{children}</DarkModeProvider>
      </body>
    </html>
  );
}
