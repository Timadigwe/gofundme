import { FC } from 'react';

type CreateCampaignButtonProps = {
  onClick: () => void;
};
export const CreateCampaignButton: FC<CreateCampaignButtonProps> = ({
  onClick,
}) => {
  return (
    <button
      className="hover:p-1.5 max-w-[15rem] hover:text-black hover:bg-white ease-out duration-800 w-full p-2 border-2 rounded-lg text-sm text-white bg-black"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      Create a campaign
    </button>
  );
};
