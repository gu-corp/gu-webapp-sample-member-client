import React, { useEffect, useState } from 'react'
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction
} from 'next-firebase-auth'
import { Button, TextField } from '@material-ui/core';
import Layout from '@/components/layout/normal'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ERC20Publisher } from '@/components/erc20';
import Web3 from 'web3';

const WalletInfo = () => {
  const user = useAuthUser()
  const dispatch = useDispatch()
  const [isEnabled, setIsEnabled] = useState(false);
  const [address, setAddress] = useState(undefined);
  const [ethBalance, setEthBalance] = useState(undefined);
  const [network, setNetwork] = useState(undefined);
  const { t } = useTranslation('common')

  // useEffect(() => {
  //   setTimeout(() => {
  //     let win: any = window;
  //     if (win.ethereum) {
  //       setIsEnable(true);
  //     }
  //   }, 1000);    
  // }), [];

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

    win.ethereum.on('networkChanged', networkId => {
      // handle the new network
      setNetwork(networkId);
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

  const getEthBalance = () => {
    const web3 = new Web3();
    web3.eth.getBalance(win.ethereum.selectedAddress, (error, balance) => {
      console.log(balance);
    });
  }

  return (
    <Layout>
      <h1>Token</h1>
      { isEnabled ?
        <ul>
          <li>Address : {address ? address : `-`}</li>
          <li>EthBalance : {ethBalance ? ethBalance : `-`}</li>
          <li>ChainId : {network ? network : `-`}</li>
        </ul>        
        : <div>Please unlock your wallet</div>
      }
      <Button variant="contained"
        color="primary"
        onClick={() => ethEnabled()}>Enabled</Button>
      {/* <Button onClick={() => getAddress()}>getAddress</Button> */}     
      <hr></hr>
    </Layout>
  )
}

export default WalletInfo
