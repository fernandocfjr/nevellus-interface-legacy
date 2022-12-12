import { Token } from '@NevellusSwap/sdk-core'
import { TokenInfo, TokenList } from '@NevellusSwap/token-lists'
import { ChainId } from '../constants/chainId'
import {
  DAI,
  DAI_ARBITRUM_ONE,
  DAI_OPTIMISM,
  DAI_POLYGON,
} from '../constants/tokens'
import { compareTokenInfos } from '../utils'

export const Tokens: Partial<Record<ChainId, Record<string, TokenInfo>>> = {
  [ChainId.MAINNET]: {
    DAI: tokenToTokenInfo(DAI),
  },
  [ChainId.ARBITRUM_ONE]: {
    DAI: tokenToTokenInfo(DAI_ARBITRUM_ONE),
  },
  [ChainId.POLYGON]: {
    DAI: tokenToTokenInfo(DAI_POLYGON),
  },
  [ChainId.OPTIMISM]: {
    DAI: tokenToTokenInfo(DAI_OPTIMISM),
  },
}

export const sampleL1TokenList: TokenList = {
  name: 'Sample',
  timestamp: new Date(1646146610).toISOString(),
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  tokens: [Tokens[ChainId.MAINNET]!.DAI],
}

export const arbBridgeL2Address = '0x467194771dae2967aef3ecbedd3bf9a310c76c65'
export const arbBridgeL1Address = '0xd3b5b60020504bc3489d6949d545893982ba3011'

export const arbedSampleTokenList = {
  ...sampleL1TokenList,
  name: 'Arbed Sample',
  tokens: [
    {
      ...Tokens[ChainId.ARBITRUM_ONE]!.DAI,
      extensions: {
        bridgeInfo: {
          [ChainId.MAINNET]: {
            tokenAddress: DAI.address,
            // originBridgeAddress: arbBridgeL2Address,
            // destBridgeAddress: arbBridgeL1Address,
          },
        },
      },
    } as unknown as TokenInfo,
    {
      ...(Tokens[ChainId.MAINNET]!.DAI as unknown as TokenInfo),
      extensions: {
        bridgeInfo: {
          [ChainId.ARBITRUM_ONE]: {
            tokenAddress: DAI_ARBITRUM_ONE.address,
            // destBridgeAddress: arbBridgeL2Address,
            // originBridgeAddress: arbBridgeL1Address,
          },
        },
      },
    } as unknown as TokenInfo,
  ].sort(compareTokenInfos),
}
export const polygonedSampleTokenList = {
  ...sampleL1TokenList,
  name: 'Polygoned Sample',
  tokens: [
    {
      ...Tokens[ChainId.POLYGON]!.DAI,
      extensions: {
        bridgeInfo: {
          [ChainId.MAINNET]: {
            tokenAddress: DAI.address,
          },
        },
      },
    } as unknown as TokenInfo,
    {
      ...(Tokens[ChainId.MAINNET]!.DAI as unknown as TokenInfo),
      extensions: {
        bridgeInfo: {
          [ChainId.POLYGON]: {
            tokenAddress: DAI_POLYGON.address,
          },
        },
      },
    } as unknown as TokenInfo,
  ].sort(compareTokenInfos),
}

export const optimizedSampleTokenList = {
  ...sampleL1TokenList,
  name: 'Optimized Sample',
  tokens: [
    {
      ...Tokens[ChainId.OPTIMISM]!.DAI,
      extensions: {
        bridgeInfo: {
          [ChainId.MAINNET]: {
            tokenAddress: DAI.address,
          },
        },
      },
    } as unknown as TokenInfo,
    {
      ...(Tokens[ChainId.MAINNET]!.DAI as unknown as TokenInfo),
      extensions: {
        bridgeInfo: {
          [ChainId.OPTIMISM]: {
            tokenAddress: DAI_OPTIMISM.address,
          },
        },
      },
    } as unknown as TokenInfo,
  ].sort(compareTokenInfos),
}

function tokenToTokenInfo({
  chainId,
  address,
  name,
  decimals,
  symbol,
}: Token): TokenInfo {
  return {
    chainId,
    address: address,
    name: name ?? 'n/a',
    decimals,
    symbol: symbol ?? 'n/a',
  }
}
