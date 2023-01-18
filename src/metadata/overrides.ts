import { getAddress } from "@ethersproject/address";
import { TokenInfo } from "@uniswap/token-lists";
import axios from "axios";
import fs from "fs";
import { MetadataOverride, Network } from "../types";

export type Assets = {
  local: string[];
  trustWallet: string[];
};

export const networkNameMap: Record<Network, string> = {
  [Network.Homestead]: "ethereum",
  [Network.Goerli]: "ethereum",
  [Network.Polygon]: "polygon",
  [Network.Arbitrum]: "ethereum",
  [Network.Optimism]: "ethereum",
  [Network.Bsc]: "smartchain",
  [Network.BscTestnet]: "smartchain",
};

export async function getExistingMetadata(
  network: Network,
  knownTokenInfo?: TokenInfo[]
): Promise<Record<string, MetadataOverride>> {
  // Pull the trustwallet tokenlist for the network of interest
  const trustwalletListUrl = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${networkNameMap[network]}/tokenlist.json`;
  const trustwalletListResponse = await axios.get(trustwalletListUrl);
  const trustwalletTokenList = trustwalletListResponse.data.tokens;

  // Create fake TokenInfo for the local images
  const localAssetDirFiles: string[] = fs.readdirSync("assets");
  const localAssets = localAssetDirFiles.map((assetFile) => {
    const address = assetFile.split(".png")[0];
    return {
      address: address,
      logoURI: `https://raw.githubusercontent.com/Iguana-DEX/assets/main/assets/${address.toLowerCase()}.png`,
    };
  });

  const tokenInfo: TokenInfo[] = [
    ...trustwalletTokenList,
    ...localAssets,
    ...(knownTokenInfo ?? []),
  ];

  // Note that we're doing a shallow merge here
  return tokenInfo.reduce((acc, info) => {
    acc[getAddress(info.address)] = info;
    return acc;
  }, {} as Record<string, MetadataOverride>);
}

export function getMainnetAddress(address: string): string {
  const map: Record<string, string> = {
    // Goerli
    // BAL
    "0xfA8449189744799aD2AcE7e0EBAC8BB7575eff47":
      "0xba100000625a3754423978a60c9317c58a424e3D",
    // DAI
    "0x8c9e6c40d3402480ACE624730524fACC5482798c":
      "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    // USDT
    "0x1f1f156E0317167c11Aa412E3d1435ea29Dc3cCE":
      "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    "0xe0C9275E44Ea80eF17579d33c55136b7DA269aEb":
      "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    "0x37f03a12241E9FD3658ad6777d289c3fb8512Bc9":
      "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    "0x829f35cEBBCd47d3c120793c12f7A232c903138B":
      "0x956F47F50A910163D8BF957Cf5846D573E7f87CA",
    "0xFF386a3d08f80AC38c77930d173Fa56C6286Dc8B":
      "0x6810e776880C02933D47DB1b9fc05908e5386b96",
    "0x4Cb1892FdDF14f772b2E39E299f44B2E5DA90d04":
      "0x71fc860F7D3A592A4a98740e39dB31d25db65ae8",
    "0x811151066392fd641Fe74A9B55a712670572D161":
      "0x9bA00D6856a4eDF4665BcA2C2309936572473B7E",
    "0x89534a24450081Aa267c79B07411e9617D984052":
      "0x02d60b84491589974263d922d9cc7a3152618ef6",
    "0xeFD681A82970AC5d980b9B2D40499735e7BF3F1F":
      "0x2bbf681cc4eb09218bee85ea2a5d3d13fa40fc0c",
    "0x0595D1Df64279ddB51F1bdC405Fe2D0b4Cc86681":
      "0x9210f1204b5a24742eba12f710636d76240df3d0",
    "0x5cEA6A84eD13590ED14903925Fa1A73c36297d99":
      "0x804cdb9116a10bb78768d3252355a1b18067bf8f",
    "0x13ACD41C585d7EbB4a9460f7C8f50BE60DC080Cd":
      "0x7b50775383d3d6f0215a8f290f2c9e2eebbeceb2",

    // BscTestnet
    // WBNB
    "0xE906CBeCd4A17DF62B8d6c8C82F3882af25295f5":
      "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    // DAI
    "0xEC5dCb5Dbf4B114C9d0F65BcCAb49EC54F6A0867":
      "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
    // USDC
    "0x64544969ed7EBf5f083679233325356EbE738930":
      "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
    // USDT
    "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd":
      "0x55d398326f99059ff775485246999027b3197955",
    // BUSD
    "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee":
      "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
    // BTC
    "0x6ce8dA28E2f864420840cF74474eFf5fD80E65B8":
      "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
    // ETH
    "0xd66c6B4F0be8CE5b39D52E0Fd1344c389929B378":
      "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
    // XRP
    "0xa83575490D7df4E2F47b7D38ef351a2722cA45b9":
      "0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE",
    // DOT
    "0x5Ba18625A9E42f9E4755c5389Af65070d818542f":
      "0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402",
    // DOGE
    "0x92DD70182813CD3Da0f1B1eac914BaD6e0eD7AfD":
      "0xbA2aE424d960c26247Dd6c32edC70B295c744C43",
    // ADA
    "0x8197E8f4C358B9be57a09c6063bA4591Ea502E98":
      "0x3EE2200Efb3400fAbB9AacF31297cBdD1d435D47",
    // AVAX
    "0x14D440Cd12F99B676491cD6E7e606AD0F7ea9C51":
      "0x1CE0c2827e2eF14D5C4f29a091d735A204794041",
    // MATIC
    "0x2397355a668Bb2b8B70A2873F1EB559b21ed1A8d":
      "0xCC42724C6683B7E57334c4E856f4c9965ED682bD",
    // LTC
    "0xd11A7f26576dFD64Ca94B7092402642516c7603E":
      "0x4338665CBB7B2485A8855A139b75D5e34AB0DB94",
    // SHIB
    "0xb655afddA2a8f60126DFC8A7Ae2795b100E66178":
      "0x2859e4544C4bB03966803b044A93563Bd2D0DD4D",
    // TRX
    "0xbb4b4004869Ee0A6942A6A5a0657c32a632B38Ed":
      "0x85EAC5Ac2F758618dFa09bDbe0cf174e7d574D5B",
    // UNI
    "0x0DCAF36c5774a04eA721069f0244076226aE0968":
      "0xBf5140A22578168FD562DCcF235E5D43A02ce9B1",
    // ATOM
    "0x797DF1c15eB8A1Fdbe81ce118c4A787699Bb0C2E":
      "0x0Eb3a705fc54725037CC9e008bDede697f62F335",
    // LINK
    "0xdf2B91419D08bF3f70EBdaA45175c4485540E3B3":
      "0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD",
    // EOS
    "0xfe67F0bC56c3C84fdAC21788799f6dC1952BE683":
      "0x56b6fB708fC5732DEC1Afc8D8556423A2EDcCbD6",
    // CAKE
    "0x243f7a225930392E9C206f25BA9200862F7fe8F8":
      "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
    // BCH
    "0x6d81740A0AEF5ba3fa2c3ff8e49438D00a13AFEd":
      "0x8fF795a6F4D97E7887C79beA79aba5cc76444aDf",
    // 1INCH
    "0x5fC243E2A22EeAD26B2Ee1D31ED702F3970fb738":
      "0x111111111117dC0aa78b770fA6A738034120C302",
  };
  return map[address] || address;
}
