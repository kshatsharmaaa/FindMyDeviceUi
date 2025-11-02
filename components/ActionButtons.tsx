
'use client';

import { Bell, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface ActionButtonsProps {
  onRing: () => void;
  onFactoryReset: () => void;
}

export default function ActionButtons({ onRing, onFactoryReset }: ActionButtonsProps) {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleFactoryReset = () => {
    setShowResetConfirm(true);
  };

  const confirmReset = () => {
    onFactoryReset();
    setShowResetConfirm(false);
  };

  return (
    <>
      <div className="flex gap-3">
        <button
          onClick={onRing}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <Bell className="w-5 h-5" />
          Ring Device
        </button>
        <button
          onClick={handleFactoryReset}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <Trash2 className="w-5 h-5" />
          Factory Reset
        </button>
      </div>

      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl animate-slideUp">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Factory Reset Device?
            </h3>
            <p className="text-gray-600 mb-6">
              This will erase all data on the device. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 px-3 py-1 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmReset}
                className="flex-1 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}