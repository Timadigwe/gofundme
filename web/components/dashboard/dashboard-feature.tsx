'use client';

import { FC, useEffect, useState } from 'react';

import { IconArrowLeft } from '@tabler/icons-react';

import { DonateView } from './views/DonateView';
import { DetailsView } from './views/DetailsView';
import { BaseButton } from './buttons/BaseButton';
import { WithdrawFundView } from './views/WithdrawView';
import { CampaignCardView } from './views/CampaignCardView';
import { CreateCampaignView } from './views/CreateCampaignView';
import { CampaignCategory, CampaignData, DefaultCampaignData } from './types';
import { WalletButton } from '../solana/solana-provider';
import { useWalletConnect } from '../dashboard/useWalletConnect';
import { fetchAllCampaigns } from '@/app/utils/helpers';

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

  const [currentData, setCurrentData] =
    useState<CampaignData>(DefaultCampaignData);
  const { connection, anchor_wallet } = useWalletConnect();
  const [campaigns, setCampaigns] = useState<CampaignData[]>([]);

  const onCardClick = (campaignData: CampaignData) => {
    console.log({ campaignData });
    setCurrentData(campaignData);
    setView(AppView.CampaignDetails);
  };

  const DetailsBgImgSrcMap: Record<CampaignCategory, string> = {
    project: 'project2.jpg',
    education: 'education2.jpeg',
    community: 'community2.jpg',
    health: 'health2.jpg',
    personal: 'personal2.png',
  };
  const src = currentData.account.category
    ? DetailsBgImgSrcMap[currentData?.account?.category]
    : undefined;

  const fetchCampaigns = () => {
    console.log('fetching data');
    console.log({ anchor_wallet, connection });
    if (anchor_wallet && connection) {
      fetchAllCampaigns(anchor_wallet, connection)
        .then((campaigns) => {
          console.log('campaigns', campaigns);
          setCampaigns(campaigns);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [anchor_wallet]);

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
        <div className="underline cursor-pointer">
          {/* <BaseButton text={'Connect'} onClick={triggerWalletConnection} /> */}
          <WalletButton />
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
        <CreateCampaignView
          setView={() => {
            fetchCampaigns();
            setView(AppView.CampaignList);
          }}
        />
      )}

      {view === AppView.WithdrawFund && (
        <WithdrawFundView
          setView={() => {
            fetchCampaigns();
            setView(AppView.CampaignList);
          }}
        />
      )}

      {view === AppView.CampaignList && (
        <CampaignCardView onCardClick={onCardClick} campaigns={campaigns} />
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
            // console.log('lol!');
            fetchCampaigns();
            setView(AppView.CampaignList);
          }}
          campaignName={currentData?.account?.name}
        />
      )}
    </div>
  );
}
