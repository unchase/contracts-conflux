const { task } = require("hardhat/config");

require("dotenv").config();

require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("@openzeppelin/hardhat-upgrades");

task("deploy", "Deploy contract").setAction(async () => {
  const deploy = require("./scripts/deploy");
  await deploy();
});

task("deploy-checker", "Deploy BalanceChecker contract").setAction(async () => {
  const deploy = require("./scripts/deploy-checker");
  await deploy();
});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "conflux",
  solidity: {
    version: "0.8.21",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true,
    },
  },
  networks: {
    conflux: {
      chainId: 1030 ,
      url: "https://evm.confluxrpc.com",
      accounts: [process.env.PRIVATE_KEY],
      gasMultiplier: 1,
    }
  },
  etherscan: {
    apiKey: {
      conflux: process.env.CONFLUX_API_KEY,
    },
    customChains: [
      {
        network: "conflux",
        chainId: 1030 ,
        urls: {
          apiURL: "https://evmapi.confluxscan.io/api/",
          browserURL: "https://evm.confluxscan.io/",
        },
      },
    ],
  },
  sourcify: {
    enabled: false
  }
};
