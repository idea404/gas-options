import { useState, useEffect } from 'react';
import { PublicClient, HttpTransport } from '@nilfoundation/niljs';

export interface NilClientState {
  client: PublicClient | null;
  error: Error | null;
  isLoading: boolean;
}

export function useNilClient() {
  const [state, setState] = useState<NilClientState>({
    client: null,
    error: null,
    isLoading: true,
  });

  useEffect(() => {
    const initClient = () => {
      try {
        const shardId = Number(process.env.NEXT_PUBLIC_NIL_SHARD_ID || 1);
        console.log('Initializing Nil client with shard ID:', shardId);
        
        const client = new PublicClient({
          transport: new HttpTransport({
            endpoint: process.env.NEXT_PUBLIC_NIL_RPC_URL || 'http://localhost:8545',
            timeout: 60000, // 60 seconds timeout
          }),
          shardId,
        });
        
        setState({
          client,
          error: null,
          isLoading: false,
        });
      } catch (err) {
        console.error('Failed to initialize Nil client:', err);
        setState({
          client: null,
          error: err instanceof Error ? err : new Error('Failed to initialize nil client'),
          isLoading: false,
        });
      }
    };

    initClient();
  }, []);

  return state;
}
