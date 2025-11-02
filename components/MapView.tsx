
'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Device } from '@/lib/types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapViewProps {
  devices: Device[];
  selectedDevice: Device | null;
  onDeviceSelect: (device: Device) => void;
}

const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const selectedIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function MapController({ selectedDevice }: { selectedDevice: Device | null }) {
  const map = useMap();

  useEffect(() => {
    if (selectedDevice) {
      map.flyTo([selectedDevice.lat, selectedDevice.lng], 13, {
        duration: 1.5
      });
    }
  }, [selectedDevice, map]);

  return null;
}

export default function MapView({ devices, selectedDevice, onDeviceSelect }: MapViewProps) {
  const center: [number, number] = selectedDevice
    ? [selectedDevice.lat, selectedDevice.lng]
    : [39.8283, -98.5795]; 

  return (
    <div className="h-full w-full rounded-lg overflow-hidden">
      <MapContainer
        center={center}
        zoom={4}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController selectedDevice={selectedDevice} />
        {devices.map((device) => (
          <Marker
            key={device.id}
            position={[device.lat, device.lng]}
            icon={selectedDevice?.id === device.id ? selectedIcon : icon}
            eventHandlers={{
              click: () => onDeviceSelect(device)
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-gray-900">{device.name}</h3>
                <p className="text-sm text-gray-600">{device.location}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Battery: {device.battery}% • {device.status}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}