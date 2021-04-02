import * as GTypes from '../../../../objects/gtypes';

export const getHelloQuery = (message: string) => `
{
  getHello(message:"${message}") 
}
`;

export type GetHelloQueryResultType = GTypes.Scalars['String']