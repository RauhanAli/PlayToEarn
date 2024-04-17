require("@matterlabs/hardhat-zksync-solc");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  zksolc: {
    version: "1.3.9",
    compilerSource: "binary",
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },
  networks: {
    zksync_testnet: {
      url: "https://zksync2-testnet.zksync.dev",
      ethNetwork: "goerli",
      chainId: 280,
      zksync: true,
    },
    zksync_testnet: {
      url: "https://zksync2-testnet.zksync.dev",
      ethNetwork: "goerli",
      chainId: 280,
      zksync: true,
    },
    bsctestnet: {
      url: `https://data-seed-prebsc-1-s1.binance.org:8545`,
      // accounts: [`0x${CONTRACT_DEPLOYMENT_WALLET_PRIVATE_KEY}`],
      saveDeployments: true,
      chainId: 97,
    },
    bsc: {
      url: `https://bsc-dataseed.binance.org/`,
      // accounts: [`0x${CONTRACT_DEPLOYMENT_WALLET_PRIVATE_KEY}`],
      gas: 2100000,
      gasPrice: 8000000000,
      saveDeployments: true,
      chainId: 56,
    },
    zksync_mainnet: {
      url: "https://zksync2-mainnet.zksync.io/",
      ethNetwork: "mainnet",
      chainId: 324,
      zksync: true,
    },
  },
  paths: {
    artifacts: "./artifacts-zk",
    cache: "./cache-zk",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    version: "0.8.11",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
