'use client';

import { useState, useEffect } from 'react';
import WalletBalance from './components/WalletBalance';

export default function Home() {
  const [nilStatus, setNilStatus] = useState<string>('Initializing...');

  useEffect(() => {
    const initNil = async () => {
      try {
        setNilStatus('Connected to nil client');
      } catch (error) {
        setNilStatus(`Error connecting to nil client: ${error.message}`);
      }
    };

    initNil();
  }, []);

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-4xl font-bold mb-8 text-center">Nil Client Web Interface</h1>
      
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl mb-4">Status</h2>
          <p className="text-gray-700">{nilStatus}</p>
        </div>

        <WalletBalance />
      </div>
    </main>
  );
}
