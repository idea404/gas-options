import { useState, useEffect } from 'react';
import { PublicClient, WalletV1, LocalECDSAKeySigner, bytesToHex } from '@nilfoundation/niljs';

interface WalletState {
  wallet: WalletV1 | null;
  seqno: number;
  error: Error | null;
  isLoading: boolean;
}

export function useWallet(client: PublicClient | null, privateKey: `0x${string}` | null) {
  const [state, setState] = useState<WalletState>({
    wallet: null,
    seqno: 0,
    error: null,
    isLoading: true,
  });

  useEffect(() => {
    const initWallet = async () => {
      if (!client || !privateKey) {
        setState({
          wallet: null,
          seqno: 0,
          error: new Error('Client or private key not provided'),
          isLoading: false,
        });
        return;
      }

      try {
        const signer = new LocalECDSAKeySigner({ privateKey });
        const shardId = client.getShardId();
        
        if (shardId === undefined) {
          throw new Error('Shard ID is not set in the client');
        }

        const pubkey = signer.getPublicKey();
        
        // Create wallet instance
        const wallet = new WalletV1({
          pubkey,
          client,
          signer,
          shardId,
          salt: BigInt(0),
        });

        // Check if wallet is deployed
        const isDeployed = await wallet.checkDeploymentStatus();
        console.log('Wallet deployment status:', isDeployed);

        // Get initial sequence number
        const address = wallet.address;
        const seqno = await client.getMessageCount(address, 'latest');
        console.log('Initial sequence number:', seqno);

        setState({
          wallet,
          seqno,
          error: null,
          isLoading: false,
        });
      } catch (err) {
        console.error('Failed to initialize wallet:', err);
        setState({
          wallet: null,
          seqno: 0,
          error: err instanceof Error ? err : new Error('Unknown error initializing wallet'),
          isLoading: false,
        });
      }
    };

    initWallet();
  }, [client, privateKey]);

  return state;
}
