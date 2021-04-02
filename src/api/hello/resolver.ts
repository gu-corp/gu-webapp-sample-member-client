import * as GTypes from '~/api/hello/gtypes';
import * as Impl from '~/api/hello/impl';

export async function getHello(parent, args: GTypes.QueryGetHelloArgs, context, info): Promise<GTypes.Scalars['String']> {
  const message = args.message;
  return Impl.getHello(message);
}