import { FC } from 'react';
import { CampaignDonateButton } from './buttons/CampaignDonateButton';

const campaignData = [
  {
    title: 'Education',
    amount: 5000,
  },
  {
    title: 'School',
    amount: 500,
  },
  {
    title: 'Housing',
    amount: 1500,
  },
  {
    title: 'School',
    amount: 2500,
  },
];

type CampaignCardProps = {
  title: string;
  amount: number;
  onCardClick: () => void;
  onDonateClick: () => void;
};
const CampaignCard: FC<CampaignCardProps> = ({
  title,
  amount,
  onCardClick,
  onDonateClick,
}) => {
  return (
    <div
      className="w-full sm:max-w-[22rem] lg:max-w-[20rem] min-h-[10rem] z-3 rounded-lg border-2 border-black p-2 relative"
      onClick={onCardClick}
    >
      <p className="text-xl font-bold">{title}</p>
      <p>◎{amount}</p>

      <div className="absolute bottom-2 right-2 z-10">
        <CampaignDonateButton onClick={onDonateClick} />
      </div>
    </div>
  );
};

type CampaignCardListProps = {
  onCardClick: (currentData: { title: string; amount: number }) => void;
  onDonateClick: () => void;
};
export const CampaignCardList: FC<CampaignCardListProps> = ({
  onCardClick,
  onDonateClick,
}) => {
  return (
    <div className="lg:p-4 flex sm:flex-col justify-center  md:flex-row gap-2 overflow-y-scroll flex-wrap cursor-pointer">
      {[...campaignData, ...campaignData, ...campaignData].map(
        ({ title, amount }, index) => (
          <CampaignCard
            key={index + 'str'}
            title={title}
            amount={amount}
            onCardClick={() => onCardClick({ title, amount })}
            onDonateClick={onDonateClick}
          />
        )
      )}
    </div>
  );
};
