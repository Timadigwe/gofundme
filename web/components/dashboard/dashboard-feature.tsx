'use client';

import { FC, useState } from 'react';
import { DonateView } from './views/DonateView';
import { DetailsView } from './views/DetailsView';
import { CampaignCardList } from './CampaignCardList';
import { WithdrawFundView } from './views/WithdrawView';
import { CreateCampaignView } from './views/CreateCampaignView';
import Image from 'next/image';
import { IconArrowLeft } from '@tabler/icons-react';
import { BaseButton } from './buttons/BaseButton';
import { useWalletConnect } from './useWalletConnect';
import { connectWallet } from './connect.wallet';

type HeaderTextProps = {
  headerText: string;
};
const HeaderText: FC<HeaderTextProps> = ({ headerText }) => {
  return (
    <p className="text-[32px] md:text-[48px] font-extrabold text-center font-mono">
      {headerText}
    </p>
  );
};

enum AppView {
  CampaignList = 'campaign_list',
  CampaignDetails = 'campaign_detail',
  CampaignDonate = 'campaign_donate',
  CampaignCreate = 'campaign_create',
  WithdrawFund = 'withdraw_funds',
}
export default function DashboardFeature() {
  const [view, setView] = useState(AppView.CampaignList);
  const [currentData, setCurrentData] = useState({ title: '', amount: 0 });
  const { connection, anchor_wallet, wallet } = useWalletConnect();
  const publicKey = wallet.publicKey;

  const triggerWalletConnection = () => {
    connectWallet(publicKey, anchor_wallet, connection);
  };

  return (
    <div className="w-full h-[100dvh] flex flex-col gap-2 p-3 bg-stone-300">
      <div className="flex items-center w-full justify-between md:px-4">
        <div className="cursor-pointer w-[8rem] flex gap-2 items-center">
          <Image src={'/app-logo.png'} alt="app logo" width={40} height={40} />
          <p className={'font-extrabold text-xl font-mono'}>dropfunds</p>
        </div>
        <div className="underline cursor-pointer w-[8rem]">
          <BaseButton text={'Connect'} onClick={triggerWalletConnection} />
        </div>
      </div>
      <HeaderText
        headerText={
          view === AppView.CampaignList
            ? 'Campaigns'
            : view === AppView.CampaignDetails
            ? 'Details'
            : view === AppView.CampaignCreate
            ? 'Create Campaign'
            : view === AppView.WithdrawFund
            ? 'Withdraw Funds'
            : 'Donate'
        }
      />
      {view !== AppView.CampaignList && (
        <div className="text-[48px] md:pl-6">
          <IconArrowLeft
            style={{ cursor: 'pointer', color: '#000000' }}
            onClick={() => setView(AppView.CampaignList)}
          />
        </div>
      )}

      <div className="justify-center flex gap-4 mt-4 w-full">
        {view === AppView.CampaignList && (
          <div className="w-full max-w-[20rem]">
            <BaseButton
              text={'Create campaign'}
              onClick={() => {
                setView(AppView.CampaignCreate);
              }}
            />
          </div>
        )}

        {view === AppView.CampaignList && (
          <div className="w-full max-w-[20rem]">
            <BaseButton
              text={'Withdraw funds'}
              onClick={() => {
                setView(AppView.WithdrawFund);
              }}
            />
          </div>
        )}
      </div>

      {view === AppView.CampaignCreate && (
        <CreateCampaignView onClick={() => setView(AppView.CampaignList)} />
      )}

      {view === AppView.WithdrawFund && (
        <WithdrawFundView onClick={() => setView(AppView.WithdrawFund)} />
      )}

      {view === AppView.CampaignList && (
        <CampaignCardList
          onCardClick={({ title, amount }) => {
            setCurrentData({ title, amount });
            setView(AppView.CampaignDetails);
          }}
          onDonateClick={() => setView(AppView.CampaignDonate)}
        />
      )}

      {view === AppView.CampaignDetails && (
        <DetailsView
          title={currentData.title}
          amount={currentData.amount}
          onDonateClick={() => setView(AppView.CampaignDonate)}
        />
      )}

      {view === AppView.CampaignDonate && (
        <DonateView
          onClick={() => {
            console.log('lol!');
          }}
        />
      )}
    </div>
  );
}
