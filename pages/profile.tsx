import React, { useEffect } from 'react'
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction
} from 'next-firebase-auth'
import Layout from '@/components/layout/normal'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { AddTaskForm } from '@/components/tasks/';
import { TaskList } from '@/components/tasks';

const Demo = () => {
  const user = useAuthUser()
  const dispatch = useDispatch()
  const { t } = useTranslation('common')

  return (
    <Layout>
      <h1>{t('profile')}</h1>  
      <TaskList />
      <AddTaskForm />
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
