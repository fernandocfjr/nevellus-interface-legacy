import { PolygonMappedTokenData } from '@nevellusswap/token-list-bridge-utils/src/constants/types'

export interface MappingProvider {
  provide(): Promise<
    PolygonMappedTokenData | { [key: string]: string | undefined }
  >
}
