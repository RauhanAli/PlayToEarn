import React, { useEffect, useState } from "react";
import {
  useNFTs,
  useAddress,
  ThirdwebNftMedia,
  SmartContract,
  useContract,
} from "@thirdweb-dev/react";
import ShopItem from "./shopItem";
import { Hammer } from "../../constants/contractAdresses";
type Props = {
  hammerContract: any;
};

export default function Shop(hammerContract: Props) {
  //@ts-ignore
  const { contract } = useContract(Hammer);
  const { data: availableHammer } = useNFTs(contract);
  return (
    <>
      <div>
        {availableHammer?.map((p) => (
          <ShopItem
            hammerContract={hammerContract}
            item={p}
            key={p.metadata.id.toString()}
          />
        ))}
      </div>
    </>
  );
}
