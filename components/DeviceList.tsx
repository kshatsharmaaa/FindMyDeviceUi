
'use client';

import { Device } from '@/lib/types';
import DeviceCard from './DeviceCard';

interface DeviceListProps {
  devices: Device[];
  selectedDevice: Device | null;
  onDeviceSelect: (device: Device) => void;
  searchQuery: string;
}

export default function DeviceList({
  devices,
  selectedDevice,
  onDeviceSelect,
  searchQuery
}: DeviceListProps) {
  const filteredDevices = devices.filter(
    (device) =>
      device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Your Devices
        </h2>
        <span className="text-sm text-gray-500">
          {filteredDevices.length} device{filteredDevices.length !== 1 ? 's' : ''}
        </span>
      </div>

      {filteredDevices.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No devices found
        </div>
      ) : (
        <div className="space-y-3 animate-fadeIn">
          {filteredDevices.map((device) => (
            <DeviceCard
              key={device.id}
              device={device}
              isSelected={selectedDevice?.id === device.id}
              onClick={() => onDeviceSelect(device)}
            />
          ))}
        </div>
      )}
    </div>
  );
}