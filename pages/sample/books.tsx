import React from 'react'
import { useState } from 'react';
import { useAuthUser, withAuthUser, withAuthUserSSR, AuthAction } from 'next-firebase-auth'
import Layout from '@components/layout/normal'
import BookList from '@components/BookList'
import { useDispatch } from 'react-redux'
import DemoPageLinks from '@components/DemoPageLinks'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Hello from '@components/Hello'

const styles = {
  content: {
    padding: 32,
  },
  infoTextContainer: {
    marginBottom: 32,
  },
}

const Books = () => {
  const AuthUser = useAuthUser()

  return (
    <Layout>
      <h3>Books</h3>
      <div>
        { AuthUser.email ? <BookList /> : <div>you need to login</div> }
      </div>
      <DemoPageLinks />
    </Layout>
  )
}

export const getServerSideProps = withAuthUserSSR({
})(async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
}))

export default withAuthUser()(Books)
