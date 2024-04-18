import {
  useAddress,
  useContract,
  useEditionDrop,
  useToken,
  ConnectWallet,
} from "@thirdweb-dev/react";
import React from "react";
import loading from "../components/GamePlay/loading";
import {
  Hammer,
  sapphireToken,
  sleepingEllie,
  minning,
} from "../constants/contractAdresses";
import styles from "../styles/Home.module.css";

export default function Play() {
  const address = useAddress();
  const { contract: minningContract } = useContract(minning);
  const ellieContract = useEditionDrop(sleepingEllie);
  const hammmerContract = useEditionDrop(Hammer);
  const sapphireContract = useToken(sapphireToken);

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
            minningContract={minningContract}
            ellieContract={ellieContract}
            hammmerContract={hammmerContract}
          />
          <Rewards
            minningContract={minningContract}
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
