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
  const dispatch = useDispatch()
  const [isEnabled, setIsEnabled] = useState(false);
  const [address, setAddress] = useState(undefined);
  const [ethBalance, setEthBalance] = useState(undefined);
  const [network, setNetwork] = useState(undefined);
  const { t } = useTranslation('common')

   useEffect(() => {
    let win: any = window;
    setIsEnabled(win.ethereum !== 'undefined');
    setInterval(() => {
      // console.log(win.ethereum);
      setIsEnabled(win.ethereum !== 'undefined');
    },1000);
  }), [];

  useEffect(() => {
    let win: any = window;
    // console.log(win.ethereum);
    if (win.ethereum !== 'undefined') {
      const web3: Web3  = new Web3(win.ethereum);  
      setAddress(win.ethereum.selectedAddress);
      setNetwork(win.ethereum.chainId);
    }

    win.ethereum.on('accountsChanged', networkId => {
      // handle the new network
      setAddress(win.ethereum.selectedAddress);
      console.log('accountsChanged')
    })

    win.ethereum.on('connect', networkId => {
      // handle the new network
      setAddress(win.ethereum.selectedAddress);
      console.log('connect')
    })

    win.ethereum.on('disconnect', networkId => {
      // handle the new network
      setAddress(win.ethereum.selectedAddress);
      console.log('disconnect')
    })

    win.ethereum.on('networkChanged', networkId => {
      // handle the new network
      setNetwork(networkId);
      console.log('networkChanged')
    })

    win.ethereum.on('chainChanged', networkId => {
      // handle the new network
      setNetwork(networkId);
      console.log('chainChanged')
    })

  }), [isEnabled];

  useEffect(() => {
    let win: any = window;
    if (win.ethereum !== 'undefined' && address) {
      const web3: Web3  = new Web3(win.ethereum);  
      web3.eth.getBalance(address).then( value => {        
        setEthBalance(web3.utils.fromWei(value, 'ether'));
      });
    }
  }), [address];
  
  const ethEnabled = () => {
    let win: any = window;
    if (win.ethereum) {
      win.ethereum.enable();

      return true;
    }
    return false;
  }

  const getToken = async () => {
    const res = await fetch(`/api/get-token`)
    const data = await res.json()
    console.log(data);
    window.alert(JSON.stringify(data));
  }

  if ( !address ) {
    return (
      <Layout>
        <div>Please unlock your wallet</div>
        <Button variant="contained"
          color="primary"
          onClick={() => ethEnabled()}>Unlock</Button>
      </Layout>
    )
  }

  return (
    <Layout>
      <h1>Get Token</h1>
      <h2>{t('home')}</h2>
      <ul>
        <li>Address : {address ? address : `-`}</li>
        <li>EthBalance : {ethBalance ? ethBalance : `-`}</li>
        <li>ChainId : {network ? network : `-`}</li>
      </ul>
      <Button variant="contained"
        color="primary"
        onClick={() => getToken()}>Get Token</Button>
       <hr />
    </Layout>
  )
}

export const getServerSideProps = withAuthUserTokenSSR()(async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
}))

export default ERC20Issuer
