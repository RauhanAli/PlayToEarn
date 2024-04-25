import {
  ThirdwebNftMedia,
  useActiveClaimCondition,
  useAddress,
  useClaimNFT,
  useContract,
  Web3Button,
} from "@thirdweb-dev/react";
import { NFT } from "@thirdweb-dev/sdk";
import { BigNumber, ethers } from "ethers";
import React from "react";
import { Hammer } from "../../constants/contractAdresses";
// import styles from "../styles/Home.module.css";

type Props = {
  hammerContract: any;
  item: NFT;
};

export default function ShopItem({ hammerContract, item }: Props) {
  //   const address = useAddress();
  const { contract } = useContract(Hammer);
  const { data: claimCondition } = useActiveClaimCondition(
    contract,
    item.metadata.id
  );
  return (
    <div>
      <ThirdwebNftMedia metadata={item.metadata} height="64" />
      <h3>{item.metadata.name}</h3>
      <p>
        Price:{" "}
        <b>
          {claimCondition && ethers.utils.formatUnits(claimCondition?.price)}{" "}
          GEM
        </b>
      </p>

      <div>
        <Web3Button
          theme="dark"
          contractAddress={Hammer}
          action={(contract) => contract.erc1155.claim(item.metadata.id, 1)}
          onSuccess={() => alert("Purchased!")}
          onError={(error) => alert(error)}
        >
          Buy
        </Web3Button>
      </div>
    </div>
  );
}
