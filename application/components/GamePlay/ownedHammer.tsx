import React, { useEffect, useState } from "react";
import Loading from "./loading";
import { BigNumber } from "ethers";
import { minning } from "../../constants/contractAdresses";
import styles from "../../styles/Home.module.css";
import { SmartContract } from "@thirdweb-dev/sdk";
import {
  ThirdwebNftMedia,
  Web3Button,
  useAddress,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
type Props = {
  miningContract: SmartContract<any>;
  hammerContract: any;
};

export default function OwnedHammer({ miningContract, hammerContract }: Props) {
  const address = useAddress();
  const { data: hammerNft, isLoading } = useOwnedNFTs(hammerContract, address);

  if (isLoading) return <Loading />;

  async function stake(id: BigNumber) {
    if (!address) return;

    //give approval to contract
    const hasApproval = await hammerContract.isApproved(address, minning);

    if (!hasApproval) {
      const approval = await hammerContract.setApprovalForAll(minning, true);
    }
    //@ts-ignore
    await miningContract.call("stake", id);

    window.location.reload();
  }

  return (
    <div>
      {hammerNft?.map((p) => (
        <div>
          <ThirdwebNftMedia metadata={p?.metadata} height={"64"} />
          <h3>{p.metadata.name}</h3>
          <Web3Button
            contractAddress={minning}
            //@ts-ignore
            action={() => stake(p.metadata.id)}
          >
            Equip
          </Web3Button>
        </div>
      ))}
    </div>
  );
}
