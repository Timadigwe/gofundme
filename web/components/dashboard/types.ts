export type CampaignCategory =
  | 'Education'
  | 'Personal'
  | 'Community'
  | 'Health'
  | 'Project';

export type CampaignData = {
  category: CampaignCategory;
  title: string;
  amount: number;
  raised: number;
  daysLeft: number;
};
