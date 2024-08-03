/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AnchorProvider,
  BN,
  type Idl,
  Program,
  type Provider,
  setProvider,
} from '@coral-xyz/anchor';
import { getAssociatedTokenAddress, getMint } from '@solana/spl-token';
import type { AnchorWallet } from '@solana/wallet-adapter-react';
import { type Connection, PublicKey, SystemProgram } from '@solana/web3.js';
import { Gofundmeprogram } from '@/idl/types/gofundmeprogram';
import idl from '../../idl/gofundmeprogram.json';
import { CampaignData } from '@/components/dashboard/types';

//There are a lot of code repitition which is necessary , but due to time constraints will leave it like this

const usdcDevCoinMintAddress = new PublicKey(
  'Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr'
);

//export const PROGRAMID = new PublicKey("B8VbcNKyCsMorXQMD5WRqmkDymijYtscp4Yur5itVrgx");
export const PROGRAMID = new PublicKey(
  '8xCfV1ppvAHikPeyRUGRPpVr5n8EtSg9cKMF1Ewm92Xh'
);

export const initialize = async (
  publicKey: PublicKey,
  anchor_wallet: AnchorWallet,
  connection: Connection,
  campaignName: string,
  campaignAmount: string,
  campaignDate: string,
  category: string
) => {
  try {
    console.log('---getting mint');
    const mintInfo = await getMint(connection, usdcDevCoinMintAddress);
    const mintDecimals = Math.pow(10, mintInfo.decimals);
    console.log('mintDecimals', mintDecimals);

    if (publicKey && anchor_wallet) {
      const provider = new AnchorProvider(connection, anchor_wallet, {});
      setProvider(provider);
      const program = new Program(idl as Idl, PROGRAMID, provider);

      const tokenAccount = await getAssociatedTokenAddress(
        usdcDevCoinMintAddress,
        publicKey
      );

      let [campaignOwnerPDA, campaignBump] = PublicKey.findProgramAddressSync(
        [Buffer.from('owner'), Buffer.from(campaignName)],
        PROGRAMID
      );

      let [tokenVault, bump] = PublicKey.findProgramAddressSync(
        [
          Buffer.from('vault'),
          usdcDevCoinMintAddress.toBuffer(),
          Buffer.from(campaignName),
        ],
        PROGRAMID
      );

      console.log('TokenAccountOwnerPda: ' + campaignOwnerPDA);
      console.log('VaultAccount: ' + tokenVault);

      let confirmOptions = {
        skipPreflight: true,
      };

      //console.log("Program Methods:", program.methods);

      // Ensure 'initialize' exists and is correctly named in the IDL
      if (!program.methods.initialize) {
        throw new Error('Initialize method is not found in the program IDL.');
      }

      let txHash = await program.methods
        .initialize(
          campaignName,
          new BN(parseInt(campaignAmount)),
          campaignDate,
          category
        )
        .accounts({
          campaign: campaignOwnerPDA,
          vaultTokenAccount: tokenVault,
          mintOfTokenBeingSent: usdcDevCoinMintAddress,
          user: publicKey,
          userTokenAccount: tokenAccount,
          systemProgram: SystemProgram.programId,
        })
        .rpc(confirmOptions);

      console.log(`Campaign Initialized`);
      await logTransaction(txHash, connection);
    }
  } catch (error) {
    console.error('Error during initialization:', error);
  }
};

