import { useAddress, useContract, ConnectWallet } from "@thirdweb-dev/react";
import React from "react";
import loading from "../components/GamePlay/loading";
import {
  Hammer,
  sapphireToken,
  sleepingEllie,
  minning,
} from "../constants/contractAdresses";
import Loading from "../components/GamePlay/loading";
import Shop from "../components/GamePlay/shop";
import Rewards from "../components/GamePlay/reward";
import Equipped from "../components/GamePlay/equipped";
import OwnedHammer from "../components/GamePlay/ownedHammer";

import styles from "../styles/Home.module.css";

export default function Play() {
  const address = useAddress();
  const { contract: minningContract } = useContract(minning);
  const { data: ellieContract } = useContract(sleepingEllie, "edition-drop");
  const { data: hammmerContract } = useContract(Hammer, "edition-drop");
  const { data: sapphireContract } = useContract(sapphireToken, "token");

  // Wallet Connect
  if (!address) {
    return (
      <div>
        <ConnectWallet />
      </div>
    );
  }
  return (
    <div>
      {minningContract &&
      ellieContract &&
      hammmerContract &&
      sapphireContract ? (
        <div>
          <Equipped
            miningContract={minningContract}
            ellieContract={ellieContract}
            hammerContract={hammmerContract}
          />
          <Rewards
            miningContract={minningContract}
            sapphireContract={sapphireContract}
          />
        </div>
      ) : (
        <Loading />
      )}
      <hr />

      {hammmerContract && minningContract ? (
        <>
          <p>Your Owned Hammer</p>
          <div>
            <OwnedHammer />
          </div>
        </>
      ) : (
        <Loading />
      )}

      {hammmerContract && sapphireContract ? (
        <div>
          card to display hammers
          <Shop />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
