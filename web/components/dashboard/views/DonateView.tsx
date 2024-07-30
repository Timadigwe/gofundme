import { FC } from 'react';
import { BaseButton } from '../buttons/BaseButton';

type DonateViewProps = {
  onClick: () => void;
};
export const DonateView: FC<DonateViewProps> = ({ onClick }) => {
  return (
    <div className="h-[100dvh] flex flex-col w-full justify-center items-center font-mono">
      <p className="font-extrabold text-lg pb-4">Enter amount</p>
      <div className="flex flex-col md:flex-row gap-2 items-center">
        <div className="items-center flex gap-2">
          <p>◎</p>
          <input
            type="number"
            className="bg-white p-3 rounded-xl focus-visible::border-0"
            placeholder="amount in sol"
          />
        </div>
        <BaseButton text={"Proceed to Payment"} onClick={onClick} />
      </div>
    </div>
  );
};
