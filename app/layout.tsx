import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vapi Demo',
  description: 'A simple demo of Vapi voice AI integration',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
} 