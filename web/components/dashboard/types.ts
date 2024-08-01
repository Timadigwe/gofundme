export type CampaignCategory =
  | 'education'
  | 'personal'
  | 'community'
  | 'health'
  | 'project';

export type CampaignData = {
  category: CampaignCategory;
  name: string;
  expectedAmount: number;
  amountRaised: number;
  endDate: number;
};
