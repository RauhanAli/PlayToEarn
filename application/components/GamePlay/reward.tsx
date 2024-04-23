import React from "react";
import {
  ThirdwebNftMedia,
  useAddress,
  useMetadata,
  Web3Button,
  useTokenBalance,
  SmartContract,
  useContract,
  useContractWrite,
  useContractRead,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import styles from "../../styles/Home.module.css";
import ApproxReward from "../GamePlay/approxRewards";

type Props = {
  miningContract: SmartContract<any>;
  sapphireContract: any;
};

// This component shows
// Metadata of the token (image)
// amount wallet holds for gem token
// how much reward user earned from mining contract

export default function Rewards({ miningContract, sapphireContract }: Props) {
  const address = useAddress();
  const { data: tokenMetaData } = useMetadata(sapphireContract);
  const { data: tokenBalance } = useTokenBalance(sapphireContract, address);
  const { data: unclaimedRewards } = useContractRead(
    miningContract,
    "calculateReward",
    [address]
  );
  // const { mutate: claim } = useContractWrite(miningContract, "calim");

  return (
    <div>
      <p>Your Gold Gems</p>
      {tokenMetaData ? (
        <ThirdwebNftMedia
          // @ts-ignore
          metadata={tokenMetaData}
          height={"48"}
        />
      ) : null}
      <p>
        Balance <b>{tokenBalance?.displayValue}</b>
      </p>
      <p>
        Unclaimed:{""}
        <b>{unclaimedRewards && ethers.utils.formatUnits(unclaimedRewards)}</b>
      </p>
      <ApproxReward miningContract={miningContract} />

      <Web3Button
        contractAddress={miningContract.getAddress()}
        action={(contract) => contract.call("claim")}
      >
        Claim
      </Web3Button>
    </div>
  );
}
