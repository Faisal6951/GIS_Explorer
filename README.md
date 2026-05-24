# GIS RS Explorer 🛰️

A professional **Remote Sensing & GIS Web Application** built with Next.js 14, MapLibre GL JS, and TypeScript. Designed for spatial analysis, multi-layer mapping, and earth observation workflows.

---

## 🌍 Features

### Map Engine
- **MapLibre GL JS** — Open-source, WebGL-powered map rendering
- **4 Base Maps** — Topographic, Dark Canvas, Light Canvas, Satellite (ESRI World Imagery)
- **Free Vector Tiles** via [OpenFreeMap](https://openfreemap.org/) — no API key needed

### Feature Layers (Toggleable)
| Category | Layers |
|---|---|
| 🌊 Hydrology | Water Bodies, Rivers & Canals |
| 🛣️ Infrastructure | Major Roads, Minor Roads, Buildings (3D) |
| 🌳 Land Use | Vegetation/Parks, Industrial Areas, Residential, Agricultural |
| 🪨 Geology | Bare Rock & Quarry areas |

Each layer supports:
- ✅ Visibility toggle
- 🎚️ Opacity slider (0–100%)
- 📋 Description tooltip

### Remote Sensing Indices
| Index | Full Name | Use Case |
|---|---|---|
| **NDVI** | Normalized Difference Vegetation Index | Vegetation health |
| **NDWI** | Normalized Difference Water Index | Water body detection |
| **NDBI** | Normalized Difference Built-up Index | Urban mapping |
| **EVI** | Enhanced Vegetation Index | Improved vegetation |
| **SAVI** | Soil Adjusted Vegetation Index | Arid zone vegetation |

Each index includes formula, color ramp, value range, and Sentinel-2 band reference.

### Spatial Analysis Tools
| Tool | Shortcut | Function |
|---|---|---|
| Measure Distance | `D` | Click points → get total distance |
| Measure Area | `A` | Draw polygon → get area in km² |
| Draw AOI | `P` | Define area of interest boundary |
| Identify Features | `I` | Click to inspect rendered features |
| Elevation Profile | `E` | Draw transect for elevation analysis |

### UI/UX
- 📐 **Coordinate display** in decimal degrees and DMS format
- 🔢 **Zoom level** and **map scale** (1:X format)
- 🕐 **Live clock** and connection status
- 🔍 **Layer search** filter
- 📌 **Map legend** auto-updates with active layers
- ⌨️ **Keyboard shortcuts** for tools

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the project
git clone https://github.com/your-username/gis-rs-explorer
cd gis-rs-explorer

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
npm run build
npm start
```

---

## 🏗️ Project Architecture

```
gis-rs-explorer/
├── app/
│   ├── layout.tsx          # Root layout with metadata + global fonts
│   ├── page.tsx            # Entry point (dynamic import for SSR safety)
│   └── globals.css         # Tailwind + MapLibre + custom design system
│
├── components/
│   ├── GISApp.tsx          # Root app shell with layout
│   ├── Map/
│   │   ├── MapContainer.tsx  # Core MapLibre GL JS integration
│   │   └── Toolbar.tsx       # Floating map action buttons
│   ├── Panels/
│   │   ├── Sidebar.tsx         # Panel router
│   │   ├── LayersPanel.tsx     # Base maps + feature layer controls
│   │   ├── AnalysisPanel.tsx   # Spatial analysis tools + results
│   │   └── RSIndicesPanel.tsx  # Spectral indices reference
│   └── UI/
│       ├── Header.tsx      # Top navigation bar with stats
│       └── StatusBar.tsx   # Bottom coordinate/scale bar
│
├── lib/
│   ├── layers.ts   # Layer configs, RS indices, tool definitions
│   ├── store.tsx   # Global state management (React Context + useReducer)
│   └── utils.ts    # GIS utility functions (Haversine, DMS, area calc)
│
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

---

## 🔌 Extending the App

### Adding a New Layer
Edit `lib/layers.ts` and add to the `GIS_LAYERS` array:
```ts
{
  id: 'my-layer',
  label: 'My Custom Layer',
  description: 'What this layer shows',
  category: 'landuse',
  color: '#ff6b6b',
  icon: 'map-pin',
  osmLayerIds: ['landuse-mytype'],
  defaultOpacity: 0.75,
  visible: true,
}
```

### Connecting Real RS Data
To connect live satellite imagery (e.g., Sentinel-2 via Google Earth Engine):
1. Generate a WMS endpoint from Earth Engine
2. Add as a `raster` source in `MapContainer.tsx`
3. Apply NDVI/NDWI color ramps using `raster-color` paint properties

### Adding a WMS Layer (e.g., NASA GIBS)
```ts
map.addSource('nasa-ndvi', {
  type: 'raster',
  tiles: ['https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&LAYERS=MODIS_Terra_NDVI_8Day&...'],
  tileSize: 256,
});
map.addLayer({ id: 'nasa-ndvi', type: 'raster', source: 'nasa-ndvi' });
```

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 14.2 | React framework, SSR, routing |
| **TypeScript** | 5.x | Type safety |
| **MapLibre GL JS** | 4.5 | WebGL map rendering engine |
| **Tailwind CSS** | 3.4 | Utility-first styling |
| **Lucide React** | 0.400 | Icon library |
| **React Context** | 18 | State management |
| **Turf.js** | 6.5 | Client-side spatial analysis |

---

## 📡 Data Sources

| Source | Data | License |
|---|---|---|
| **OpenFreeMap** | Vector tiles (streets, buildings, water) | ODbL |
| **OpenStreetMap** | Base geographic data | ODbL |
| **ESRI World Imagery** | Satellite basemap | ESRI |
| **NASA GIBS** | Earth observation imagery | Public Domain |

---

## 🎓 Academic Context

This project demonstrates core **RS & GIS** concepts:
- **Raster vs Vector data** — Satellite imagery vs. vector map features
- **Spectral indices** — NDVI, NDWI, NDBI computation theory
- **Coordinate systems** — WGS84 (EPSG:4326), Web Mercator (EPSG:3857)
- **Map scale** — Zoom level to representative fraction conversion
- **Spatial analysis** — Distance (Haversine formula), area (Shoelace formula)
- **Remote sensing workflow** — Band combinations, index calculation, classification

---

## 📝 License

MIT License — Free for academic and personal use.

---

*Built with ❤️ for RS & GIS coursework | Powered by Open Source geospatial tools*
