import {
  useAddress,
  useClaimNFT,
  Web3Button,
  useEditionDrop,
} from "@thirdweb-dev/react";
import React from "react";
import { sleepingEllie } from "../../constants/contractAdresses";

export default function MintNft() {
  const editionDrop = useEditionDrop(sleepingEllie);
  const { mutate: claim } = useClaimNFT(editionDrop);
  const address = useAddress();

  return (
    <div>
      <h1>Edition Drop</h1>
      <p>Claim your Sleeping Ellie NFT to Start Palying!!</p>
      <div>
        <img src="/images/run.gif" alt="sleepingEllie" height={200} />
      </div>

      <Web3Button
        contractAddress={sleepingEllie}
        action={() => {
          claim({
            quantity: 1,
            to: address,
            tokenId: 0,
          });
        }}
      >
        Claim NFT
      </Web3Button>
    </div>
  );
}
