
'use client';

import { Device } from '@/lib/types';
import { Smartphone, Laptop, Watch, Tablet, Battery, MapPin } from 'lucide-react';

interface DeviceCardProps {
  device: Device;
  isSelected: boolean;
  onClick: () => void;
}

export default function DeviceCard({ device, isSelected, onClick }: DeviceCardProps) {
  const getDeviceIcon = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('phone') || lowerName.includes('pixel') || lowerName.includes('galaxy')) {
      return <Smartphone className="w-6 h-6" />;
    }
    if (lowerName.includes('laptop') || lowerName.includes('macbook') || lowerName.includes('dell')) {
      return <Laptop className="w-6 h-6" />;
    }
    if (lowerName.includes('watch')) {
      return <Watch className="w-6 h-6" />;
    }
    if (lowerName.includes('ipad') || lowerName.includes('tablet')) {
      return <Tablet className="w-6 h-6" />;
    }
    return <Smartphone className="w-6 h-6" />;
  };

  const getBatteryColor = (battery?: number) => {
    if (!battery) return 'text-gray-400';
    if (battery > 60) return 'text-green-500';
    if (battery > 20) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-lg cursor-pointer transition-all duration-200 transform hover:scale-[1.02] ${
        isSelected
          ? 'bg-blue-50 border-2 border-blue-500'
          : 'bg-white border border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${
            isSelected 
              ? 'bg-blue-100 text-blue-600' 
              : 'bg-gray-100 text-gray-600'
          }`}>
            {getDeviceIcon(device.name)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {device.name}
            </h3>
            <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
              <MapPin className="w-3 h-3" />
              <span>{device.location}</span>
            </div>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          device.status === 'online'
            ? 'bg-green-100 text-green-700'
            : 'bg-gray-100 text-gray-600'
        }`}>
          {device.status}
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-1 text-gray-600">
          <Battery className={`w-4 h-4 ${getBatteryColor(device.battery)}`} />
          <span>{device.battery}%</span>
        </div>
        <span className="text-gray-500">{device.lastSeen}</span>
      </div>
    </div>
  );
}