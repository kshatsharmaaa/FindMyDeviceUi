'use client';

import { Device } from '@/lib/types';
import { Smartphone, Laptop, Watch, Tablet, Battery, MapPin } from 'lucide-react';

interface DeviceCardProps {
  device: Device;
  isSelected: boolean;
  onClick: () => void;
  theme?: 'light' | 'dark'; 
}

export default function DeviceCard({ device, isSelected, onClick, theme = 'light' }: DeviceCardProps) {
  const isDark = theme === 'dark';

  const getDeviceIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('phone') || lower.includes('pixel') || lower.includes('galaxy')) return <Smartphone className="w-6 h-6" />;
    if (lower.includes('laptop') || lower.includes('macbook') || lower.includes('surface')) return <Laptop className="w-6 h-6" />;
    if (lower.includes('watch')) return <Watch className="w-6 h-6" />;
    if (lower.includes('ipad') || lower.includes('tablet')) return <Tablet className="w-6 h-6" />;
    return <Smartphone className="w-6 h-6" />;
  };

  const getBatteryColor = (battery?: number) => {
    if (!battery) return isDark ? 'text-gray-400' : 'text-gray-400';
    if (battery > 60) return isDark ? 'text-green-300' : 'text-green-500';
    if (battery > 20) return isDark ? 'text-yellow-300' : 'text-yellow-500';
    return isDark ? 'text-red-300' : 'text-red-500';
  };

  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-lg cursor-pointer transition-all duration-200 transform hover:scale-[1.02] ${
        isSelected
          ? `${isDark ? 'bg-blue-900/30 border-2 border-blue-500 text-blue-300' : 'bg-blue-50 border-2 border-blue-500 text-blue-600'}`
          : `${isDark ? 'bg-gray-800 border border-gray-700 text-gray-300 hover:border-gray-600' : 'bg-white border border-gray-200 text-gray-900 hover:border-gray-300'}`
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-lg ${
              isSelected
                ? isDark
                  ? 'bg-blue-800 text-blue-300'
                  : 'bg-blue-100 text-blue-600'
                : isDark
                  ? 'bg-gray-700 text-gray-300'
                  : 'bg-gray-100 text-gray-600'
            }`}
          >
            {getDeviceIcon(device.name)}
          </div>
          <div>
            <h3 className={`${isDark ? 'text-gray-100' : 'text-gray-900'} font-semibold`}>
              {device.name}
            </h3>
            <div className={`flex items-center gap-1 text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <MapPin className="w-3 h-3" />
              <span>{device.location}</span>
            </div>
          </div>
        </div>
        <div
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            device.status === 'online'
              ? isDark
                ? 'bg-green-900 text-green-300'
                : 'bg-green-100 text-green-700'
              : isDark
                ? 'bg-gray-700 text-gray-300'
                : 'bg-gray-100 text-gray-600'
          }`}
        >
          {device.status}
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className={`flex items-center gap-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          <Battery className={`w-4 h-4 ${getBatteryColor(device.battery)}`} />
          <span>{device.battery}%</span>
        </div>
        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>{device.lastSeen}</span>
      </div>
    </div>
  );
}
