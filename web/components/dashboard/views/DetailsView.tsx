import { FC } from 'react';
import { BaseButton } from '../buttons/BaseButton';
import { CampaignData } from '../types';

type InnerAmtProps = {
  text: string;
  amount: number;
};
const InnerAmt: FC<InnerAmtProps> = ({ text, amount }) => {
  return (
    <div className="flex flex-col w-full justify-between items-center py-2 border-2 border-black border-y-0">
      <p className="font-extrabold">{text}</p>
      <p>{amount}</p>
    </div>
  );
};

type DetailsViewProps = {
  campaignData: CampaignData;
  onDonateClick: () => void;
};
export const DetailsView: FC<DetailsViewProps> = ({
  campaignData,
  onDonateClick,
}) => {
  const { category, title, amount, raised, daysLeft } = campaignData;

  return (
    <div className="flex justify-center overflow-y-scroll pt-[3rem] md:pt-[6rem] font-mono ">
      <div className="w-full md:w-[45rem] h-[30rem] bg-stone-300 rounded-[24px] self-end p-4 md:p-6">
        <p className="text-xl font-bold">{category}</p>
        <p className="my-20 text-3xl font-extrabold">{title}</p>
        <div className="border-2 rounded-lg border-black w-full h-[6rem] my-3 flex">
          <InnerAmt text={'Raised (◎)'} amount={raised} />
          <InnerAmt text={'Target (◎)'} amount={amount} />
          <InnerAmt text={'Days left'} amount={daysLeft} />
        </div>
        <div className="mt-auto">
          <BaseButton text={'Donate now'} onClick={onDonateClick} />
        </div>
      </div>
    </div>
  );
};
