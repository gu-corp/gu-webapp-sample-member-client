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
import TokenIssuer from '@/components/sandbox/token-issuer';

const Home = () => {
  const { t } = useTranslation('common')
  const AuthUser = useAuthUser();

  return (
    <Layout>
      <p>このウェブサイトでは、G.U.Sandbox Chain用のテスト用トークンを無償発行する事ができます。トークンを取得するには、Lunascape Wallet等のEthererum互換ウォレットをブラウザにいれていただく必要があります。</p>
      <p>詳細はこちらの記事をご覧ください。</p>
      <hr />
      <TokenIssuer />
    </Layout>
  )
}

export const getServerSideProps = withAuthUserTokenSSR()(async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
}))

export default Home
