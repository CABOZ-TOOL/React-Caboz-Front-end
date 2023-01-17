import { BN, IdlTypes, Program, web3 } from "@coral-xyz/anchor";
import * as anchor from "@coral-xyz/anchor";
import {
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import {
  SystemProgram,
  Keypair,
  PublicKey,
  TransactionSignature,
  Connection,
} from "@solana/web3.js";
import { getTokenAccountsByOwner } from "./utils";
// import { Caboz } from "../target/types/caboz";
import { Metaplex } from "@metaplex-foundation/js";
import * as token from "@solana/spl-token";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { IDL } from "./caboz";

// Publickeys
export const PROGRAM_ID = "133Sr1TwJf1uxJj1N5vtGSHZMDmbNJFpxxZTNhr84PJU";

export const solConnection = new web3.Connection(web3.clusterApiUrl("devnet"));

const cloneWindow: any = window;
const provider = new anchor.AnchorProvider(
  solConnection,
  cloneWindow["solana"],
  anchor.AnchorProvider.defaultOptions()
);
const program = new anchor.Program(
  IDL as anchor.Idl,
  PROGRAM_ID,
  provider
);

// export const program = anchor.workspace.Caboz;
export const programId = new anchor.web3.PublicKey(PROGRAM_ID);

export function findAllowedPaymentMint(paymentMint: PublicKey): PublicKey {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("allowed_payment_mint"), paymentMint.toBuffer()],
    program.programId
  )[0];
}

export function findWallet(owner: PublicKey): PublicKey {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("wallet"), owner.toBuffer()],
    program.programId
  )[0];
}

export async function getWalletBalanceNative(
  connection: Connection,
  owner: PublicKey
): Promise<number> {
  return (await connection.getBalance(findWallet(owner))) - 890880;
}

export async function getWalletBalanceNonNative(
  connection: Connection,
  owner: PublicKey,
  mint: PublicKey
): Promise<number> {
  return Number(
    (
      await token.getAccount(
        connection,
        getAssociatedTokenAddressSync(mint, findWallet(owner), true)
      )
    ).amount
  );
}

export async function allowPaymentMint(
  paymentMint: PublicKey,
  feeMultiplierBps: number,
  mintListAuthority: Keypair
): Promise<TransactionSignature> {
  return await program.methods
    .allowPaymentMint(feeMultiplierBps)
    .accounts({
      mintListAuthority: mintListAuthority.publicKey,
      paymentMint,
      allowedPaymentMint: findAllowedPaymentMint(paymentMint),
    })
    .signers([mintListAuthority])
    .rpc();
}

export async function disallowPaymentMint(
  paymentMint: PublicKey,
  mintListAuthority: Keypair
): Promise<TransactionSignature> {
  return await program.methods
    .disallowPaymentMint()
    .accounts({
      mintListAuthority: mintListAuthority.publicKey,
      allowedPaymentMint: findAllowedPaymentMint(paymentMint),
    })
    .signers([mintListAuthority])
    .rpc();
}

export async function createOrder(
  connection: Connection,
  paymentMint: PublicKey,
  price: number | BN,
  collectionMint: PublicKey,
  nftSet: IdlTypes<anchor.Idl>,
  inkworkCollectionNftMint: PublicKey = PublicKey.default,
  buyer: Keypair,
  order = new Keypair()
): Promise<{ transactionSignature: TransactionSignature; order: PublicKey }> {
  let remainingAccounts = [];

  for (const account of (await getTokenAccountsByOwner(connection, buyer.publicKey)).filter((ta: any) => ta.amount == 1)) {
    if (account.amount == 1) {
      try {
        const nft = await new Metaplex(connection)
          .nfts()
          .findByMint({ mintAddress: account.mint });

        if (
          nft.collection?.address.equals(inkworkCollectionNftMint) &&
          nft.collection?.verified
        ) {
          remainingAccounts.push(
            { pubkey: account.address, isSigner: false, isWritable: false },
            { pubkey: nft.metadataAddress, isSigner: false, isWritable: false }
          );
          if (remainingAccounts.length == 20) {
            // we don't need more than 10 NFTs
            // and it will not fit in a transaction
            break;
          }
        }
      } catch (e: any) {
        expect(e.toString()).to.contain(
          "The account of type [Metadata] was not found at the provided address"
        );
      }
    }
  }

  const transactionSignature = await program.methods
    .createOrder(new BN(price), collectionMint, nftSet)
    .accounts({
      buyer: buyer.publicKey,
      order: order.publicKey,
      allowedPaymentMint: findAllowedPaymentMint(paymentMint),
    })
    .remainingAccounts(remainingAccounts)
    .signers([buyer, order])
    .rpc();

  return { transactionSignature, order: order.publicKey };
}

// export async function acceptOrderNative(
//   connection: Connection,
//   order: PublicKey,
//   expectedPrice: number | BN,
//   proof: number[][] = [],
//   nftMint: PublicKey,
//   feeReceiver: PublicKey,
//   seller: Keypair
// ): Promise<TransactionSignature> {
//   const orderAccount = await program.account.order.fetch(order);

//   const buyerNftTokenAccount = getAssociatedTokenAddressSync(
//     nftMint,
//     orderAccount.buyer
//   );

//   let preInstructions = [];
//   if (!(await connection.getAccountInfo(buyerNftTokenAccount))) {
//     preInstructions.push(
//       createAssociatedTokenAccountInstruction(
//         seller.publicKey,
//         buyerNftTokenAccount,
//         orderAccount.buyer,
//         nftMint
//       )
//     );
//   }

