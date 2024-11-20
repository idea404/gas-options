'use client';

import { useState, useEffect } from 'react';
import WalletBalance from './components/WalletBalance';

export default function Home() {
  const [nilStatus, setNilStatus] = useState<string>('Initializing...');

  useEffect(() => {
    const initNil = async () => {
      try {
        setNilStatus('Connected to nil client');
      } catch (error: unknown) {
        const errorMessage = error instanceof Error 
          ? error.message 
          : 'An unknown error occurred';
        setNilStatus(`Error connecting to nil client: ${errorMessage}`);
      }
    };

    initNil();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Gas Options Trading</h1>
        <p className="mt-2 text-gray-600">Trade gas options efficiently and securely</p>
      </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Create New Option
            </button>
            <button className="w-full py-2 px-4 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors">
              View Active Options
            </button>
          </div>
        </div>
      </div>
  );
}
