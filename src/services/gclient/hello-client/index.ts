import { GraphqlClient, GqlClientOptions } from '@gulabs/gubase-client-lib';
import { getHelloQuery, GetHelloQueryResultType } from './query/getHelloQuery';

export class HelloGqlClient extends GraphqlClient {
  constructor(options: GqlClientOptions) {
    super(options);
  }

  public async getHello(message: string) {
    return  await this.doQuery<GetHelloQueryResultType, void>(getHelloQuery(message));
  }
}
