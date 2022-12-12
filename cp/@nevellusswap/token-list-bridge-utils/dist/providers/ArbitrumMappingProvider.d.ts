import { MappingProvider } from './MappingProvider';
import { TokenList } from '@NevellusSwap/token-lists';
/**
 * This provider provides the l1->l2(Arbitrum) address mappings using the arbitrum SDK.
 */
export declare class ArbitrumMappingProvider implements MappingProvider {
    l1TokenList: TokenList;
    constructor(l1TokenList: TokenList);
    provide(): Promise<{
        [key: string]: string | undefined;
    }>;
}
