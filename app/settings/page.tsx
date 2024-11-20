'use client';

import KeyManagement from '../components/KeyManagement';
import WalletBalance from '../components/WalletBalance';

export default function Settings() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>
      
      <div className="space-y-8">
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Wallet & Key Management</h2>
          <div className="space-y-6">
            <KeyManagement />
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-md font-medium mb-4">Wallet Balance</h3>
              <WalletBalance />
            </div>
          </div>
        </section>
        
        {/* Add more settings sections here as needed */}
      </div>
    </div>
  );
}