export const donate = async (
  publicKey: PublicKey,
  anchor_wallet: AnchorWallet,
  connection: Connection,
  campaignName: string,
  amount: string
) => {
  try {
    console.log('---getting mint');
    const mintInfo = await getMint(connection, usdcDevCoinMintAddress);
    const mintDecimals = Math.pow(10, mintInfo.decimals);
    console.log('mintDecimals', mintDecimals);
    if (publicKey && anchor_wallet) {
      const provider = new AnchorProvider(connection, anchor_wallet, {});
      setProvider(provider);
      const program = new Program(idl as Idl, PROGRAMID, provider);

      const tokenAccount = await getAssociatedTokenAddress(
        usdcDevCoinMintAddress,
        publicKey
      );

      let [campaignOwnerPDA, campaignBump] = PublicKey.findProgramAddressSync(
        [Buffer.from('owner'), Buffer.from(campaignName)],
        PROGRAMID
      );

      let [tokenVault, bump] = PublicKey.findProgramAddressSync(
        [
          Buffer.from('vault'),
          usdcDevCoinMintAddress.toBuffer(),
          Buffer.from(campaignName),
        ],
        PROGRAMID
      );

      console.log('TokenAccountOwnerPda: ' + campaignOwnerPDA);
      console.log('VaultAccount: ' + tokenVault);

      let confirmOptions = {
        skipPreflight: true,
      };

      let txHash = await program.methods
        .donate(campaignName, new BN(parseInt(amount) * mintDecimals))
        .accounts({
          campaign: campaignOwnerPDA,
          vaultTokenAccount: tokenVault,
          mintOfTokenBeingSent: usdcDevCoinMintAddress,
          user: publicKey,
          userTokenAccount: tokenAccount,
          systemProgram: SystemProgram.programId,
        })
        .rpc(confirmOptions);

      console.log(`Transfer ${amount} token into the vault.`);
      await logTransaction(txHash, connection);
    }
  } catch (error) {
    console.error('Error during donating:', error);
  }
};

export const withdraw = async (
  publicKey: PublicKey,
  anchor_wallet: AnchorWallet,
  connection: Connection,
  campaignName: string,
  amount: string
) => {
  try {
    console.log('---getting mint');
    const mintInfo = await getMint(connection, usdcDevCoinMintAddress);
    const mintDecimals = Math.pow(10, mintInfo.decimals);
    console.log('mintDecimals', mintDecimals);
    if (publicKey && anchor_wallet) {
      const provider = new AnchorProvider(connection, anchor_wallet, {});
      setProvider(provider);
      const program = new Program(idl as Idl, PROGRAMID, provider);

      const tokenAccount = await getAssociatedTokenAddress(
        usdcDevCoinMintAddress,
        publicKey
      );

      let [campaignOwnerPDA, campaignBump] = PublicKey.findProgramAddressSync(
        [Buffer.from('owner'), Buffer.from(campaignName)],
        PROGRAMID
      );

      let [tokenVault, bump] = PublicKey.findProgramAddressSync(
        [
          Buffer.from('vault'),
          usdcDevCoinMintAddress.toBuffer(),
          Buffer.from(campaignName),
        ],
        PROGRAMID
      );

      console.log('TokenAccountOwnerPda: ' + campaignOwnerPDA);
      console.log('VaultAccount: ' + tokenVault);

      let confirmOptions = {
        skipPreflight: true,
      };

      let txHash = await program.methods
        .withdraw(campaignName, new BN(parseInt(amount) * mintDecimals))
        .accounts({
          campaign: campaignOwnerPDA,
          vaultTokenAccount: tokenVault,
          mintOfTokenBeingSent: usdcDevCoinMintAddress,
          user: publicKey,
          userTokenAccount: tokenAccount,
          systemProgram: SystemProgram.programId,
        })
        .rpc(confirmOptions);

      console.log(`Transferred ${amount} token out of the vault.`);
      await logTransaction(txHash, connection);
    }
  } catch (error) {
    console.error('Error during withdrawal:', error);
  }
};

export async function fetchAllCampaigns(
  anchor_wallet: AnchorWallet,
  connection: Connection
) {
  // Fetch all accounts with the Campaign struct
  const provider = new AnchorProvider(connection, anchor_wallet, {});
  setProvider(provider);
  const program = new Program(idl as Idl, PROGRAMID, provider);
  const campaigns = await program.account.campaign.all();

  // Log all campaign accounts
  // campaigns.forEach((campaign) => {
  //   console.log({
  //     pubkey: campaign.publicKey.toString(),
  //     owner: campaign.account.owner.toString(),
  //     name: campaign.account.name,
  //     amountRaised: campaign.account.amountRaised.toString(),
  //     expectedAmount: campaign.account.expectedAmount.toString(),
  //     endDate: campaign.account.endDate,
  //     category: campaign.account.category,
  //   });
  // });

  return campaigns as CampaignData[];
}

async function logTransaction(txHash: string, connection: Connection) {
  const { blockhash, lastValidBlockHeight } =
    await connection.getLatestBlockhash();

  await connection.confirmTransaction({
    blockhash,
    lastValidBlockHeight,
    signature: txHash,
  });

  console.log(
    `Solana Explorer: https://explorer.solana.com/tx/${txHash}?cluster=devnet`
  );
}
