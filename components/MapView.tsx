'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Device } from '@/lib/types';

const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const selectedIcon = L.icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function MapController({ selectedDevice }: { selectedDevice: Device | null }) {
  const map = useMap();
  useEffect(() => {
    if (selectedDevice) {
      map.flyTo([selectedDevice.lat, selectedDevice.lng], 13, { duration: 1.5 });
    }
  }, [selectedDevice, map]);
  return null;
}

export default function MapView({
  devices,
  selectedDevice,
  onDeviceSelect,
}: {
  devices: Device[];
  selectedDevice: Device | null;
  onDeviceSelect: (d: Device) => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // 🧠 Critical guard: never render MapContainer until browser DOM exists
  if (!mounted || typeof window === 'undefined') {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-300">
        Loading map…
      </div>
    );
  }

  const center: [number, number] = selectedDevice
    ? [selectedDevice.lat, selectedDevice.lng]
    : [39.8283, -98.5795]; // fallback center

  return (
    <div className="h-full w-full rounded-lg overflow-hidden">
      <MapContainer
        center={center}
        zoom={4}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController selectedDevice={selectedDevice} />
        {devices.map((d) => (
          <Marker
            key={d.id}
            position={[d.lat, d.lng]}
            icon={selectedDevice?.id === d.id ? selectedIcon : defaultIcon}
            eventHandlers={{ click: () => onDeviceSelect(d) }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">{d.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{d.location}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Battery: {d.battery}% • {d.status}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
