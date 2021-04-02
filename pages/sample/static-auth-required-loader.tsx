import React, { useCallback, useEffect, useState } from 'react'
import { useAuthUser, withAuthUser, AuthAction } from 'next-firebase-auth'
import Layout from '@components/layout/normal'
import DemoPageLinks from '@components/DemoPageLinks'
import FullPageLoader from '@components/FullPageLoader'
import getAbsoluteURL from '~/utils/getAbsoluteURL'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const styles = {
  content: {
    padding: 32,
  },
  infoTextContainer: {
    marginBottom: 32,
  },
}

const Demo = () => {
  const AuthUser = useAuthUser() // the user is guaranteed to be authenticated

  const [favoriteColor, setFavoriteColor] = useState()
  const fetchData = useCallback(async () => {
    const token = await AuthUser.getIdToken()
    const endpoint = getAbsoluteURL('/api/example')
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: token ? token : '',
      },
    })
    const data = await response.json()
    if (!response.ok) {
      // eslint-disable-next-line no-console
      console.error(
        `Data fetching failed with status ${response.status}: ${JSON.stringify(
          data
        )}`
      )
      return null
    }
    return data
  }, [AuthUser])

  useEffect(() => {
    const fetchFavoriteColor = async () => {
      const data = await fetchData()
      setFavoriteColor(data ? data.favoriteColor : 'unknown :(')
    }
    fetchFavoriteColor()
  }, [fetchData])

  return (
    <Layout>
      <h1>Example: static + loader</h1>
      <p>
        This page requires is static but requires authentication. Before the
        Firebase client SDK initializes, it shows a loader. After
        initializing, if the user is not authenticated, it client-side
        redirects to the login page.
      </p>
      <p>Your favorite color is: {favoriteColor}</p>
    <h2>Demos</h2>
    <DemoPageLinks />
    </Layout>
  )
}

export const getServerSideProps = (async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
}))

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  LoaderComponent: FullPageLoader,
})(Demo)
