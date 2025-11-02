
export interface Device {
  id: number;
  name: string;
  location: string;
  lat: number;
  lng: number;
  battery?: number;
  lastSeen?: string;
  status?: 'online' | 'offline';
}

export interface MapViewProps {
  devices: Device[];
  selectedDevice: Device | null;
  onDeviceSelect: (device: Device) => void;
}

export interface DeviceListProps {
  devices: Device[];
  selectedDevice: Device | null;
  onDeviceSelect: (device: Device) => void;
  searchQuery: string;
}

export interface DeviceDetailsProps {
  device: Device;
  onClose: () => void;
  onRing: () => void;
  onFactoryReset: () => void;
}