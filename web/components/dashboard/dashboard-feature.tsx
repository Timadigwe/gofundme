'use client';

import { FC, useState } from 'react';
import { AppHero } from '../ui/ui-layout';
import { time } from 'console';
import { title } from 'process';

const links: { label: string; href: string }[] = [
  { label: 'Solana Docs', href: 'https://docs.solana.com/' },
  { label: 'Solana Faucet', href: 'https://faucet.solana.com/' },
  { label: 'Solana Cookbook', href: 'https://solanacookbook.com/' },
  { label: 'Solana Stack Overflow', href: 'https://solana.stackexchange.com/' },
  {
    label: 'Solana Developers GitHub',
    href: 'https://github.com/solana-developers/',
  },
];

// const formatCurrency = (curr: number) => {
//   new Intl.NumberFormat()
// }

const campaignData = [
  {
    title: "Education",
    amount: 5000,
  },
  {
    title: "School",
    amount: 500,
  },
  {
    title: "Housing",
    amount: 1500,
  }, 
  {
    title: "School",
    amount: 2500,
  },
];

type CampaignDonateButtonProps = {
  onClick: () => void;
};
const CampaignDonateButton: FC<CampaignDonateButtonProps> = ({onClick}) => {
  return (
    <button
      className='hover:p-1.5 hover:text-black hover:bg-white ease-out duration-800 w-full p-2 border-2 rounded-lg text-sm text-white bg-black'
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      Donate now
    </button>
  );
};

type CampaignCardProps = {
  title: string;
  amount: number;
  onCardClick: () => void;
  onDonateClick: () => void;
};
const CampaignCard: FC<CampaignCardProps> = (
  { title, amount, onCardClick, onDonateClick }
) => {
  return (
    <div
      className="w-full sm:max-w-[22rem] lg:max-w-[20rem] min-h-[10rem] z-3 rounded-lg border-2 border-black p-2 relative"
      onClick={onCardClick}
    >
      <p className="text-xl font-bold">{title}</p> 
      <p>◎{amount}</p> 

      <div
        className='absolute bottom-2 right-2 z-10'
      >
        <CampaignDonateButton onClick={onDonateClick} />
      </div>
    </div>
  );
};

type CampaignCardListProps = {
  onCardClick: (
    currentData: {
      title: string;
      amount: number;
    }
  ) => void;
  onDonateClick: () => void;
};
const CampaignCardList: FC<CampaignCardListProps> = ({onCardClick, onDonateClick}) => {
  return (
    <div
      className='lg:p-4 flex sm:flex-col justify-center  md:flex-row gap-2 overflow-y-scroll flex-wrap cursor-pointer'
    >
      {
        [...campaignData, ...campaignData, ...campaignData].map(
          ({title, amount}, index) => (
            <CampaignCard 
              key={index + "str"}
              title={title}
              amount={amount}
              onCardClick={() => onCardClick({title, amount})}
              onDonateClick={onDonateClick}
            />
          )
        )
      }
    </div>
  );
};

type HeaderTextProps = {
  headerText: string;
};
const HeaderText: FC<HeaderTextProps> = ({headerText}) => {
  return (
    <p
      className='text-[32px] md:text-[48px] font-extrabold text-center'
    >
      {headerText}
    </p>
  );
}


type InnerAmtProps = {
  text: string;
  amount: number;
};
const InnerAmt: FC<InnerAmtProps> = (
  {
    text, amount
  }
) => {
  return (
    <div
      className='flex flex-col w-full justify-between items-center py-2 border-2 border-black border-y-0'
    >
      <p>{text}</p>
      <p>{amount}</p>
    </div>
  );
};

type DetailsViewProps = {
  title: string;
  amount: number;
  onDonateClick: () => void;
};
const DetailsView: FC<DetailsViewProps> = (
  {
    title, amount, onDonateClick
  }
) => {
  return (
    <div
      className='items-center flex flex-col pt-20 p-5 h-[100dvh]'
    >
      <p
        className='text-xl font-extrabold'
      >{title}</p>
ou
      <div
        className='border-2 rounded-lg border-black w-full h-[6rem] my-3 flex'
      >
        <InnerAmt 
          text={"Raised"}
          amount={2000}
        />
        <InnerAmt 
          text={"Target"}
          amount={5000}
        />  
        <InnerAmt 
          text={"Donations"}
          amount={50}
        />                
      </div>

      <p className='self-start font-bold'>About</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>

      <div
        className='mt-auto'
      >
        <CampaignDonateButton 
          onClick={onDonateClick}
        />
      </div>
    </div>
  );
}


type DonateViewProps = {
  onClick: () => void;
};
const DonateView: FC<DonateViewProps> = ({onClick}) => {
  return (
    <div
      className='h-[100dvh] flex flex-col w-full justify-center items-center'
    >
      <p
        className='font-extrabold text-lg pb-4'
      >Enter amount</p>
      <div
        className='flex flex-col md:flex-row gap-2 items-center'
      > 
        <div
          className='items-center flex gap-2'
        >
          <p>◎</p>
          <input type="number" className='bg-white border-2 p-1 rounded-md border-black focus-visible::border-0' placeholder='amount in sol' />
        </div>
        <ProceedToPaymentButtonateButton 
          onClick={onClick}
        />
      </div>

    </div>
  );
};

