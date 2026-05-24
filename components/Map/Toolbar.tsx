'use client';
// components/Map/Toolbar.tsx

import React, { useState, useEffect } from 'react';
import { Home, Camera, Maximize2, Navigation, Loader2, Check, MapPin, Wifi } from 'lucide-react';
import { useAppState, useDispatch } from '@/lib/store';
import { useMapInstance } from '@/lib/MapContext';
import { BASE_MAPS } from '@/lib/layers';
import { RS_OVERLAYS } from '@/lib/rsOverlays';
import { exportMapSnapshot, downloadDataUrl } from '@/lib/mapExport';
import { formatAccuracy } from '@/lib/geolocation';

export default function Toolbar() {
  const state = useAppState();
  const dispatch = useDispatch();
  const { map } = useMapInstance();
  const [exporting, setExporting] = useState(false);
  const [exportDone, setExportDone] = useState(false);
  const [locating, setLocating] = useState(false);

  useEffect(() => {
    if (state.userLocation || state.locationError) setLocating(false);
  }, [state.userLocation, state.locationError]);

  const resetView = () => dispatch({ type: 'RESET_MAP_VIEW' });

  const goToMyLocation = () => {
    setLocating(true);
    dispatch({ type: 'SET_LOCATION_ERROR', message: null });
    dispatch({ type: 'SET_PICK_LOCATION_ON_MAP', active: false });
    dispatch({ type: 'REQUEST_GEOLOCATION' });
  };

  const useNetworkEstimate = () => {
    setLocating(true);
    dispatch({ type: 'SET_LOCATION_ERROR', message: null });
    dispatch({ type: 'SET_PICK_LOCATION_ON_MAP', active: false });
    dispatch({ type: 'REQUEST_NETWORK_LOCATION' });
  };

  const togglePickOnMap = () => {
    dispatch({ type: 'SET_PICK_LOCATION_ON_MAP', active: !state.pickLocationOnMap });
    dispatch({ type: 'SET_LOCATION_ERROR', message: null });
  };

  const takeSnapshot = async () => {
    if (!map || exporting) return;
    setExporting(true);
    setExportDone(false);
    try {
      const bm = BASE_MAPS.find(b => b.id === state.activeBaseMap);
      const rs = state.activeRSIndex ? RS_OVERLAYS[state.activeRSIndex] : undefined;
      const dataUrl = await exportMapSnapshot(map, {
        baseMapLabel: bm?.label ?? state.activeBaseMap,
        rsIndexLabel: rs?.label,
      });
      const stamp = new Date().toISOString().slice(0, 10);
      downloadDataUrl(dataUrl, `gis-rs-explorer-${stamp}.png`);
      setExportDone(true);
      setTimeout(() => setExportDone(false), 2000);
    } catch {
      alert('Could not capture map snapshot. Wait for tiles to load and try again.');
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="absolute top-14 sm:top-3 left-2 sm:left-3 z-20 flex flex-col gap-2 max-w-[220px]">
      <div className="flex flex-col gap-1 p-1 rounded-lg bg-surface-1 backdrop-blur-md border border-border shadow-lg">
        <ToolButton icon={<Home size={15} />} label="Reset view" onClick={resetView} />
        <ToolButton
          icon={locating ? <Loader2 size={15} className="animate-spin" /> : <Navigation size={15} />}
          label="My location (GPS)"
          onClick={goToMyLocation}
          disabled={locating}
          active={!!state.userLocation && state.userLocation.source === 'gps'}
        />
        <ToolButton
          icon={<Wifi size={14} />}
          label="Network estimate"
          onClick={useNetworkEstimate}
          disabled={locating}
        />
        <ToolButton
          icon={<MapPin size={14} />}
          label="Set on map"
          onClick={togglePickOnMap}
          active={state.pickLocationOnMap}
        />
        <div className="h-px bg-border mx-1" />
        <ToolButton
          icon={<Maximize2 size={15} />}
          label="Fullscreen"
          onClick={() => document.documentElement.requestFullscreen?.()}
        />
        <ToolButton
          icon={
            exporting ? (
              <Loader2 size={15} className="animate-spin" />
            ) : exportDone ? (
              <Check size={15} className="text-accent-green" />
            ) : (
              <Camera size={15} />
            )
          }
          label={exportDone ? 'Saved!' : 'Map snapshot'}
          onClick={takeSnapshot}
          disabled={exporting}
          highlight
        />
      </div>

      {state.pickLocationOnMap && (
        <div className="px-2.5 py-2 rounded-md bg-purple-500/10 border border-purple-500/30 text-[10px] text-purple-200 leading-snug">
          Click your exact position on the map.
        </div>
      )}

      {state.userLocation && !state.locationError && !state.pickLocationOnMap && (
        <div className="px-2.5 py-2 rounded-md bg-blue-500/10 border border-blue-500/25 text-[10px] text-blue-200/90 leading-snug">
          {state.userLocation.placeName && (
            <span className="block text-blue-100/90 mb-0.5 truncate">{state.userLocation.placeName}</span>
          )}
          {formatAccuracy(state.userLocation.accuracy)}
          {state.userLocation.source === 'ip' && ' · city-level'}
          {state.userLocation.source === 'manual' && ' · manual pin'}
        </div>
      )}

      {state.locationError && (
        <div className="px-2.5 py-2 rounded-md bg-red-500/10 border border-red-500/30 text-[10px] text-red-300 leading-snug">
          {state.locationError}
        </div>
      )}
    </div>
  );
}

function ToolButton({
  icon,
  label,
  onClick,
  disabled,
  active,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  highlight?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={label}
      aria-label={label}
      className={`
        w-9 h-9 flex items-center justify-center rounded-md transition-all
        disabled:opacity-50 disabled:cursor-not-allowed
        ${highlight
          ? 'text-accent-cyan hover:bg-accent-cyan/15 hover:border-accent-cyan/30 border border-transparent'
          : active
            ? 'text-accent-green bg-accent-green/10'
            : 'text-gray-400 hover:text-gray-100 hover:bg-surface-3 border border-transparent'
        }
      `}
    >
      {icon}
    </button>
  );
}
