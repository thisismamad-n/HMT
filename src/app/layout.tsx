import '@fontsource/vazirmatn/400.css';
import '@fontsource/vazirmatn/700.css';
import './globals.css';
import { Metadata } from 'next';
import React from 'react';
import { ThemeProvider } from '@/context/ThemeContext';

export const metadata: Metadata = {
  title: 'راهنمای کسب و کار',
  description: 'راهنمای تخصصی برای کارآفرینان، سرمایه‌گذاران و صاحبان کسب و کار',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning className="light">
      <body className="min-h-screen font-vazirmatn bg-background text-foreground">
        <ThemeProvider>
          <main>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
} 