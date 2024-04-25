import React, { useEffect, useState } from "react";
import {
  useNFT,
  useAddress,
  ThirdwebNftMedia,
  SmartContract,
} from "@thirdweb-dev/react";
import { useContract, NFT } from "@thirdweb-dev/react";
import contrctMappingResponse from "../../types/contractMappingResponse";
import Gameplay from "./playAnnimation";
import styles from "../../styles/game.module.css";
type Props = {
  miningContract: SmartContract<any>;
  ellieContract: any;
  hammerContract: any;
};

export default function Equipped({
  miningContract,
  ellieContract,
  hammerContract,
}: Props) {
  const address = useAddress();
  const { data: playerNft } = useNFT(ellieContract, 0);
  const [hammer, setHammer] = useState<NFT>();

  useEffect(() => {
    async () => {
      if (!address) return;

      const player = (await miningContract.call(
        "playerHammer",
        //@ts-ignore
        address
      )) as contrctMappingResponse;
      //now we have token id for hammer if there is one we get metadata for it
      const hammerMetadata = await hammerContract.get(player.tokenId);
      setHammer(hammerMetadata);
    };
  }, [address, miningContract, hammerContract]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* <h2 className={`${styles.noGapTop} `}>Equipped Items</h2> */}
      <h2>Equipped Items</h2>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {/* Currently equipped player */}
        <div style={{ outline: "1px solid grey", borderRadius: 16 }}>
          {playerNft && (
            <ThirdwebNftMedia metadata={playerNft?.metadata} height={"64"} />
          )}
        </div>
        {/* Currently equipped pickaxe */}
        <div
          style={{ outline: "1px solid grey", borderRadius: 16, marginLeft: 8 }}
        >
          {hammer && (
            // @ts-ignore
            <ThirdwebNftMedia metadata={pickaxe.metadata} height={"64"} />
          )}
        </div>
      </div>

      {/* Gameplay Animation */}

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 24,
        }}
      >
        <img
          src="/images/run.gif"
          height={64}
          width={64}
          alt="character-mining"
        />
        {/* <div className={styles.gameContainer}>
          <div className={styles.ellie}></div>
          <div className={styles.obstacle}></div>
          <div className={styles.gem}></div>
        </div> */}
        <Gameplay hammer={hammer} />
      </div>
    </div>
  );
}
