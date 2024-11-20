import { useState, useEffect } from 'react';
import { PublicClient } from '@nilfoundation/niljs';

interface WalletBalanceState {
  balance: string | null;
  error: Error | null;
  isLoading: boolean;
}

export function useWalletBalance(client: PublicClient | null, address: `0x${string}`) {
  const [state, setState] = useState<WalletBalanceState>({
    balance: null,
    error: null,
    isLoading: true,
  });

  useEffect(() => {
    const fetchBalance = async () => {
      if (!client || !address) {
        setState({
          balance: null,
          error: new Error('Client or address not provided'),
          isLoading: false,
        });
        return;
      }

      try {
        const balance = await client.getBalance(address, 'latest');
        setState({
          balance: balance.toString(),
          error: null,
          isLoading: false,
        });
      } catch (err) {
        setState({
          balance: null,
          error: err instanceof Error ? err : new Error('Failed to fetch balance'),
          isLoading: false,
        });
      }
    };

    fetchBalance();
  }, [client, address]);

  return state;
}
