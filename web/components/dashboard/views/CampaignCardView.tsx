import { FC } from 'react';
import { BaseButton } from '../buttons/BaseButton';
import { CampaignCategory, CampaignData } from '../types';

const campaignData: Array<CampaignData> = [
  {
    category: 'Education',
    title: 'Give every kid free education',
    amount: 5000,
    raised: 245,
    daysLeft: 24,
  },
  {
    category: 'Personal',
    title: 'I need to buy a house',
    amount: 500,
    raised: 245,
    daysLeft: 24,
  },
  {
    category: 'Community',
    title: "Let's build a borehole",
    amount: 1500,
    raised: 245,
    daysLeft: 24,
  },
  {
    category: 'Health',
    title: 'treat cancer',
    amount: 2500,
    raised: 245,
    daysLeft: 24,
  },
  {
    category: 'Project',
    title: 'Build spaceship',
    amount: 45000,
    raised: 2145,
    daysLeft: 214,
  },
];

type CampaignCardProps = {
  campaignData: CampaignData;
  onCardClick: () => void;
  onDonateClick: () => void;
};
const CampaignCard: FC<CampaignCardProps> = ({
  campaignData,
  onCardClick,
  onDonateClick,
}) => {
  const { category, title, amount, raised, daysLeft } = campaignData;

  const getCategoryClass = (category: CampaignCategory) => {
    switch (category) {
      case 'Education':
        return 'bg-education';
      case 'Personal':
        return 'bg-personal';
      case 'Community':
        return 'bg-community';
      case 'Health':
        return 'bg-health';
      case 'Project':
        return 'bg-project';
      default:
        return '';
    }
  };

  return (
    <div
      className={`w-full sm:max-w-[22rem] lg:max-w-[20rem] hover:lg:max-w-[20.5rem] min-h-[16rem] rounded-2xl p-6 relative shadow-lg hover:shadow-xl transition-all duration-300 ${getCategoryClass(
        category
      )}`}
      onClick={onCardClick}
    >
      <p className="text-sm font-light">{category}</p>
      <p className="text-2xl font-bold mb-6">{title}</p>
      <div className="mb-4">
        <p className="font-bold text-lg">◎{amount}</p>
        <p className="font-light text-sm">◎{raised} raised</p>
        <p className="font-light text-sm">{daysLeft} days left</p>
      </div>
      <div className="absolute bottom-4 right-4">
        <BaseButton text={'Donate now'} onClick={onDonateClick} />
      </div>
    </div>
  );
};

type CampaignCardListProps = {
  onCardClick: (currentData: CampaignData) => void;
  onDonateClick: () => void;
};
export const CampaignCardView: FC<CampaignCardListProps> = ({
  onCardClick,
  onDonateClick,
}) => {
  return (
    <div className="lg:p-4 flex sm:flex-col justify-center  md:flex-row gap-4 overflow-y-scroll flex-wrap cursor-pointer font-mono">
      {[...campaignData, ...campaignData.reverse(), ...campaignData].map(
        (campaignData, index) => (
          <CampaignCard
            key={index + 'str'}
            campaignData={campaignData}
            onCardClick={() => onCardClick(campaignData)}
            onDonateClick={onDonateClick}
          />
        )
      )}
    </div>
  );
};