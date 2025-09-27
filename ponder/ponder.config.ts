import { createConfig } from "ponder";
import { http, parseAbi, parseAbiItem } from "viem";

import { FactoryAbi } from "./abis/FactoryAbi";
import { IntimeAbi } from "./abis/IntimeAbi";

// NOTE: this is so that we can test locally with latest block and decrease indexing time
const startBlock = 31615200;

export default createConfig({
  // database: {
  //   kind: "postgres",
  // },
  chains: {
    "base-sepolia": {
      id: 84532,
      rpc: http(process.env.PONDER_RPC_URL_84532),
    },
  },
  contracts: {
    Factory: {
      chain: "base-sepolia",
      address: "0x85C45Eb570C46bB99a5fEa862cB2b2286b067CB5",
      abi: FactoryAbi,
      startBlock: startBlock,
    },
    Intime: {
      chain: "base-sepolia",
      address: {
        address: "0x85C45Eb570C46bB99a5fEa862cB2b2286b067CB5",
        event: parseAbiItem(
          "event GameCreated(address indexed gameAddress, address indexed owner, string gameName, uint256 startTime, uint256 endTime)"
        ),
        parameter: "gameAddress",
      },
      abi: IntimeAbi,
      startBlock: startBlock,
    },
  },
});