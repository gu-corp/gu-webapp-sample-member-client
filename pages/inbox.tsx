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

const Demo = () => {
  const user = useAuthUser()
  const dispatch = useDispatch()
  const { t } = useTranslation('common')

  const hoge: any = undefined;

  return (
    <Layout>
      <h1>{t('inbox')}</h1>
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
