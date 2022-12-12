export interface PolygonMappedToken {
    chainId: number;
    child_address_passed_by_user: boolean;
    child_token: string;
    count: number;
    created_at: string;
    decimals: number;
    deleted: boolean;
    id: number;
    map_type: 'POS';
    mintable: boolean;
    name: string;
    new_child_token: string;
    new_mintable: boolean;
    owner: string;
    reason: string;
    reason_for_remapping: string;
    remapping_allowed: boolean;
    remapping_request_submitted: boolean;
    remapping_verified: boolean;
    root_token: string;
    status: number;
    symbol: string;
    token_type: string;
    updated_at: string;
    uri: string;
}
export declare type PolygonMappedTokenData = {
    [key: string]: PolygonMappedToken;
};
