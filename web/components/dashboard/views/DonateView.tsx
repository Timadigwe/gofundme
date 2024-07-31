import { FC } from 'react';
import { BaseButton } from '../buttons/BaseButton';

type DonateViewProps = {
  onClick: () => void;
};
export const DonateView: FC<DonateViewProps> = ({ onClick }) => {
  return (
    <div className="flex justify-center overflow-y-scroll pt-[10rem] md:pt-[15rem] font-mono ">
      <div className="w-full md:w-[25rem] h-[10rem] bg-stone-300 gap-4 rounded-[24px] self-end p-4 md:p-6">
        <div className="flex flex-col gap-4 mb-4">
          <input
            type="number"
            placeholder="Enter donation amount"
            className="bg-white p-3 px-12 rounded-xl focus-visible::border-0"
          />
        </div>
        <div className="w-full max-w-[22rem] mt-2">
          <BaseButton text={'Proceed to Payment'} onClick={onClick} />
        </div>
      </div>
    </div>
  );
};
