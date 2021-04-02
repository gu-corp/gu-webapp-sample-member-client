import React from 'react'
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction,
} from 'next-firebase-auth'
import Layout from '@components/layout/normal'
import DemoPageLinks from '@components/DemoPageLinks'
import getAbsoluteURL from '~/utils/getAbsoluteURL'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Demo = ({ favoriteColor, children }) => {
  return (
    <Layout>
      <h1>Example: SSR + data fetching with ID token</h1>
      <p>
        This page requires authentication. It will do a server-side redirect
        (307) to the login page if the auth cookies are not set.
      </p>
      <p>Your favorite color is: {favoriteColor}</p>
      <h2>Demos</h2>
      <DemoPageLinks />
    </Layout>
  )
}

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser, req, locale }) => {
  // Optionally, get other props.
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
        ...await serverSideTranslations(locale, ['common']),
      },
    }
  }
})

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Demo)
