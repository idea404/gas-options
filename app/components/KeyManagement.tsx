'use client';

import { useState, useEffect } from 'react';
import { LocalECDSAKeySigner, generateRandomPrivateKey, bytesToHex, hexToBytes } from '@nilfoundation/niljs';
import { useNilClient } from '../hooks/useNilClient';
import { useWallet } from '../hooks/useWallet';
import { useChainId } from '../hooks/useChainId';

// Helper function for string to bytes conversion
const stringToBytes = (str: string): Uint8Array => {
  return new TextEncoder().encode(str);
};

// Helper function to ensure hex string has 0x prefix
const ensureHexPrefix = (hex: string): `0x${string}` => {
  if (hex.startsWith('0x')) {
    return hex as `0x${string}`;
  }
  return `0x${hex}` as `0x${string}`;
};

// Storage keys
const STORAGE_KEYS = {
  PRIVATE_KEY: 'nil_private_key',
  ADDRESS: 'nil_address',
} as const;

export default function KeyManagement() {
  const { client } = useNilClient();
  const { fetchChainId } = useChainId(client);
  const [privateKey, setPrivateKey] = useState<`0x${string}`>('0x');
  const [address, setAddress] = useState<string>('');
  const [signedMessage, setSignedMessage] = useState<string>('');
  const [message, setMessage] = useState<string>('Hello, Nil!');
  const [error, setError] = useState<string>('');
  const [broadcastStatus, setBroadcastStatus] = useState<string>('');

  // Add wallet hook
  const { wallet, seqno, error: walletError } = useWallet(client, privateKey !== '0x' ? privateKey : null);

  // Load stored key on mount
  useEffect(() => {
    const storedKey = localStorage.getItem(STORAGE_KEYS.PRIVATE_KEY);
    const storedAddress = localStorage.getItem(STORAGE_KEYS.ADDRESS);
    if (storedKey && storedAddress) {
      setPrivateKey(storedKey as `0x${string}`);
      setAddress(storedAddress);
    }
  }, []);

  const updateStorage = (key: `0x${string}`, addr: string) => {
    localStorage.setItem(STORAGE_KEYS.PRIVATE_KEY, key);
    localStorage.setItem(STORAGE_KEYS.ADDRESS, addr);
    // Dispatch storage event for other components
    window.dispatchEvent(new StorageEvent('storage', {
      key: STORAGE_KEYS.ADDRESS,
      newValue: addr
    }));
  };

  const clearStorage = () => {
    localStorage.removeItem(STORAGE_KEYS.PRIVATE_KEY);
    localStorage.removeItem(STORAGE_KEYS.ADDRESS);
    window.dispatchEvent(new StorageEvent('storage', {
      key: STORAGE_KEYS.ADDRESS,
      newValue: null
    }));
  };

  const generateNewKey = () => {
    try {
      const newPrivateKey = generateRandomPrivateKey();
      const signer = new LocalECDSAKeySigner({ privateKey: newPrivateKey });
      const shardId = Number(process.env.NEXT_PUBLIC_NIL_SHARD_ID || 1);
      const newAddress = bytesToHex(signer.getAddress(shardId)) as string;
      
      setPrivateKey(newPrivateKey);
      setAddress(newAddress);
      updateStorage(newPrivateKey, newAddress);
      setError('');
    } catch (err) {
      setError('Failed to generate key: ' + (err instanceof Error ? err.message : String(err)));
    }
  };

  const importKey = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const key = event.target.value;
      if (!key.startsWith('0x')) {
        throw new Error('Private key must start with 0x');
      }
      
      if (!/^0x[0-9a-fA-F]{64}$/.test(key)) {
        throw new Error('Invalid private key format');
      }

      const importedKey = key as `0x${string}`;
      const signer = new LocalECDSAKeySigner({ privateKey: importedKey });
      const shardId = Number(process.env.NEXT_PUBLIC_NIL_SHARD_ID || 1);
      const importedAddress = bytesToHex(signer.getAddress(shardId)) as string;
      
      setPrivateKey(importedKey);
      setAddress(importedAddress);
      updateStorage(importedKey, importedAddress);
      setError('');
    } catch (err) {
      setError('Invalid private key: ' + (err instanceof Error ? err.message : String(err)));
      setPrivateKey('0x');
      setAddress('');
      clearStorage();
    }
  };

  const signMessage = async () => {
    setError('');
    setSignedMessage('');

    if (!wallet) {
      setError('Wallet not initialized');
      return;
    }

    try {
      console.log('Starting message signing process...');
      console.log('Original message:', message);
      console.log('Current sequence number:', seqno);
      
      const chainId = await fetchChainId();
      // Check if chainId is undefined or null, but allow 0
      if (chainId === undefined || chainId === null) {
        throw new Error('Chain ID not available');
      }
      console.log('Using chain ID:', chainId);
      
      // Create external message using wallet's request
      const { raw, hash } = await wallet.requestToWallet({
        data: stringToBytes(message),
        deploy: false,
        seqno: seqno,
        chainId,
      }, false);
      
      console.log('Message hash:', bytesToHex(hash));
      const messageHex = ensureHexPrefix(bytesToHex(raw));
      console.log('Final message hex:', messageHex);
      
      setSignedMessage(messageHex);
      setError('');

      // Broadcast the signed message if client is available
      if (client) {
        setBroadcastStatus('Broadcasting...');
        try {
          console.log('Client instance:', client);
          console.log('Attempting to broadcast...');
          
          const txHash = await client.sendRawMessage(messageHex);
          console.log('Broadcast successful! TX Hash:', txHash);
          setBroadcastStatus(`Message broadcast successful! TX Hash: ${txHash}`);
        } catch (broadcastErr) {
          console.error('Broadcast error details:', broadcastErr);
          if (broadcastErr instanceof Error) {
            console.error('Error name:', broadcastErr.name);
            console.error('Error message:', broadcastErr.message);
            console.error('Error stack:', broadcastErr.stack);
          }
          setBroadcastStatus(`Failed to broadcast: ${broadcastErr instanceof Error ? broadcastErr.message : String(broadcastErr)}`);
        }
      }
    } catch (err) {
      console.error('Signing error:', err);
      setError('Failed to sign: ' + (err instanceof Error ? err.message : String(err)));
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
          <button
            onClick={generateNewKey}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors w-full sm:w-auto"
          >
            Generate New Key
          </button>
          
          <div className="flex-1 sm:ml-4">
            <input
              type="text"
              placeholder="Import private key (0x...)"
              onChange={importKey}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
            />
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {privateKey && privateKey !== '0x' && (
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Private Key:</span>{' '}
              <span className="font-mono break-all">{privateKey}</span>
            </p>
          </div>
        )}

        {address && (
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Address:</span>{' '}
              <span className="font-mono break-all">{address}</span>
            </p>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-gray-700">
            Message to Sign
          </label>
          <input
            id="message"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
          />
        </div>

        <button
          onClick={signMessage}
          disabled={!wallet}
          className={`w-full px-4 py-2 rounded-md transition-colors ${
            wallet
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Sign Message
        </button>

        {signedMessage && (
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-md overflow-x-auto">
            <p className="text-sm font-medium text-gray-700 mb-2">Signed Message:</p>
            <p className="text-sm font-mono whitespace-pre-wrap break-all text-gray-600">{signedMessage}</p>
          </div>
        )}

        {broadcastStatus && (
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-md overflow-x-auto">
            <p className="text-sm whitespace-pre-wrap break-all text-gray-600">{broadcastStatus}</p>
          </div>
        )}
      </div>
    </div>
  );
}
