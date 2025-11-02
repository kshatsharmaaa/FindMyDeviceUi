
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { devices } from '@/lib/deviceData';
import { Device } from '@/lib/types';
import DeviceList from '@/components/DeviceList';
import DeviceDetails from '@/components/DeviceDetails';
import SearchBar from '@/components/SearchBar';
import { Menu, X } from 'lucide-react';


const MapView = dynamic(() => import('@/components/MapView'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-gray-100">
      <div className="text-gray-500">Loading map...</div>
    </div>
  )
});

export default function Home() {
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const handleDeviceSelect = (device: Device) => {
    setSelectedDevice(device);
    setShowSidebar(false);
  };

  const handleRing = () => {
    setNotification(`📱 Ringing ${selectedDevice?.name}...`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleFactoryReset = () => {
    setNotification(`🔄 Factory reset initiated for ${selectedDevice?.name}`);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between z-30">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {showSidebar ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <h1 className="text-xl font-bold text-gray-900">
            Find My Device
          </h1>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`${
            showSidebar ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:relative z-20 w-80 h-full bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out`}
        >
          <div className="h-full overflow-y-auto p-4">
            <div className="mb-4">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>
            <DeviceList
              devices={devices}
              selectedDevice={selectedDevice}
              onDeviceSelect={handleDeviceSelect}
              searchQuery={searchQuery}
            />
          </div>
        </aside>

        {/* Overlay for mobile */}
        {showSidebar && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-10"
            onClick={() => setShowSidebar(false)}
          />
        )}

        {/* Map */}
        <main className="flex-1 relative">
          <MapView
            devices={devices}
            selectedDevice={selectedDevice}
            onDeviceSelect={handleDeviceSelect}
          />
        </main>

        {/* Device Details Panel */}
        {selectedDevice && (
          <DeviceDetails
            device={selectedDevice}
            onClose={() => setSelectedDevice(null)}
            onRing={handleRing}
            onFactoryReset={handleFactoryReset}
          />
        )}
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slideUp">
          <div className="bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg">
            {notification}
          </div>
        </div>
      )}
    </div>
  );
}