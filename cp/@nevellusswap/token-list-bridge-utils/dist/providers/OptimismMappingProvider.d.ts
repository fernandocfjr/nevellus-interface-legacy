import { MappingProvider } from './MappingProvider';
/**
 * The Optimism L2 mapping (linked above) is manually maintained by the Optimism team.
 *
 * This provider provides the l1->l2(Optimism) token mappings.
 */
export declare class OptimismMappingProvider implements MappingProvider {
    provide(): Promise<{
        [key: string]: string | undefined;
    }>;
}
