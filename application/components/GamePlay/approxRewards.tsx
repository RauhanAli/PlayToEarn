import React, { useEffect, useState } from "react";
import { useAddress, SmartContract } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import contrctMappingResponse from "../../types/contractMappingResponse";
import styles from "../../styles/Home.module.css";

type Props = {
  miningContract: SmartContract<any>;
};
export default function ApproxReward(miningContract: Props) {
  const [amount, setAmount] = useState<number>(0);
  const [multiplier, setMultiplier] = useState<number>(0);
  const address = useAddress();

  //we can start timer when this component is mounted
  //each 2.1 seconds we can update amount of tokens earned (rough estimation)
  const everyMilisecond = parseInt((10_000_000_000 / 2.1).toFixed(0));

  //updating multiplier
  useEffect(() => {
    async () => {
      if (!address) return;
      //@ts-ignore
      const player = (await miningContract.call(
        "playerHammer",
        address
      )) as contrctMappingResponse;
      if (player.isData) {
        setMultiplier(player.tokenId.toNumber() + 1);
      } else setMultiplier(0);
    };
  }, [address, miningContract]);

  //updating earned amount
  useEffect(() => {
    const interval = setInterval(() => {
      setAmount(amount + everyMilisecond);
    }, 1000);
    //clear the interval after component unmount
    return () => clearInterval(interval);
  }, [address, everyMilisecond]);

  return (
    <>
      <p>
        Earned this session:{""}
        <b>
          {ethers.utils.formatEther((amount * multiplier).toFixed(0)) ||
            "Error...."}
        </b>
      </p>
    </>
  );
}
