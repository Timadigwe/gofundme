import { AnchorWallet } from '@solana/wallet-adapter-react';
import { initialize } from '@/app/utils/helpers';
import { PublicKey, Connection } from '@solana/web3.js';

export const connectWallet = (
  publicKey?: PublicKey | null,
  anchor_wallet?: AnchorWallet,
  connection?: Connection
) => {
  console.log('--testing program');
  if (publicKey && anchor_wallet && connection) {
    const campaignName = 'alright lets try this';
    // const amount = '40';

    // initialize(publicKey, anchor_wallet, connection, campaignName)
    //   .then((res) => {
    //     console.log('res', res);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  }
};
