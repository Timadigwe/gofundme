import { FC } from 'react';

type CampaignDonateButtonProps = {
  onClick: () => void;
};
export const CampaignDonateButton: FC<CampaignDonateButtonProps> = ({
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
      Donate now
    </button>
  );
};
