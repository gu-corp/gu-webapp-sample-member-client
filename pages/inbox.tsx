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
import { TaskList } from '@components/TaskList';
import { AddTask } from '@components/AddTask';

const Demo = () => {
  const user = useAuthUser()
  const dispatch = useDispatch()
  const { t } = useTranslation('common')

  const hoge: any = undefined;

  return (
    <Layout>
      <h1>{t('inbox')}</h1>  
      <TaskList initialData={hoge}/>
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
