import { FC } from 'react';

type WithdrawViewProps = {
  onClick: () => void;
};
export const WithdrawFundView: FC<WithdrawViewProps> = ({ onClick }) => {
  return (
    <div className="flex flex-col justify-center items-center mt-[10rem] gap-2">
      <div className="flex">
        <p className="w-[4.5rem]">Amount:</p>
        <input
          type="number"
          placeholder="Enter amount to withdraw"
          className="bg-white border-2 border-black px-2 w-[22rem]"
        />
      </div>

      <button
        className="hover:p-1.5 max-w-[22rem] md:ml-12 hover:text-black hover:bg-white ease-out duration-800 w-full p-2 border-2 rounded-lg text-sm text-white bg-black"
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        Withdraw Funds
      </button>
    </div>
  );
};
