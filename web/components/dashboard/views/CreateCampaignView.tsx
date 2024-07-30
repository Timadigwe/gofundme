import { FC } from 'react';

type CreateCampaignViewProps = {
  onClick: () => void;
};
export const CreateCampaignView: FC<CreateCampaignViewProps> = ({
  onClick,
}) => {
  return (
    <div className="flex flex-col justify-center items-center mt-[9rem] gap-2">
      <div className="flex">
        <p className="w-[4.5rem]">Title:</p>
        <input
          type="text"
          placeholder="Enter campaign title"
          className="bg-white border-2 border-black px-2 w-[30rem]"
        />
      </div>
      <div className="flex">
        <p className="w-[4.5rem]">Amount:</p>
        <input
          type="text"
          placeholder="Enter campaign target"
          className="bg-white border-2 border-black px-2 w-[30rem]"
        />
      </div>

      <button
        className="hover:p-1.5 max-w-[22rem] md:ml-12 hover:text-black hover:bg-white ease-out duration-800 w-full p-2 border-2 rounded-lg text-sm text-white bg-black"
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        Create a campaign
      </button>
    </div>
  );
};
