import styles from "../styles/Home.module.css";
import {
  ConnectWallet,
  useAddress,
  useOwnedNFTs,
  useContract,
  darkTheme,
  lightTheme,
} from "@thirdweb-dev/react";
import HammerAbi from "../constants/ABIs/hammer.json";
import { Hammer, sleepingEllie } from "../constants/contractAdresses";
import { NextPage } from "next";
import { useRouter } from "next/router";
import MintNft from "../components/MintNft";

const Home: NextPage = () => {
  const { data: editionDrop } = useContract(sleepingEllie, "edition-drop");
  const router = useRouter();
  const address = useAddress();

  const {
    data: ownedNfts,
    isLoading,
    isError,
  } = useOwnedNFTs(editionDrop, address);

  //button style
  const customDarkTheme = darkTheme({
    fontFamily: "Inter, sans-serif",
    colors: {
      modalBg: "#6c4591",
      accentText: "red",
      // ... etc
    },
  });

  // Wallet Connect to check owned Nfts
  if (!address) {
    return (
      <div>
        <ConnectWallet theme={customDarkTheme} />
      </div>
    );
  }

  //Get Owned Nfts
  if (isLoading) {
    return <div>Loading...</div>;
  }
  //error occurs
  if (!ownedNfts || isError) {
    return <div>Error</div>;
  }

  //if user have no NFTs
  if (ownedNfts.length === 0) {
    return (
      <div>
        <MintNft />
      </div>
    );
  }

  //direct user to play game if he have nft
  return (
    <div>
      <button onClick={() => router.push("/play")}>Play</button>
    </div>
  );
};

export default Home;
