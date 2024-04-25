// import React, { useEffect } from "react";
// import { NFT } from "@thirdweb-dev/react";
// import styles from "../../styles/game.module.css";
// type Props = {
//   hammer: NFT | undefined;
// };

// export default function Gameplay(hammer: Props) {
//   if (!hammer) {
//     return <div>I need a Hammer</div>;
//   }

//   let ellie = document.getElementsByClassName("ellie")[0] as HTMLElement;
//   let obstacle = document.getElementsByClassName("obstacle")[0] as HTMLElement;

//   if (!ellie || !obstacle) {
//     console.error("Ellie or obstacle element not found");
//   }

//   let isJumping = false;
//   let gravity = 0.9;
//   let obstacleLeft = 500;
//   let ellieBottom = 0;
//   let jumpCount = 0;

//   function jump() {
//     if (isJumping) return;
//     isJumping = true;
//     let jumpInterval = setInterval(() => {
//       if (jumpCount >= 15) {
//         clearInterval(jumpInterval);
//         isJumping = false;
//         jumpCount = 0;
//       }
//       if (!ellie) {
//         ellie = document.getElementsByClassName("ellie")[0] as HTMLElement;
//         // return;
//       }
//       let ellieBottomPos = parseInt(
//         window.getComputedStyle(ellie).getPropertyValue("bottom")
//       );
//       ellie.style.bottom = ellieBottomPos + 30 + "px";
//       jumpCount++;
//     }, 20);
//   }

//   function gravityFunc() {
//     if (isJumping) return;
//     if (!ellie) {
//       ellie = document.getElementsByClassName("ellie")[0] as HTMLElement;
//       // return;
//     }
//     let ellieBottomPos = parseInt(
//       window.getComputedStyle(ellie).getPropertyValue("bottom")
//     );
//     if (ellieBottomPos > 0) {
//       ellie.style.bottom = ellieBottomPos - gravity + "px";
//     }
//   }

//   function moveObstacle() {
//     if (!obstacle) {
//       obstacle = document.getElementsByClassName("obstacle")[0] as HTMLElement;
//       // return;
//     }
//     if (!obstacle) return; // Check if obstacle is undefined or null
//     if (!obstacle.style) return;
//     if (obstacleLeft < -60) {
//       obstacleLeft = 500;
//     }
//     obstacleLeft -= 2;
//     obstacle.style.position = "absolute";
//     obstacle.style.left = obstacleLeft + "px";
//   }

//   setInterval(() => {
//     moveObstacle();
//     gravityFunc();
//   }, 20);

//   document.addEventListener("keydown", (event) => {
//     if (event.code === "Space") {
//       jump();
//     }
//   });

//   return <></>;
// }
// components/Game.tsx

import { useState, useEffect } from "react";
import { NFT } from "@thirdweb-dev/react";
import styles from "../../styles/game.module.css";
type Props = {
  hammer: NFT | undefined;
};

export default function Gameplay(hammer: Props) {
  const [elliePosition, setElliePosition] = useState<number>(0);
  const [obstaclePosition, setObstaclePosition] = useState<number>(400);
  const [gemPosition, setGemPosition] = useState<number>(600);
  const [score, setScore] = useState<number>(0);
  const [isJumping, setIsJumping] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [obstacle, setObstacle] = useState<string>("");

  const obstacleOptions: string[] = [
    "/images/obstacle.png",
    "/images/obstacle2.png",
    "/images/obstacle3.png",
  ];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space" && !isJumping) {
        jump();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isJumping]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isGameOver) changeObstacle();
    }, 1000);
    // return clearInterval(interval);
  }, [isGameOver]);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      if (!isGameOver) {
        setObstaclePosition((prevPosition) => prevPosition - 5);
        setGemPosition((prevPosition) => prevPosition - 5);
        if (obstaclePosition < -100) {
          setObstaclePosition(400);
          setScore((prevScore) => prevScore + 1);
        }
        if (gemPosition < -100) {
          setGemPosition(600);
        }
        if (
          obstaclePosition < 50 &&
          obstaclePosition > 0 &&
          elliePosition < 50
        ) {
          setIsGameOver(true);
          clearInterval(gameLoop);
          alert("Game Over. Your score: " + score);
        }
      }
    }, 50);

    return () => {
      clearInterval(gameLoop);
    };
  }, [isGameOver, obstaclePosition, elliePosition, score]);

  const jump = () => {
    setIsJumping(true);
    setElliePosition(50);
    setTimeout(() => [setIsJumping(false), , setElliePosition(0)], 500);
  };
  const changeObstacle = () => {
    const randomIndex = Math.floor(Math.random() * obstacleOptions.length);
    setObstacle(obstacleOptions[randomIndex]);
  };

  return (
    <div>
      <div>Score: {score}</div>
      {isGameOver && <div>Game Over</div>}
      <div
        style={{
          position: "relative",
          height: "120px",
          width: "700px",
          border: "1px solid black",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: isJumping ? "50px" : "0",
            left: "50px",
            width: "60px",
            height: "60px",
            backgroundImage: 'url("/images/run.gif")',
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: `${obstaclePosition}px`,
            width: "60px",
            height: "60px",
            backgroundImage: `url(${obstacle})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: `${gemPosition}px`,
            width: "40px",
            height: "40px",
            backgroundImage: `url("/images/gem.png")`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>
    </div>
  );
}
