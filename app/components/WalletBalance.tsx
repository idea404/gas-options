'use client';

import { useNilClient } from '../hooks/useNilClient';
import { useWalletBalance } from '../hooks/useWalletBalance';

export default function WalletBalance() {
  const { client, error: clientError, isLoading: clientLoading } = useNilClient();
  const address = process.env.NEXT_PUBLIC_ADDRESS as `0x${string}`;
  const { balance, error: balanceError, isLoading: balanceLoading } = useWalletBalance(
    client,
    address
  );

  if (clientLoading || balanceLoading) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Wallet Balance</h2>
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

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

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Wallet Balance</h2>
      <div className="text-lg">
        <span className="font-semibold">Balance: </span>
        <span>{balance || '0'}</span>
      </div>
    </div>
  );
}
