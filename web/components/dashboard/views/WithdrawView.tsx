import { ChangeEvent, FC, useState } from 'react';
import { BaseButton } from '../buttons/BaseButton';
import { useWalletConnect } from '../useWalletConnect';
import { withdraw } from '@/app/utils/helpers';
import { toast, Toaster } from "sonner";

type WithdrawViewProps = {
  setView: () => void;
};
export const WithdrawFundView: FC<WithdrawViewProps> = ({ setView }) => {
  const { connection, anchor_wallet, wallet } = useWalletConnect();
  const publicKey = wallet.publicKey;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [campaignTitle, setCampaignTitle] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCampaignTitle(e.target.value);
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const withdrawFunds = () => {
    if (publicKey && anchor_wallet && connection && amount && campaignTitle) { 
      withdraw(publicKey,anchor_wallet,connection,campaignTitle,amount)
      .then((res) => {
        console.log('res', res);
        setIsLoading(false)
        toast('Amount withdrawn successfully')
        setView();
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false)
        toast('Something went wrong pls try again')
        setView()
      });
    }
  }

  return (
    <div className="flex flex-col justify-center items-center mt-[10rem] gap-2 font-mono">
      <Toaster/>
      <div className="flex flex-col gap-4">
      <input
          type="text"
          value={campaignTitle}
          onChange={handleTitleChange}
          placeholder="Enter Campaign Name"
          className="bg-white w-[22rem] p-3 px-12 rounded-xl focus-visible::border-0"
        />
        <input
          type="text"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Enter withdraw amount"
          className="bg-white w-[22rem] p-3 px-12 rounded-xl focus-visible::border-0"
        />
      </div>

      <div className="w-full max-w-[22rem] mt-2">
        <BaseButton text={isLoading ? "...Loading" :'Withdraw Funds'} onClick={withdrawFunds} />
      </div>
    </div>
  );
};
