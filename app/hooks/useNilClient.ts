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
        const client = new PublicClient({
          transport: new HttpTransport({
            endpoint: process.env.NEXT_PUBLIC_NIL_RPC_URL || 'http://localhost:8545',
            timeout: 60000, // 60 seconds timeout
          }),
        });
        
        setState({
          client,
          error: null,
          isLoading: false,
        });
      } catch (err) {
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
