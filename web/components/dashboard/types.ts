import { PublicKey } from '@solana/web3.js';

export type CampaignCategory =
  | 'education'
  | 'personal'
  | 'community'
  | 'health'
  | 'project';

export type CampaignData = {
  account: {
    amountRaised: number;
    category: CampaignCategory;
    endDate: Date;
    expectedAmount: number;
    name: string;
    owner: PublicKey;
  };
  publicKey: PublicKey;
};

export const DefaultCampaignData: CampaignData = {
  account: {
    amountRaised: 0,
    category: 'health',
    endDate: new Date(),
    expectedAmount: 0,
    name: 'funds',
    owner: null as unknown as PublicKey,
  },
  publicKey: null as unknown as PublicKey,
};
