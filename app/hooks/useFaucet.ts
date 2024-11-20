import { useState } from 'react';
import { FaucetClient, HttpTransport } from '@nilfoundation/niljs';

const FAUCET_ENDPOINT = process.env.NEXT_PUBLIC_NIL_RPC_URL || 'https://api.devnet.nil.foundation/api';

export function useFaucet() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const requestTokens = async (address: `0x${string}`, amount: number = 1000) => {
    setIsLoading(true);
    setError(null);

    try {
      const faucetClient = new FaucetClient({
        transport: new HttpTransport({
          endpoint: FAUCET_ENDPOINT,
        }),
      });

      // Get all available faucets
      const faucets = await faucetClient.getAllFaucets();
      const nilFaucetAddress = faucets['NIL'];

      if (!nilFaucetAddress) {
        throw new Error('NIL faucet not found');
      }

      // Request tokens from the faucet
      const txHash = await faucetClient.topUp({
        faucetAddress: nilFaucetAddress,
        walletAddress: address,
        amount,
      });

      return txHash;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to request tokens from faucet'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    requestTokens,
    isLoading,
    error,
  };
}
