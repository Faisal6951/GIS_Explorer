'use client';
// components/UI/Header.tsx

import React from 'react';
import { Menu, Globe, Layers, Satellite, Activity, ChevronRight } from 'lucide-react';
import { useAppState, useDispatch } from '@/lib/store';

interface HeaderProps {
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

export default function Header({ onToggleSidebar, sidebarOpen }: HeaderProps) {
  const state = useAppState();
  const dispatch = useDispatch();
  const visibleCount = state.layers.filter(l => l.visible).length;

  return (
    <header className="relative flex items-center justify-between px-2 sm:px-4 h-12 bg-surface-1 border-b border-border flex-shrink-0 z-50 scanlines">
      {/* Left — Logo + Toggle */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 rounded-md hover:bg-surface-3 text-gray-400 hover:text-gray-200 transition-colors flex-shrink-0"
          title="Toggle Sidebar"
        >
          <Menu size={16} />
        </button>

        <div className="flex items-center gap-2 min-w-0">
          {/* Logo mark */}
          <div className="relative w-6 h-6 flex-shrink-0">
            <div className="absolute inset-0 rounded bg-accent-cyan/20 flex items-center justify-center">
              <Globe size={13} className="text-accent-cyan" />
            </div>
            <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse-slow" />
          </div>

          <div className="hidden xs:block">
            <span
              className="text-[13px] font-semibold tracking-wide text-white whitespace-nowrap"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              GIS RS Explorer
            </span>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="hidden lg:flex items-center gap-1 text-[11px] text-gray-500 ml-1">
          <ChevronRight size={12} />
          <span>Remote Sensing</span>
          <ChevronRight size={12} />
          <span className="text-accent-cyan">Spatial Analysis</span>
        </div>
      </div>

      {/* Center — Quick Stats */}
      <div className="hidden md:flex items-center gap-4">
        <Stat icon={<Layers size={11} />} label="Layers" value={`${visibleCount}/${state.layers.length}`} color="cyan" />
        <Stat icon={<Satellite size={11} />} label="Base Map" value={state.activeBaseMap} color="green" />
        <Stat icon={<Activity size={11} />} label="Zoom" value={state.zoom.toFixed(1)} color="amber" />
      </div>

      {/* Right — Panel Tabs */}
      <div className="flex items-center gap-1">
        {(
          [
            { id: 'layers',   label: 'Layers',   icon: <Layers size={12} /> },
            { id: 'analysis', label: 'Analysis',  icon: <Activity size={12} /> },
            { id: 'indices',  label: 'RS Indices', icon: <Satellite size={12} /> },
          ] as const
        ).map(tab => (
          <button
            key={tab.id}
            onClick={() => dispatch({ type: 'SET_PANEL', panel: tab.id })}
            className={`
              flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-md text-[11px] font-medium transition-all
              ${state.activePanel === tab.id
                ? 'bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30'
                : 'text-gray-400 hover:text-gray-200 hover:bg-surface-3 border border-transparent'
              }
            `}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>
    </header>
  );
}

function Stat({ icon, label, value, color }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: 'cyan' | 'green' | 'amber';
}) {
  const colors = {
    cyan:  'text-accent-cyan bg-accent-cyan/10 border-accent-cyan/20',
    green: 'text-accent-green bg-accent-green/10 border-accent-green/20',
    amber: 'text-accent-amber bg-accent-amber/10 border-accent-amber/20',
  };
  return (
    <div className={`flex items-center gap-1.5 px-2 py-1 rounded border ${colors[color]} text-[11px]`}>
      {icon}
      <span className="text-gray-500">{label}:</span>
      <span className="font-mono font-medium">{value}</span>
    </div>
  );
}
