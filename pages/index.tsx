import React, { useEffect } from 'react'
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction
} from 'next-firebase-auth'
import Layout from '@components/layout/normal'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { TaskList } from '~/components/tasks';
import { AddTask } from '~/components/tasks/add-task';

const Demo = () => {
  const { t } = useTranslation('common')
  const AuthUser = useAuthUser();

  return (
    <Layout>
      <h1>{t('home')}</h1>  
      <h2>Welcome to webapp sample!</h2>
      <p>Your email is {AuthUser.email ? AuthUser.email : "unknown"}.</p>
      <TaskList />
      <AddTask />
    </Layout>
  )
}

export const getServerSideProps = withAuthUserTokenSSR()(async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
}))

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Demo)
