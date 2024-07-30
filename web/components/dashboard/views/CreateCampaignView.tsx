import { FC } from 'react';
import { BaseButton } from '../buttons/BaseButton';

type CreateCampaignViewProps = {
  onClick: () => void;
};
export const CreateCampaignView: FC<CreateCampaignViewProps> = ({
  onClick,
}) => {
  return (
    <div className="flex flex-col justify-center items-center mt-[9rem] gap-2 font-mono">
      <div className="flex">
        <p className="w-[4.5rem]">Title:</p>
        <input
          type="text"
          placeholder="Enter campaign title"
            className="bg-white p-3 px-10 rounded-xl focus-visible::border-0"
          // className="bg-white border-2 border-black px-2 w-[30rem]"
        />
      </div>
      <div className="flex">
        <p className="w-[4.5rem]">Amount:</p>
        <input
          type="text"
          placeholder="Enter campaign target"
            className="bg-white p-3 px-10 rounded-xl focus-visible::border-0"
          // className="bg-white border-2 border-black px-2 w-[30rem]"
        />
      </div>

      <div className='w-full max-w-[22rem] mt-2'>
        <BaseButton 
          text={"Create a campaign"} 
          onClick={onClick}
        />
      </div>
    </div>
  );
};
