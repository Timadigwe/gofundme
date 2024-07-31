
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { BaseButton } from '../buttons/BaseButton';
import { AnchorWallet } from '@solana/wallet-adapter-react';
import { fetchAllCampaigns, initialize, PROGRAMID } from '@/app/utils/helpers';
import { PublicKey, Connection } from '@solana/web3.js';
import { useWalletConnect } from '../useWalletConnect';
import { CampaignCategory } from '../types';
import { Campaign } from '@/app/utils/campaigns';
// import Image from 'next/image';

type CategoryCardProps = {
  src: string;
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
      className="z-10 rounded-[24px] bg-cover bg-center bg-no-repeat cursor-pointer relative w-[9rem] h-[12.6rem] md:w-[13rem] md:h-[18.2rem]"
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

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCampaignTitle(e.target.value);
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCampaignAmount(e.target.value);
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCampaignDate(e.target.value);
  };

  useEffect(() => {
    connection.getProgramAccounts(new PublicKey(PROGRAMID)).then(async  (accounts) => {
      const campaigns: Campaign[] = accounts.reduce((accum:Campaign[], {pubkey, account}) => {
        const campaign = Campaign.deserialize(account.data)
        if(!campaign){
          return accum
        }
        return [...accum, campaign]
      },[])
      setCampaigns(campaigns)
    })
  },[])

  const createCampaign = () => {
    setIsLoading(true);
    if (publicKey && anchor_wallet && connection && category) {
      initialize(publicKey, anchor_wallet, connection, campaignTitle, campaignAmount,campaignDate,category)
      .then((res) => {
        console.log('res', res);
        setIsLoading(false)
        setView()
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false)
      });
     }
  }

  // console.log("category:", category);
  // console.log("campaign title:", campaignTitle);
  // console.log("campaign amount:", campaignAmount);
  // console.log("campaign end date:", campaignDate);
  console.log("campaigns:",campaigns);

  return (
    <div className="flex flex-col justify-center items-center gap-2 font-mono">
      <p className="font-mono self-center mb-[1rem]">
        Please select a category
      </p>

      <div className="flex px-5 md:px-0 md:justify-center gap-5 md:gap-10 flex-wrap w-full">
        <CategoryCard
          src={'/education.webp'}
          category={'Education'}
          isSelected={'Education' === category}
          onClick={() => {
            setCategory('Education');
          }}
        />
        <CategoryCard
          src={'/personal.webp'}
          category={'Personal'}
          isSelected={'Personal' === category}
          onClick={() => {
            setCategory('Personal');
          }}
        />
        <CategoryCard
          src={'/community.webp'}
          category={'Community'}
          isSelected={'Community' === category}
          onClick={() => {
            setCategory('Community');
          }}
        />
        <CategoryCard
          src={'/health.webp'}
          category={'Health'}
          isSelected={'Health' === category}
          onClick={() => {
            setCategory('Health');
          }}
        />
        <CategoryCard
          src={'/project.webp'}
          category={'Project'}
          isSelected={'Project' === category}
          onClick={() => {
            setCategory('Project');
          }}
        />
      </div>

      {/* spacer */}
      <div className="h-8 w-4"></div>

      <div className="flex flex-col gap-4">
        <input
          type="text"
          value={campaignTitle}
          onChange={handleTitleChange}
          placeholder="Enter campaign title"
          className="bg-white p-3 w-[22rem] rounded-xl focus-visible::border-0"
        />
        <input
          type="number"
          placeholder="amount in sols"
         value={campaignAmount}
          onChange={handleAmountChange}
          className="bg-white p-3 w-[22rem] rounded-xl focus-visible::border-0"
        />
        <input
          type="date"
          value={campaignDate}
          onChange={handleDateChange}
          // placeholder="Enter campaign target"
          className="bg-white text-black w-[22rem] p-3 rounded-xl focus-visible::border-0"
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
