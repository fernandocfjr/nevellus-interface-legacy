import { TokenInfo, TokenList } from '@NevellusSwap/token-lists';
import { ChainId } from '../constants/chainId';
export declare const Tokens: Partial<Record<ChainId, Record<string, TokenInfo>>>;
export declare const sampleL1TokenList: TokenList;
export declare const arbBridgeL2Address = "0x467194771dae2967aef3ecbedd3bf9a310c76c65";
export declare const arbBridgeL1Address = "0xd3b5b60020504bc3489d6949d545893982ba3011";
export declare const arbedSampleTokenList: {
    name: string;
    tokens: TokenInfo[];
    timestamp: string;
    version: import("@NevellusSwap/token-lists").Version;
    keywords?: string[] | undefined;
    tags?: import("@NevellusSwap/token-lists").Tags | undefined;
    logoURI?: string | undefined;
};
export declare const polygonedSampleTokenList: {
    name: string;
    tokens: TokenInfo[];
    timestamp: string;
    version: import("@NevellusSwap/token-lists").Version;
    keywords?: string[] | undefined;
    tags?: import("@NevellusSwap/token-lists").Tags | undefined;
    logoURI?: string | undefined;
};
export declare const optimizedSampleTokenList: {
    name: string;
    tokens: TokenInfo[];
    timestamp: string;
    version: import("@NevellusSwap/token-lists").Version;
    keywords?: string[] | undefined;
    tags?: import("@NevellusSwap/token-lists").Tags | undefined;
    logoURI?: string | undefined;
};
