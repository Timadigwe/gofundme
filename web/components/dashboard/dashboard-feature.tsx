'use client';

import { FC, useState } from 'react';
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from '@solana/wallet-adapter-react';
import { initialize } from '@/app/utils/helpers';
import { CreateCampaignButton } from './buttons/CreateCampaignButton';
import { WithdrawFundButton } from './buttons/WithdrawFundsButton';
import { ConnectWalletButton } from './buttons/ConnectButton';
import { DonateView } from './views/DonateView';
import { DetailsView } from './views/DetailsView';
import { CampaignCardList } from './CampaignCardList';
import { WithdrawFundView } from './views/WithdrawView';
import { CreateCampaignView } from './views/CreateCampaignView';

type HeaderTextProps = {
  headerText: string;
};
const HeaderText: FC<HeaderTextProps> = ({ headerText }) => {
  return (
    <p className="text-[32px] md:text-[48px] font-extrabold text-center">
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
  const { connection } = useConnection();
  const anchor_wallet = useAnchorWallet();
  const wallet = useWallet();
  const publicKey = wallet.publicKey;

  const testProgram = () => {
    console.log('--testing program');
    if (publicKey && anchor_wallet) {
      const campaignName = 'Campaign djdksksdj';
      const amount = '40';

      initialize(publicKey, anchor_wallet, connection, campaignName, amount)
        .then((res) => {
          console.log('res', res);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <div className="w-full h-[100dvh] flex flex-col gap-2 p-3">
      <div className="absolute underline cursor-pointer top-2 right-6 w-[8rem]">
        <ConnectWalletButton onClick={testProgram} />
      </div>
      {view !== AppView.CampaignList && (
        <p
          className="absolute underline cursor-pointer"
          onClick={() => setView(AppView.CampaignList)}
        >
          close
        </p>
      )}
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

      <div className="flex md:ml-12 gap-2 mt-4">
        {view === AppView.CampaignList && (
          <CreateCampaignButton
            onClick={() => {
              setView(AppView.CampaignCreate);
            }}
          />
        )}

        {view === AppView.CampaignList && (
          <WithdrawFundButton
            onClick={() => {
              setView(AppView.WithdrawFund);
            }}
          />
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
