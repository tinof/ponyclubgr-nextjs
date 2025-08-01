import type { ReactNode } from 'react';
import '../index.css';

// Root layout for the app - minimal layout that just includes global styles
// The actual layout with metadata, fonts, and locale support is in [locale]/layout.tsx
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
