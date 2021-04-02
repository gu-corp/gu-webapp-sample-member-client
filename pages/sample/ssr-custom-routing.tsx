import React from 'react'
import { useAuthUser, withAuthUser, withAuthUserSSR } from 'next-firebase-auth'
import Layout from '@components/layout/normal'
import DemoPageLinks from '@components/DemoPageLinks'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const styles = {
  content: {
    padding: 32,
  },
  infoTextContainer: {
    marginBottom: 32,
  },
}

const Demo = ({ emailVerified, children }) => {
  const AuthUser = useAuthUser()
  return (
    <Layout>
      <h1>Example: SSR + custom routing</h1>
      <p>
        This page requires authentication. It will do a{' '}
        <strong>custom/dynamic</strong>
        server-side redirect (307) to the login page if the user is not
        authenticated.
      </p>
      <p>
        The custom logic also does the following (which does not actually
        work, it's only for the purpose of illustrating what can be done):
        <ul>
          <li>
            If authenticated, but no email, it will generate a 404 page.
          </li>
          <li>
            If authenticated, but email is not verified, it performs a
            custom redirect to the login page and injects query parameters
            in the URL.
          </li>
        </ul>
      </p>
      <p>
        This page leverages the standard `redirect` and 'notFound' objects
        returned by `getServerSideProps` to perform the custom routing.
      </p>
      <p>User's email is verified: {emailVerified ? 'yes' : 'no'}</p>
      <h2>Demos</h2>
      <DemoPageLinks />
    </Layout>
  )
}

// Here we don't rely on the built-in REDIRECT_TO_LOGIN option of
// withAuthUserSSR, we do custom checks on the AuthUser and dynamic routing accordingly.
export const getServerSideProps = withAuthUserSSR()(async (ctx) => {
  // Retrieve AuthUser (that was injected by withAuthUserSSR) from the context.
  const { AuthUser } = ctx
  // If the user is not authenticated at all, do a simple custom redirect
  // to login page (equivalent to REDIRECT_TO_LOGIN parameter of withAuthUserSSR).
  if (!AuthUser || !AuthUser.id) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    }
  }
  // If the user is authenticated but has no email, let's assume that's a
  // big crime for the app, so display a 404 page.
  if (!AuthUser.email) {
    return {
      notFound: true,
    }
  }
  // If the user is authenticated, has an email, but the email is not verified,
  // we perform a custom redirect to the login page and inject query parameters
  // that the login page must handle.
  if (!AuthUser.emailVerified) {
    return {
      redirect: {
        destination: `/auth?verifyEmail=true&thenGoToPage=${encodeURIComponent(
          ctx.resolvedUrl
        )}`,
        permanent: false,
      },
    }
  }
  // And finally if everything is OK, we return a props object as usual.
  return {
    props: {
      email: AuthUser.email,
      emailVerified: AuthUser.emailVerified,
      someOtherProp: 'any other data can be added',
      ...await serverSideTranslations(ctx.locale, ['common']),
    },
  }
})

export default withAuthUser()(Demo)
