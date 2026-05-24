'use client';
// components/GISApp.tsx — Root application component

import React, { useState } from 'react';
import { AppProvider } from '@/lib/store';
import { MapProvider } from '@/lib/MapContext';
import Header from './UI/Header';
import Sidebar from './Panels/Sidebar';
import MapContainer from './Map/MapContainer';
import StatusBar from './UI/StatusBar';
import Toolbar from './Map/Toolbar';
import MapSearchBar from './Map/MapSearchBar';

export default function GISApp() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AppProvider>
      <MapProvider>
      <div className="flex flex-col h-screen bg-surface overflow-hidden">
        {/* ── Header ─────────────────────────────────── */}
        <Header onToggleSidebar={() => setSidebarOpen(p => !p)} sidebarOpen={sidebarOpen} />

        {/* ── Main Content ───────────────────────────── */}
        <div className="flex flex-1 min-h-0 relative">
          {/* Sidebar — overlay on mobile, inline on desktop */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          <div
            className={`
              fixed top-12 left-0 bottom-0 z-50 w-72 transition-transform duration-300 ease-in-out
              md:relative md:top-0 md:z-auto md:transition-all md:duration-300
              ${sidebarOpen
                ? 'translate-x-0 md:w-72'
                : '-translate-x-full md:translate-x-0 md:w-0'
              }
            `}
          >
            <Sidebar />
          </div>

          {/* Map + Toolbar */}
          <div className="flex-1 min-h-0 relative overflow-hidden">
            <MapSearchBar />
            <Toolbar />
            <MapContainer />
          </div>
        </div>

        {/* ── Status Bar ─────────────────────────────── */}
        <StatusBar />
      </div>
      </MapProvider>
    </AppProvider>
  );
}
