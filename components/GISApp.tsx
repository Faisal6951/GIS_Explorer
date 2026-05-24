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
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <AppProvider>
      <MapProvider>
      <div className="flex flex-col h-screen bg-surface overflow-hidden">
        {/* ── Header ─────────────────────────────────── */}
        <Header onToggleSidebar={() => setSidebarOpen(p => !p)} sidebarOpen={sidebarOpen} />

        {/* ── Main Content ───────────────────────────── */}
        <div className="flex flex-1 min-h-0 relative">
          {/* Sidebar */}
          <div
            className={`
              flex-shrink-0 h-full min-h-0 transition-all duration-300 ease-in-out
              ${sidebarOpen ? 'w-72' : 'w-0'}
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
