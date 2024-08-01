import { ChangeEvent, FC, useState } from 'react';
import { BaseButton } from '../buttons/BaseButton';
import { useWalletConnect } from '../useWalletConnect';
import { donate } from '@/app/utils/helpers';

type DonateViewProps = {
  onClick: () => void;
  campaignName: string
};
export const DonateView: FC<DonateViewProps> = ({ onClick, campaignName }) => {
  const { connection, anchor_wallet, wallet } = useWalletConnect();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("");
  const publicKey = wallet.publicKey;

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const donateAmount = () => {
    setIsLoading(true);
    if (publicKey && anchor_wallet && connection && amount) {
      donate(publicKey,anchor_wallet,connection,campaignName,amount)
      .then((res) => {
        console.log('res', res);
        setIsLoading(false)
        onClick()
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false)
      });
     }
  }
  

  //console.log("name:", campaignName)
  return (
    <div className="flex justify-center overflow-y-scroll pt-[10rem] md:pt-[15rem] font-mono ">
      <div className="w-full md:w-[25rem] h-[10rem] bg-stone-300 gap-4 rounded-[24px] self-end p-4 md:p-6">
        <div className="flex flex-col gap-4 mb-4">
          <input
            type="number"
            placeholder="Enter donation amount"
            value={amount}
            onChange={handleAmountChange}
            className="bg-white p-3 px-12 rounded-xl focus-visible::border-0"
          />
        </div>
        <div className="w-full max-w-[22rem] mt-2">
          <BaseButton text={isLoading ? "...Loading":'Proceed to Payment'} onClick={donateAmount} />
        </div>
      </div>
    </div>
  );
};
