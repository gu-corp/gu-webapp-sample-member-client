import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import firebase from 'firebase'

const httpLink = createHttpLink({
  uri: 'http://localhost:8080/graphql',
});

// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem('token');
//   console.log('setContext');
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       // 'Access-Control-Allow-Origin': 'http://localhost:3000/',
//       authorization: token ? `Bearer ${token}` : "",
//     }
//   }
// });

const asyncAuthLink = setContext(
  async(request) => {
    const currentUser = await firebase.auth().currentUser;
    if ( currentUser ) {
      const token = await currentUser.getIdToken();
      return {
        headers: {
          // 'Access-Control-Allow-Origin': 'http://localhost:3000/',
          authorization: token ? `Bearer ${token}` : "",
        }
      };
    }
  }
);

export const client = new ApolloClient({
  link: asyncAuthLink.concat(httpLink),
  cache: new InMemoryCache()
});