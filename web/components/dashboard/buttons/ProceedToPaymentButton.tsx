import { FC } from 'react';

type ProceedToPaymentButtonProps = {
  onClick: () => void;
};
export const ProceedToPaymentButtonateButton: FC<
  ProceedToPaymentButtonProps
> = ({ onClick }) => {
  return (
    <button
      className="hover:p-1.5 hover:text-black hover:bg-white ease-out duration-800 w-full p-2 border-2 rounded-lg text-sm text-white bg-black"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      Proceed to payment
    </button>
  );
};
