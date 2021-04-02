import React from 'react'
import {
  useAuthUser,
  withAuthUser,
  withAuthUserSSR,
  AuthAction,
} from 'next-firebase-auth'
import Layout from '@components/layout/normal'
import DemoPageLinks from '@components/DemoPageLinks'
import getAbsoluteURL from '~/utils/getAbsoluteURL'

const styles = {
  content: {
    padding: 32,
  },
  infoTextContainer: {
    marginBottom: 32,
  },
}

const Demo = ({ favoriteColor, children }) => {
  const AuthUser = useAuthUser()
  return (
    <Layout>
      <h3>Example: SSR + no ID token</h3>
      <p>
        This page requires authentication. It will do a server-side redirect
        (307) to the login page if the auth cookies are not set.
      </p>
      <p>
        This page uses `withAuthUserSSR` rather than `withAuthUserTokenSSR`,
        so it does not have server-side access to the user ID token.
      </p>
      <p>Your favorite color is: {favoriteColor}</p>
    <DemoPageLinks />
    </Layout>
  )
}

export const getServerSideProps = withAuthUserSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser, req }) => {
  // The ID token will be null, because `withAuthUserSSR` does not
  // include one. If you need a server-side token, use
  // `withAuthUserTokenSSR`.
  const token = await AuthUser.getIdToken()
  const endpoint = getAbsoluteURL('/api/example', req)
  if ( endpoint ) {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: token || 'unauthenticated',
      },
    })
    const data = await response.json()
    if (!response.ok) {
      throw new Error(
        `Data fetching failed with status ${response.status}: ${JSON.stringify(
          data
        )}`
      )
    }
    return {
      props: {
        favoriteColor: data.favoriteColor,
      },
    }
  }
})

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Demo)
