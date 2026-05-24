import dynamic from 'next/dynamic';

// Dynamic import to avoid SSR issues with MapLibre GL
const GISApp = dynamic(() => import('@/components/GISApp'), { ssr: false });

export default function Page() {
  return <GISApp />;
}
