'use client';

import Image from 'next/image';
import { FC, useState } from 'react';

import { IconArrowLeft } from '@tabler/icons-react';

import { DonateView } from './views/DonateView';
import { DetailsView } from './views/DetailsView';
import { BaseButton } from './buttons/BaseButton';
import { connectWallet } from './connect.wallet';
import { useWalletConnect } from './useWalletConnect';
import { WithdrawFundView } from './views/WithdrawView';
import { CampaignCardView } from './views/CampaignCardView';
import { CreateCampaignView } from './views/CreateCampaignView';
import { CampaignCategory, CampaignData } from './types';

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
  const [currentData, setCurrentData] = useState<CampaignData>({
    category: 'Personal',
    title: '',
    amount: 0,
    raised: 0,
    daysLeft: 0,
  });
  const { connection, anchor_wallet, wallet } = useWalletConnect();
  const publicKey = wallet.publicKey;

  const triggerWalletConnection = () => {
    connectWallet(publicKey, anchor_wallet, connection);
  };

  const DetailsBgImgSrcMap: Record<CampaignCategory, string> = {
    Project: 'project2.jpg',
    Education: 'education2.jpeg',
    Community: 'community2.jpg',
    Health: 'health2.jpg',
    Personal: 'personal2.png',
  };
  const src = DetailsBgImgSrcMap[currentData.category];

  return (
    <div
      className="bg-cover bg-center bg-no-repeat w-full min-h-[100dvh] flex flex-col gap-2 p-3 bg-stone-300"
      style={
        view === AppView.CampaignDetails || view === AppView.CampaignDonate
          ? { backgroundImage: `url(${src})` }
          : {}
      }
    >
      <div className="flex items-center w-full justify-between md:px-4">
        <div className="cursor-pointer w-fit flex gap-2 items-center bg-stone-300 p-2 md:p-3 rounded-[34px]">
          <img
            className="w-8 h-8 md:w-10 md:h-10"
            src={'/app-logo.png'}
            alt="app logo"
          />
          <p
            className={
              'font-extrabold text-lg md:text-xl font-mono stroke-white'
            }
          >
            dropfunds
          </p>
        </div>
        <div className="underline cursor-pointer w-[8rem]">
          <BaseButton text={'Connect'} onClick={triggerWalletConnection} />
        </div>
      </div>

      {view === AppView.CampaignList && (
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
      )}
      {view !== AppView.CampaignList && (
        <div
          className="text-[48px] md:ml-6 w-fit bg-stone-400 p-2 rounded-[50px]"
          onClick={() => setView(AppView.CampaignList)}
        >
          <IconArrowLeft style={{ cursor: 'pointer', color: '#000000' }} />
        </div>
      )}

      {view == AppView.CampaignList && (
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
      )}

      {view === AppView.CampaignCreate && (
        <CreateCampaignView onClick={() => setView(AppView.CampaignList)} />
      )}

      {view === AppView.WithdrawFund && (
        <WithdrawFundView onClick={() => setView(AppView.WithdrawFund)} />
      )}

      {view === AppView.CampaignList && (
        <CampaignCardView
          onCardClick={(campaignData) => {
            setCurrentData(campaignData);
            setView(AppView.CampaignDetails);
          }}
          onDonateClick={() => setView(AppView.CampaignDonate)}
        />
      )}

      {view === AppView.CampaignDetails && (
        <DetailsView
          campaignData={currentData}
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
