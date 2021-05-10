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
  request =>
    new Promise((success, fail) => {
      const auth = firebase.auth();
      const currentUser = auth.currentUser;
      if ( currentUser ) {
        currentUser
        .getIdToken()
        .then( token => {
          success({
            headers: {
              // 'Access-Control-Allow-Origin': 'http://localhost:3000/',
              authorization: token ? `Bearer ${token}` : "",
            }
          });
        }).catch( err => {
          fail(err);
        });
      } else {
        success({});
      }
    })
);

export const client = new ApolloClient({
  link: asyncAuthLink.concat(httpLink),
  cache: new InMemoryCache()
});