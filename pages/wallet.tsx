import React, { useEffect, useState } from 'react'
import {
  useAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth'
import { Button, TextField } from '@material-ui/core';
import Layout from '@/components/layout/normal'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Web3 from 'web3';

const ERC20Issuer = () => {

  return (
    <Layout>
      <h1>Walletのインストール</h1>
      <p>トークンの取得にはウォレットをブラウザにインストールする必要があります。下記のウォレットのうち一つをインストールして下さい。</p>
      <ul>
        <li>
          <a href="https://www.lunascape.org/wallet">Lunascape Wallet ( Google Chrome対応 )</a>          
        </li>
        <li>
          <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ja">Metamask</a>
        </li>
      </ul>
    </Layout>
  )
}

export const getServerSideProps = withAuthUserTokenSSR()(async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
}))

export default ERC20Issuer
