
import { ChangeEvent, FC, useState } from 'react';
import { BaseButton } from '../buttons/BaseButton';
import {  initialize } from '@/app/utils/helpers';
import { useWalletConnect } from '../useWalletConnect';
import { CampaignCategory } from '../types';
import { toast, Toaster } from "sonner";
// import Image from 'next/image';

type CategoryCardProps = {
  src: string
  category: CampaignCategory;
  isSelected: boolean;
  onClick: () => void;
};

type CreateCampaignViewProps = {
  setView: () => void;
};

const CategoryCard: FC<CategoryCardProps> = ({
  src,
  category,
  isSelected,
  onClick,
}) => {
  return (
    <div
      className="z-10 rounded-[24px] bg-cover bg-center bg-no-repeat cursor-pointer relative w-[9rem] h-[12.6rem] md:w-[13rem] md:h-[18.2rem] mx-auto lg:mx-0 md:mx-0"
      onClick={onClick}
      style={{ backgroundImage: `url(${src})` }}
    >
      <p className="z-30 text-sm rounded-xl px-2 p-1 w-fit bg-stone-300 absolute top-2 left-2 md:top-4 md:left-4 justify-center items-center">
        <p>{category}</p>
      </p>
      {isSelected && (
        <>
          <div className="z-30 absolute bottom-2 right-2 md:right-4">
            <p className="text-[32px] md:text-[48px]">✅</p>
          </div>
          <div className="absolute bg-black opacity-30 w-full h-full rounded-[24px]"></div>
        </>
      )}
    </div>
  );
};

export const CreateCampaignView: FC<CreateCampaignViewProps> = ({
  setView,
}) => {
  const [category, setCategory] = useState<CampaignCategory>();

  const [campaignTitle, setCampaignTitle] = useState<string>("");
  const [campaignAmount, setCampaignAmount] = useState<string>("");
  const [campaignDate, setCampaignDate] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

   const { connection, anchor_wallet, wallet } = useWalletConnect();
  const publicKey = wallet.publicKey;

  

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCampaignTitle(e.target.value);
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCampaignAmount(e.target.value);
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCampaignDate(e.target.value);
  };


  const createCampaign = () => {
    setIsLoading(true);
    if (publicKey && anchor_wallet && connection && category) {
      initialize(publicKey, anchor_wallet, connection, campaignTitle, campaignAmount,campaignDate,category)
      .then((res) => {
        console.log('res', res);
        setIsLoading(false)
        toast("Campaign created successfully");
        setView()
      })
      .catch((err) => {
        console.error(err);
        toast("Oops something went wrong pls try again");
        setIsLoading(false)
      });
     }
  }

  return (
    <div className="flex flex-col justify-center items-center gap-2 font-mono">
       <Toaster />
      <p className="font-mono self-center mb-[1rem]">
        Please select a category
      </p>

      <div className="flex px-5 md:px-0 md:justify-center gap-5 md:gap-10 flex-wrap w-full">
        <CategoryCard
          src={'/education.webp'}
          category={'education'}
          isSelected={'education' === category}
          onClick={() => {
            setCategory('education');
          }}
        />
        <CategoryCard
          src={'/personal.webp'}
          category={'personal'}
          isSelected={'personal' === category}
          onClick={() => {
            setCategory('personal');
          }}
        />
        <CategoryCard
          src={'/community.webp'}
          category={'community'}
          isSelected={'community' === category}
          onClick={() => {
            setCategory('community');
          }}
        />
        <CategoryCard
          src={'/health.webp'}
          category={'health'}
          isSelected={'health' === category}
          onClick={() => {
            setCategory('health');
          }}
        />
        <CategoryCard
          src={'/project.webp'}
          category={'project'}
          isSelected={'project' === category}
          onClick={() => {
            setCategory('project');
          }}
        />
      </div>

      {/* spacer */}
      <div className="h-8 w-4"></div>

      <div className="flex flex-col gap-4 w-full">
        <input
          type="text"
          value={campaignTitle}
          onChange={handleTitleChange}
          placeholder="Enter campaign title"
          className="bg-white p-3 lg:w-[22rem] md:w-[22rem] mx-auto rounded-xl focus-visible::border-0"
        />
        <input
          type="number"
         value={campaignAmount}
          onChange={handleAmountChange}
          placeholder="Amount (◎)"
          className="bg-white p-3 lg:w-[22rem] md:w-[22rem] mx-auto rounded-xl focus-visible::border-0"
        />
        <input
          type="date"
          value={campaignDate}
          onChange={handleDateChange}
          // placeholder="Enter campaign target"
          className="bg-white text-black lg:w-[22rem] md:w-[22rem] mx-auto p-3 rounded-xl focus-visible::border-0"
          min={new Date().toISOString()}
          style={{ color: 'black', colorScheme: 'light' }}
        />
      </div>

      <div className='w-full max-w-[22rem] mt-2'>
        <BaseButton 
          text={isLoading ? "...Loading":"Create a campaign"} 
          onClick={createCampaign}
        />
      </div>
    </div>
  );
};

