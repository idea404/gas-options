'use client';

import { useEffect, useState } from 'react';
import { useNilClient } from '../hooks/useNilClient';
import { useWalletBalance } from '../hooks/useWalletBalance';
import { useFaucet } from '../hooks/useFaucet';

export default function WalletBalance() {
  const { client, error: clientError, isLoading: clientLoading } = useNilClient();
  const [address, setAddress] = useState<`0x${string}` | null>(null);
  const { requestTokens, isLoading: faucetLoading, error: faucetError } = useFaucet();
  const [requestStatus, setRequestStatus] = useState<string>('');

  // Listen for address changes from KeyManagement
  useEffect(() => {
    const storedAddress = localStorage.getItem('nil_address');
    if (storedAddress && storedAddress.startsWith('0x')) {
      setAddress(storedAddress as `0x${string}`);
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'nil_address' && e.newValue && e.newValue.startsWith('0x')) {
        setAddress(e.newValue as `0x${string}`);
      } else if (e.key === 'nil_address') {
        setAddress(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Always call useWalletBalance with a default address if none exists
  const { balance, error: balanceError, isLoading: balanceLoading } = useWalletBalance(
    client,
    address || '0x0000000000000000000000000000000000000000'
  );

  const handleRequestTokens = async () => {
    if (!address) return;
    
    try {
      setRequestStatus('Requesting tokens...');
      const txHash = await requestTokens(address);
      setRequestStatus(`Success! Transaction hash: ${txHash}`);
      
      // Wait a bit and then clear the status
      setTimeout(() => {
        setRequestStatus('');
      }, 5000);
    } catch (err) {
      setRequestStatus(`Failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  // Early return for loading state
  if (clientLoading || balanceLoading) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Wallet Balance</h2>
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  // Early return for no address
  if (!address) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Wallet Balance</h2>
        <div className="text-gray-600">Generate or import a key to view balance</div>
      </div>
    );
  }

  // Early return for errors
  if (clientError || balanceError) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Wallet Balance</h2>
        <div className="text-red-500">
          Error: {(clientError || balanceError)?.message}
        </div>
      </div>
    );
  }

  // Main render with balance
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Wallet Balance</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">Address (Shard {process.env.NEXT_PUBLIC_NIL_SHARD_ID || 1}):</label>
          <div className="mt-1 text-sm break-all">{address}</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Balance:</label>
          <div className="mt-1 text-2xl font-bold">
            {address === '0x0000000000000000000000000000000000000000' ? '0' : balance?.toString() || '0'} NIL
          </div>
        </div>
        
        {/* Faucet Request Button */}
        <div className="pt-4">
          <button
            onClick={handleRequestTokens}
            disabled={faucetLoading || !address || address === '0x0000000000000000000000000000000000000000'}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {faucetLoading ? 'Requesting...' : 'Request Test Tokens'}
          </button>
          
          {/* Status Messages */}
          {requestStatus && (
            <div className={`mt-2 text-sm ${requestStatus.includes('Success') ? 'text-green-600' : 'text-red-600'}`}>
              {requestStatus}
            </div>
          )}
          {faucetError && (
            <div className="mt-2 text-sm text-red-600">
              {faucetError.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
