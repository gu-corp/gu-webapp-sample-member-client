import { ApolloServer, gql, Config  } from 'apollo-server-micro';
import BookService from '~/api/book/book-service'

export const typeDefs: Config["typeDefs"] = gql`
  type Book {
    id: String!
    title: String!
    description: String
  }

  """
  A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format.
  """
  scalar DateTime

  type Query {
    getBook(id: String!): Book!
    listBooks(skip: Int = 0, take: Int = 25): [Book!]!
  }

  type Mutation {
    addBook(book: NewBookInput!): Book!
    removeBook(id: String!): Boolean!
  }

  input NewBookInput {
    title: String!
  }

  type Subscription {
    bookAdded: Book!
  }
`;

export const resolvers: Config["resolvers"] = {
  Query: {
    getBook: BookService.getBook,
    listBooks: BookService.listBook
  },

  Mutation: {
    addBook: BookService.addBook,
    removeBook: BookService.removeBook
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });
export default apolloServer.createHandler({ path: "/api/book" });
