import { TokenInfo } from "@uniswap/token-lists";

export enum Network {
  Homestead = "homestead",
  Goerli = "goerli",
  Polygon = "polygon",
  Arbitrum = "arbitrum",
  Optimism = "optimism",
  Bsc = "bsc",
  BscTestnet = "bsctestnet",
}

export enum List {
  Listed = "listed",
  Untrusted = "untrusted",
  Vetted = "vetted",
}

export type MinimalTokenInfo = Pick<TokenInfo, "name" | "symbol" | "decimals">;
export type MetadataOverride = Partial<TokenInfo>;
