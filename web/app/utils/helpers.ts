/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AnchorProvider,
  BN,
  type Idl,
  Program,
  type Provider,
  setProvider,
} from "@coral-xyz/anchor";
import {
  getAssociatedTokenAddress,
  getMint,
} from "@solana/spl-token";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey, SystemProgram } from "@solana/web3.js";
import idl from "../../idl/gofundmeprogram.json";
import * as anchor from "@coral-xyz/anchor";
import { Gofundmeprogram } from "@/idl/types/gofundmeprogram";

const usdcDevCoinMintAddress = new PublicKey(
  "Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr"
);

export const initialize = async (
  publicKey: PublicKey,
  anchor_wallet: AnchorWallet,
  connection: Connection,
  campaignName: string
) => {
  try {
    console.log("---getting mint");
    const mintInfo = await getMint(connection, usdcDevCoinMintAddress);
    const mintDecimals = Math.pow(10, mintInfo.decimals);
    console.log("mintDecimals", mintDecimals);

    if (publicKey && anchor_wallet) {
      console.log("---provider set up 1");
      const provider = new AnchorProvider(connection, anchor_wallet, {});
      setProvider(provider);
      console.log("---provider set up 2");

      const programId = new PublicKey("5L1hGNy2PwsE1WMzyALoZtMtFnf2wf7swMW7BYmckfEC");
      console.log("programid", programId.toBase58());

      const program = new Program(Gofundmeprogram as Idl, provider);

      const tokenAccount = await getAssociatedTokenAddress(
        usdcDevCoinMintAddress,
        publicKey
      );

      let [campaignOwnerPDA, campaignBump] = PublicKey.findProgramAddressSync(
        [Buffer.from("owner"), Buffer.from(campaignName)],
        programId
      );

      let [tokenVault, bump] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("vault"),
          usdcDevCoinMintAddress.toBuffer(),
          Buffer.from(campaignName),
        ],
        programId
      );

      console.log("TokenAccountOwnerPda: " + campaignOwnerPDA);
      console.log("VaultAccount: " + tokenVault);

      let confirmOptions = {
        skipPreflight: true,
      };

      console.log("Program Methods:", program.methods);

      // Ensure 'initialize' exists and is correctly named in the IDL
      if (!program.methods.initialize) {
        throw new Error("Initialize method is not found in the program IDL.");
      }

      let txHash = await program.methods
        .initialize(campaignName)
        .accounts({
          campaign: campaignOwnerPDA,
          vaultTokenAccount: tokenVault,
          mintOfTokenBeingSent: usdcDevCoinMintAddress,
          user: publicKey,
          userTokenAccount: tokenAccount,
          systemProgram: SystemProgram.programId,
          tokenProgram: anchor.utils.token.TOKEN_PROGRAM_ID,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        })
        .rpc(confirmOptions);

      console.log(`Campaign Initialized`);
      await logTransaction(txHash, connection);
    }
  } catch (error) {
    console.error("Error during initialization:", error);
  }
};

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
