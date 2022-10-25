import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useAccount } from "../../hooks/useAccount";
import { Button } from "../Button";

const getRandomDelay = () => -(Math.random() * 0.7 + 0.05);

const randomDuration = () => Math.random() * 0.07 + 0.23;

const variants = {
  start: () => ({
    rotate: [4, -4, 4, -4, 4],
    transition: {
      //   delay: 2,
      repeat: Infinity,
      //   duration: randomDuration(),
    },
  }),
  reset: {
    rotate: 0,
  },
};

const ConnectWalletButton = () => {
  const controls = useAnimation();
  const { connectWallet, account } = useAccount();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) {
      controls.start("start");
    } else {
      controls.start("reset");
    }
  }, [isHovered]);

  return (
    <div>
      {account ? (
        <div>"Wallet Address:" + {account}</div>
      ) : (
        <Button
          onClick={connectWallet}
          className="w-full flex"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Connect Wallet
          <motion.div variants={variants} animate={controls} className="ml-2">
            <img
              src="/images/metamask-logo.png"
              alt="metamask logo"
              className="w-6 h-6"
            />
          </motion.div>
        </Button>
      )}
    </div>
  );
};

export default ConnectWalletButton;
