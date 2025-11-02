
'use client';

import { Device } from '@/lib/types';
import { X, MapPin, Battery, Clock, Signal } from 'lucide-react';
import ActionButtons from './ActionButtons';

interface DeviceDetailsProps {
  device: Device;
  onClose: () => void;
  onRing: () => void;
  onFactoryReset: () => void;
}

export default function DeviceDetails({
  device,
  onClose,
  onRing,
  onFactoryReset
}: DeviceDetailsProps) {
  return (
    <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl z-40 animate-slideInRight">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Device Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {device.name}
            </h3>
            <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
              device.status === 'online'
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {device.status === 'online' ? 'Online' : 'Offline'}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium text-gray-900">
                  {device.location}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {device.lat.toFixed(4)}°, {device.lng.toFixed(4)}°
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <Battery className={`w-5 h-5 mt-0.5 ${
                device.battery && device.battery > 60
                  ? 'text-green-500'
                  : device.battery && device.battery > 20
                  ? 'text-yellow-500'
                  : 'text-red-500'
              }`} />
              <div>
                <p className="text-sm text-gray-500">Battery</p>
                <p className="font-medium text-gray-900">
                  {device.battery}%
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <Clock className="w-5 h-5 text-gray-600 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Last Seen</p>
                <p className="font-medium text-gray-900">
                  {device.lastSeen}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <Signal className="w-5 h-5 text-gray-600 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Connection</p>
                <p className="font-medium text-gray-900">
                  {device.status === 'online' ? 'Connected' : 'Disconnected'}
                </p>
              </div>
            </div>
          </div>

          <ActionButtons onRing={onRing} onFactoryReset={onFactoryReset} />
        </div>
      </div>
    </div>
  );
}