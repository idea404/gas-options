import { useState } from 'react';
import { PublicClient } from '@nilfoundation/niljs';

const RPC_ENDPOINT = process.env.NEXT_PUBLIC_NIL_RPC_URL || 'https://api.devnet.nil.foundation/api';

export function useChainId(client: PublicClient | null) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);

  const fetchChainId = async () => {
    if (!client) {
      const error = new Error('Client not initialized');
      setError(error);
      throw error;
    }

    setIsLoading(true);
    setError(null);

    try {
      const id = await client.chainId();
      console.log('Chain ID fetched:', id);
      
      // Check if id is undefined or null, but allow 0
      if (id === undefined || id === null) {
        throw new Error('Invalid chain ID received');
      }
      
      setChainId(id);
      return id;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch chain ID');
      console.error('Failed to fetch chain ID:', err);
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fetchChainId,
    chainId,
    isLoading,
    error,
  };
}
