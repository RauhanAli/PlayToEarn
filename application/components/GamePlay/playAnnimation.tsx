import React from "react";
import { NFT } from "@thirdweb-dev/react";
import styles from "../../styles/game.module.css";
type Props = {
  hammer: NFT | undefined;
};

export default function Gameplay(hammer: Props) {
  if (!hammer) {
    return <div>I need a Hammer</div>;
  }
  return (
    <div id="gameContainer">
      <div id="hammer"></div>
      <div id="gem"></div>
      <div id="obstacle"></div>
    </div>
  );
}
