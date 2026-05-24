import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GIS RS Explorer — Remote Sensing & Spatial Analysis Platform',
  description: 'Professional Remote Sensing and GIS web application for spatial data analysis, multi-layer mapping, and earth observation.',
  keywords: ['GIS', 'Remote Sensing', 'MapLibre', 'Spatial Analysis', 'NDVI', 'NDWI', 'Next.js'],
  authors: [{ name: 'RS & GIS Explorer' }],
  openGraph: {
    title: 'GIS RS Explorer',
    description: 'Professional Remote Sensing & GIS Platform',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-surface text-gray-100 h-screen overflow-hidden">
        {children}
      </body>
    </html>
  );
}
