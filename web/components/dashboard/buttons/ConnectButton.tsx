import { FC } from 'react';

type ConnectWalletButtonProps = {
  onClick: () => void;
};
export const ConnectWalletButton: FC<ConnectWalletButtonProps> = ({
  onClick,
}) => {
  return (
    <button
      className="hover:p-1.5 hover:text-black hover:bg-white ease-out duration-800 w-full p-2 border-2 rounded-lg text-sm text-white bg-black"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      Connect Wallet
    </button>
  );
};
