import { FC } from 'react';
import { BaseButton } from '../buttons/BaseButton';

type WithdrawViewProps = {
  onClick: () => void;
};
export const WithdrawFundView: FC<WithdrawViewProps> = ({ onClick }) => {
  return (
    <div className="flex flex-col justify-center items-center mt-[10rem] gap-2">
      <div className="flex">
        <p className="w-[4.5rem]">Amount:</p>
        <input
          type="text"
          placeholder="Enter withdraw amount"
            className="bg-white p-3 px-12 rounded-xl focus-visible::border-0"
          // className="bg-white border-2 border-black px-2 w-[30rem]"
        />        
      </div>

      <div className='w-full max-w-[22rem] mt-2'>
        <BaseButton
          text={"Withdraw Funds"} 
          onClick={onClick}
        />
      </div>      
    </div>
  );
};
