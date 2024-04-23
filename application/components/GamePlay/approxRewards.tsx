import React, { useEffect, useState } from "react";
import { useAddress, SmartContract } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import contrctMappingResponse from "../../types/contractMappingResponse";
import styles from "../../styles/Home.module.css";

type Props = {
  miningContract: SmartContract<any>;
};
export default function ApproxReward(miningContract: Props) {
  const address = useAddress();
}
