import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from '@solana/wallet-adapter-react';

export const useWalletConnect = () => {
  const { connection } = useConnection();
  const anchor_wallet = useAnchorWallet();
  const wallet = useWallet();

  return { connection, anchor_wallet, wallet };
};