type ProceedToPaymentButtonProps = {
  onClick: () => void;
};
const ProceedToPaymentButtonateButton: FC<ProceedToPaymentButtonProps> = ({onClick}) => {
  return (
    <button
      className='hover:p-1.5 hover:text-black hover:bg-white ease-out duration-800 w-full p-2 border-2 rounded-lg text-sm text-white bg-black'
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      Proceed to payment
    </button>
  );
};


type CreateCampaignButtonProps = {
  onClick: () => void;
};
const CreateCampaignButton: FC<CreateCampaignButtonProps> = ({onClick}) => {
  return (
    <button
      className='hover:p-1.5 max-w-[22rem] md:ml-12 hover:text-black hover:bg-white ease-out duration-800 w-full p-2 border-2 rounded-lg text-sm text-white bg-black'
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      Create a campaign
    </button>
  );
};


type WithdrawFundButtonProps = {
  onClick: () => void;
};
const WithdrawFundButton: FC<WithdrawFundButtonProps> = ({onClick}) => {
  return (
    <button
      className='hover:p-1.5 max-w-[22rem] md:ml-12 hover:text-black hover:bg-white ease-out duration-800 w-full p-2 border-2 rounded-lg text-sm text-white bg-black'
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      Withdraw Funds
    </button>
  );
};


type CreateCampaignViewProps = {
  onClick: () => void;
};
const CreateCampaignView: FC<CreateCampaignViewProps> = ({onClick}) => {
  return (
    <div className='flex flex-col md:flex-row md:justify-center gap-2'>
      <div className='flex'>
        <p className='w-[4.5rem]'>Title:</p>
        <input type="text" placeholder='Enter campaign title' className='bg-white border-2 border-black px-2' />
      </div>
      <div className='flex'>
        <p className='w-[4.5rem]'>Amount:</p>
        <input type="text" placeholder='Enter campaign target' className='bg-white border-2 border-black px-2'/>
      </div>

      <button
      className='hover:p-1.5 max-w-[22rem] md:ml-12 hover:text-black hover:bg-white ease-out duration-800 w-full p-2 border-2 rounded-lg text-sm text-white bg-black'
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      Create a campaign
    </button>
    </div>


  )
};

type WithdrawViewProps = {
  onClick: () => void;
};
const WithdrawFundView: FC<WithdrawViewProps> = ({onClick}) => {
  return (
    <div className='flex flex-col md:flex-row md:justify-center gap-2'>
      <div className='flex'>
        <p className='w-[4.5rem]'>Amount:</p>
        <input type="number" placeholder='Enter amount to withdraw' className='bg-white border-2 border-black px-2' />
      </div>
      

      <button
      className='hover:p-1.5 max-w-[22rem] md:ml-12 hover:text-black hover:bg-white ease-out duration-800 w-full p-2 border-2 rounded-lg text-sm text-white bg-black'
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      Withdraw Funds
    </button>
    </div>


  )
};

enum AppView {
  CampaignList = "campaign_list",
  CampaignDetails = "campaign_detail",
  CampaignDonate = "campaign_donate",
  CampaignCreate = "campaign_create",
  WithdrawFund = "withdraw_funds"
}
export default function DashboardFeature() {
  const [view, setView] = useState(AppView.CampaignList);
  const [currentData, setCurrentData] = useState({title: "", amount: 0});

  return (
    <div
      className="w-full h-[100dvh] flex flex-col gap-2 p-3"
    >
      {
        view !== AppView.CampaignList &&
        (
          <p 
            className='absolute underline cursor-pointer'
            onClick={() => setView(AppView.CampaignList)}
          >close</p>
        )
      }
      <HeaderText 
        headerText={
          view === AppView.CampaignList ? "Campaigns" : 
          view === AppView.CampaignDetails ? "Details" :
          view === AppView.CampaignCreate ? "Create Campaign" :
          view === AppView.WithdrawFund ? "Withdraw Funds" : "Donate"
        }
      />

      {
        view === AppView.CampaignList &&
        (
          <CreateCampaignButton 
            onClick={() => {
              setView(AppView.CampaignCreate);
            }}
          />
        )
      }

      {
        view === AppView.WithdrawFund && (
          <WithdrawFundView 
            onClick={() => setView(AppView.WithdrawFund)}
          />
        )
      }

      {
        view === AppView.CampaignList && (
          <WithdrawFundButton 
            onClick={() => {
              setView(AppView.WithdrawFund);
            }}
           /> 
        )
      }

      {
        view === AppView.CampaignCreate && (
          <CreateCampaignView 
            onClick={() => setView(AppView.CampaignList)}
          />
        )
      }

      {
        view === AppView.CampaignList &&
        (
          <CampaignCardList 
            onCardClick={({title, amount}) => {
              setCurrentData({title, amount});
              setView(AppView.CampaignDetails)
            }}
            onDonateClick={() => setView(AppView.CampaignDonate)}
          /> 
        )
      }

      {
        view === AppView.CampaignDetails &&
        (
          <DetailsView 
            title={currentData.title}
            amount={currentData.amount}
            onDonateClick={() => setView(AppView.CampaignDonate)}
          />
        )
      }
      
      {
        view === AppView.CampaignDonate &&
        (
          <DonateView 
            onClick={() => {
              console.log("lol!");
            }}
          />
        )
      }
    </div>
  );
}
