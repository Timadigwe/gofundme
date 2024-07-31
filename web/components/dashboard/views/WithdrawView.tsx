import { FC } from 'react';
import { BaseButton } from '../buttons/BaseButton';

type WithdrawViewProps = {
  onClick: () => void;
};
export const WithdrawFundView: FC<WithdrawViewProps> = ({ onClick }) => {
  return (
    <div className="flex flex-col justify-center items-center mt-[10rem] gap-2 font-mono">
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter withdraw amount"
          className="bg-white w-[22rem] p-3 px-12 rounded-xl focus-visible::border-0"
        />
        <input
          type="text"
          placeholder="Enter wallet address"
          className="bg-white w-[22rem] p-3 px-12 rounded-xl focus-visible::border-0"
        />
      </div>

      <div className="w-full max-w-[22rem] mt-2">
        <BaseButton text={'Withdraw Funds'} onClick={onClick} />
      </div>
    </div>
  );
};