//   return await program.methods
//     .acceptOrderNative(new BN(expectedPrice), proof)
//     .accounts({
//       buyer: orderAccount.buyer,
//       buyerWallet: findWallet(orderAccount.buyer),
//       buyerNftTokenAccount,
//       order,
//       nftMetadata: new Metaplex(connection)
//         .nfts()
//         .pdas()
//         .metadata({ mint: nftMint }),
//       seller: seller.publicKey,
//       sellerNftTokenAccount: getAssociatedTokenAddressSync(
//         nftMint,
//         seller.publicKey
//       ),
//       feeReceiver,
//     })
//     .preInstructions(preInstructions)
//     .signers([seller])
//     .rpc();
// }

// export async function acceptOrderNonNative(
//   connection: Connection,
//   order: PublicKey,
//   expectedPrice: number | BN,
//   proof: number[][] = [],
//   nftMint: PublicKey,
//   feeReceiver: PublicKey,
//   seller: Keypair
// ): Promise<TransactionSignature> {
//   const orderAccount = await program.account.order.fetch(order);

//   const buyerNftTokenAccount = getAssociatedTokenAddressSync(
//     nftMint,
//     orderAccount.buyer
//   );
//   const buyerWallet = findWallet(orderAccount.buyer);

//   const sellerTokenAccount = getAssociatedTokenAddressSync(
//     orderAccount.paymentMint,
//     seller.publicKey
//   );

//   let preInstructions = [];
//   if (!(await connection.getAccountInfo(buyerNftTokenAccount))) {
//     preInstructions.push(
//       createAssociatedTokenAccountInstruction(
//         seller.publicKey,
//         buyerNftTokenAccount,
//         orderAccount.buyer,
//         nftMint
//       )
//     );
//   }
//   if (!(await connection.getAccountInfo(sellerTokenAccount))) {
//     preInstructions.push(
//       createAssociatedTokenAccountInstruction(
//         seller.publicKey,
//         sellerTokenAccount,
//         seller.publicKey,
//         orderAccount.paymentMint
//       )
//     );
//   }

//   return await program.methods
//     .acceptOrderNonNative(new BN(expectedPrice), proof)
//     .accounts({
//       acceptOrder: {
//         buyer: orderAccount.buyer,
//         buyerWallet,
//         buyerNftTokenAccount,
//         order,
//         nftMetadata: new Metaplex(connection)
//           .nfts()
//           .pdas()
//           .metadata({ mint: nftMint }),
//         seller: seller.publicKey,
//         sellerNftTokenAccount: getAssociatedTokenAddressSync(
//           nftMint,
//           seller.publicKey
//         ),
//         feeReceiver,
//         tokenProgram: TOKEN_PROGRAM_ID,
//         systemProgram: SystemProgram.programId,
//       },
//       buyerWalletTokenAccount: getAssociatedTokenAddressSync(
//         orderAccount.paymentMint,
//         buyerWallet,
//         true
//       ),
//       sellerTokenAccount,
//       feeReceiverTokenAccount: getAssociatedTokenAddressSync(
//         orderAccount.paymentMint,
//         feeReceiver
//       ),
//     })
//     .preInstructions(preInstructions)
//     .signers([seller])
//     .rpc();
// }

export async function closeOrder(
  order: PublicKey,
  buyer: Keypair
): Promise<TransactionSignature> {
  return await program.methods
    .closeOrder()
    .accounts({
      buyer: buyer.publicKey,
      order,
    })
    .signers([buyer])
    .rpc();
}

export async function createWallet(
  buyer: Keypair
): Promise<TransactionSignature> {
  return await program.methods
    .createWallet()
    .accounts({
      buyer: buyer.publicKey,
      buyerWallet: findWallet(buyer.publicKey),
    })
    .signers([buyer])
    .rpc();
}

export async function withdrawNative(
  lamports: number | BN,
  buyer: Keypair
): Promise<TransactionSignature> {
  return await program.methods
    .withdrawNative(new BN(lamports))
    .accounts({
      buyer: buyer.publicKey,
      buyerWallet: findWallet(buyer.publicKey),
    })
    .signers([buyer])
    .rpc();
}

export async function withdrawNonNative(
  connection: Connection,
  mint: PublicKey,
  amount: number | BN,
  buyer: Keypair
): Promise<TransactionSignature> {
  let preInstructions = [];
  const destination = getAssociatedTokenAddressSync(mint, buyer.publicKey);
  if (!(await connection.getAccountInfo(destination))) {
    preInstructions.push(
      createAssociatedTokenAccountInstruction(
        buyer.publicKey,
        destination,
        buyer.publicKey,
        mint
      )
    );
  }

  return await program.methods
    .withdrawNonNative(new BN(amount))
    .accounts({
      withdraw: {
        buyer: buyer.publicKey,
        buyerWallet: findWallet(buyer.publicKey),
      },
      buyerWalletTokenAccount: getAssociatedTokenAddressSync(
        mint,
        findWallet(buyer.publicKey),
        true
      ),
      destination,
    })
    .preInstructions(preInstructions)
    .signers([buyer])
    .rpc();
}


// export async function getCellingAndFloorPrice(connection: Connection, paymentMint: PublicKey, collectionMint: PublicKey) {
//   const accounts = await connection.getProgramAccounts(program.programId, {
//     filters: [
//       {
//         memcmp: {
//           offset: 32,
//           bytes: "276",
//         },
//       },
//     ],
//   });
//   const prices = await accounts.filter(account => account.account.Order.collection_mint == collectionMint)
//     .then(account => account.account.Order.price);
//   return filterMaxAndMin(prices);

// }

function filterMaxAndMin(prices: number[]) {
  let max = 0, min = 10 ** 10;
  for (let i = 0; i < prices.length; i++) {
    if (prices[i] > max) max = prices[i];
    else if (prices[i] < min) min = prices[i];
    else continue;
  }
  return [max, min];
}

