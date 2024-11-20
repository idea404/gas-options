declare module '@nilfoundation/niljs' {
  export type IAddress = `0x${string}`;
  export type BlockTag = 'latest' | 'earliest' | 'pending';

  export class HttpTransport {
    constructor(config: { endpoint: string; timeout?: number });
  }

  export class PublicClient {
    constructor(config: { transport: HttpTransport; shardId?: number });
    getBalance(address: IAddress, blockTag?: BlockTag): Promise<bigint>;
    chainId(): Promise<number>;
    getMessageCount(address: IAddress, blockTag?: BlockTag): Promise<number>;
  }
}
