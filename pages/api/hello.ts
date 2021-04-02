import { ApolloServer, gql, Config  } from 'apollo-server-micro';
import * as Resolvers from '~/api/hello/resolver'

export const typeDefs: Config["typeDefs"] = gql`
  type Query {
    getHello(message: String!): String!
  } 
`;

export const resolvers: Config["resolvers"] = {
  Query: {
    getHello: Resolvers.getHello
  },
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });
export default apolloServer.createHandler({ path: "/api/hello" });
