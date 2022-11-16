import { useEthers, shortenAddress } from "@usedapp/core";
import { motion, useAnimation } from "framer-motion";
import { disconnect } from "process";
import { useEffect, useState } from "react";
import { Button } from "../Button";

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
  const { activateBrowserWallet, deactivate, account } = useEthers();
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
        <Button
          onClick={() => deactivate()}
          className="w-full flex"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {shortenAddress(account)}
          <motion.div variants={variants} animate={controls} className="ml-2">
            <img
              src="/images/metamask-logo.png"
              alt="metamask logo"
              className="w-6 h-6"
            />
          </motion.div>
        </Button>
      ) : (
        <Button
          onClick={() => activateBrowserWallet()}
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
