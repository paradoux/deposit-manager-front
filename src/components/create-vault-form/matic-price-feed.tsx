const { ethers } = require("ethers");
const aggregatorV3InterfaceABI = [
  {
    inputs: [],
    name: "latestAnswer",
    outputs: [{ internalType: "int256", name: "answer", type: "int256" }],
    stateMutability: "view",
    type: "function",
  },
];
const maticPoolInPolygon = "0xAB594600376Ec9fD91F8e885dADF0CE036862dE0";
const maticPoolInMumbai = "0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada";
const polygonRPC = "https://polygon-rpc.com";
const mumbaiRPC = "https://rpc-mumbai.maticvigil.com";
export const CurrentMaticInUSD = async () => {
  const currentChainId = await window.ethereum.request({
    method: "eth_chainId",
  });

  let priceFeedAddress =
    currentChainId.toString() !== "0x89"
      ? maticPoolInPolygon
      : maticPoolInMumbai;
  let providerRpc =
    currentChainId.toString() !== "0x89" ? polygonRPC : mumbaiRPC;
  const provider = new ethers.providers.JsonRpcProvider(providerRpc);
  const priceFeed = new ethers.Contract(
    priceFeedAddress,
    aggregatorV3InterfaceABI,
    provider
  );
  let fetchedPrice = await priceFeed.latestAnswer();
  let price = ethers.utils.formatUnits(fetchedPrice.toString(), 8);
  price = Number(price).toFixed(2);
  // console.log(`$ ${price} USDC per matic`);
  return price;
};
