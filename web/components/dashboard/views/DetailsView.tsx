import { FC } from 'react';
import { BaseButton } from '../buttons/BaseButton';


type InnerAmtProps = {
  text: string;
  amount: number;
};
const InnerAmt: FC<InnerAmtProps> = ({ text, amount }) => {
  return (
    <div className="flex flex-col w-full justify-between items-center py-2 border-2 border-black border-y-0">
      <p>{text}</p>
      <p>{amount}</p>
    </div>
  );
};

type DetailsViewProps = {
  title: string;
  amount: number;
  onDonateClick: () => void;
};
export const DetailsView: FC<DetailsViewProps> = ({
  title,
  amount,
  onDonateClick,
}) => {
  return (
    <div className="md:items-center flex flex-col  overflow-y-scroll md:pt-20 p-5 font-mono">
      <p className="text-xl font-extrabold">{title}</p>
      <div className="border-2 rounded-lg border-black w-full h-[6rem] my-3 flex">
        <InnerAmt text={'Raised'} amount={2000} />
        <InnerAmt text={'Target'} amount={5000} />
        <InnerAmt text={'Donations'} amount={50} />
      </div>
      <p className="self-start font-bold">About</p>
      <p className='pb-5'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur.
      </p>
      <div className="mt-auto">
        <BaseButton text={"Donate now"} onClick={onDonateClick} />
      </div>
    </div>
  );
};
