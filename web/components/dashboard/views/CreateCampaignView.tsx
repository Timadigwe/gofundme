import { ChangeEvent, FC, useState } from 'react';
import { BaseButton } from '../buttons/BaseButton';
import { AnchorWallet } from '@solana/wallet-adapter-react';
import { initialize } from '@/app/utils/helpers';
import { PublicKey, Connection } from '@solana/web3.js';
import { useWalletConnect } from '../useWalletConnect';

type CreateCampaignViewProps = {
  setView: () => void;
};
export const CreateCampaignView: FC<CreateCampaignViewProps> = ({
  setView,
}) => {

  const [campaignTitle, setCampaignTitle] = useState<string>("");
  const [campaignAmount, setCampaignAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

   const { connection, anchor_wallet, wallet } = useWalletConnect();
  const publicKey = wallet.publicKey;

  

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCampaignTitle(e.target.value);
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCampaignAmount(e.target.value);
  };


  const createCampaign = () => {
    setIsLoading(true);
    if (publicKey && anchor_wallet && connection) {
      initialize(publicKey, anchor_wallet, connection, campaignTitle)
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

  return (
    <div className="flex flex-col justify-center items-center mt-[9rem] gap-2 font-mono">
      <div className="flex">
        <p className="w-[4.5rem]">Title:</p>
        <input
          type="text"
          value={campaignTitle}
          onChange={handleTitleChange}
          placeholder="Enter campaign title"
            className="bg-white p-3 px-10 rounded-xl focus-visible::border-0"
          // className="bg-white border-2 border-black px-2 w-[30rem]"
        />
      </div>
      <div className="flex">
        <p className="w-[4.5rem]">Amount:</p>
        <input
          type="text"
          value={campaignAmount}
          onChange={handleAmountChange}
          placeholder="Enter campaign target"
            className="bg-white p-3 px-10 rounded-xl focus-visible::border-0"
          // className="bg-white border-2 border-black px-2 w-[30rem]"
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
