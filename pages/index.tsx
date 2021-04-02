import React, { useEffect } from 'react'
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth'
import Layout from '@components/layout/normal'
import Clock from '@components/Clock'
import Hello from '@components/Hello'
import DemoPageLinks from '@components/DemoPageLinks'
import { LanguageSelector } from '@components/LanguageSelector'
import { useDispatch } from 'react-redux'
import * as BookActions from '@actions/book-actions';
// import { useTranslation } from '~/i18n'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Demo = () => {
  const user = useAuthUser()
  const dispatch = useDispatch()
  const { t } = useTranslation('common')

  useEffect(() => {
    // Initialize book data on background
    user.getIdToken().then( token => {
      if ( token ) {
        dispatch(BookActions.listBooks(token)).catch(err => window.alert(err));
      }
    });
  }, [user.email]);

  return (
    <Layout>
      <h3>{t('home')}</h3>
      <Hello inputMessage={user.email ? user.email : 'No email'}/> 
      <p>
        This page does not require authentication, so it won't redirect to
        the login page if you are not signed in.
      </p>
      <p>
        If you remove `getServerSideProps` from this page, it will be static
        and load the authed user only on the client side.
      </p>
      <DemoPageLinks />    
      <h3>Clock</h3>
      <Clock /> 
    </Layout>
  )
}

// export const getStaticProps = async ({ locale }) => ({
//   props: {
//     ...await serverSideTranslations(locale, ['common', 'footer']),
//   },
// })
export const getServerSideProps = withAuthUserTokenSSR()(async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
}))

export default withAuthUser()(Demo)
