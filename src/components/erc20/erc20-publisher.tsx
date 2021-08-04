import React, { useState } from "react";
import { useTranslation } from 'next-i18next'
import { withSnackbar } from 'notistack';

import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import { validateObject } from '@/common/validator/class-validator-helper';
import { ERC20PublisherInput } from './erc20-publisher.input';
import { Label } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 1
  },
  input: {
    margin: 5
  },
  button: {
    margin: 5
  }
}));

const initialValues: ERC20PublisherInput = {
  tokenName: '',
  tokenSimbol: 'TST',
  totalSupply: 10000000000
}

const ERC20Publisher = (props) => {
  const { t } = useTranslation('common')
  const classes = useStyles();
  const [contractAddress, setContractAddress] = useState('-');

  const handleSubmit = (values, { setSubmitting }) => {
    (async() => {
      setSubmitting(true)
      try {
        await deploy(values);
      } catch ( err ) {
        props.enqueueSnackbar(err.message, { 
          variant: 'error',
          preventDuplicate: true,
        });
      } finally {
        setSubmitting(false)
      }
    })();
  }

  const deploy = async (values) => {
      const win: any = window;  
      if ( !win.ethereum ) {
        window.alert('No Wallet');
        return;
      }
      const Web3 = require('web3');
      const web3 = new Web3(win.ethereum);
      win.ethereum.enable();

      const MyToken = require('./MyToken.json');
      const contract = new web3.eth.Contract(MyToken.abi);
      const bytecode = MyToken.bytecode;

      // window.alert('Wallet Detected: ' + win.ethereum.selectedAddress);

      // const address = '0x131b395794e487b564fd86f5872727fc44544d23';
      // const privKey = '867d2d1c8c9fbf3694fb6e8eca5e125ef7ee1fa0b07e2864212146965c35e35a';
      const address = win.ethereum.selectedAddress;
      // const privKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
    
      const deployTx = contract.deploy({
        data: bytecode,
        arguments: [values.tokenName, values.tokenSimbol, values.totalSupply, 2],
      });

      console.log(deployTx);

      const txHash = await win.ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: address,
            data: deployTx.encodeABI(),
            // gasPrice: '0x09184e72a000',
            gas: '12450000',
          },
        ],
      });

      const sleep = (time) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, time);
        });
    }

      for (var i = 0; i < 10; i++) {     // （1）
        console.log(`TxHash:${txHash} ${i}`)
        await sleep(1000);
        const createReceipt = await web3.eth.getTransactionReceipt(txHash)
        console.log(createReceipt);
        if ( createReceipt) {
          props.enqueueSnackbar('Contract deployed at address : ' + createReceipt.contractAddress, { 
            variant: 'info',
            preventDuplicate: true,
          });
          console.log('Contract deployed at address : ' + createReceipt.contractAddress);
          setContractAddress(createReceipt.contractAddress);
          break;
        };
      }

      // const createTransaction = await web3.eth.accounts.signTransaction(
      // {
      //   from: address,
      //   data: deployTx.encodeABI(),
      //   gas: '12450000',
      // },
      //   privKey
      // );

      // const createReceipt = await web3.eth.sendSignedTransaction(
      //   createTransaction.rawTransaction
      // );

  }

  return (
    <>
    <Formik
      initialValues={initialValues}
      validate={async(values) => await validateObject(Object.assign(new ERC20PublisherInput(), values))}
      onSubmit={handleSubmit}
    >
      {({ submitForm, isSubmitting, errors, isValid }) => (
          <Form className={classes.root}>
          <Field
            className={classes.input}
            component={TextField}
            name="tokenName"
            label={'Token Name'}
            variant="outlined"
          />    
          <Field
            className={classes.input}
            component={TextField}
            name="tokenSimbol"
            label={'Token Simbol'}
            variant="outlined"
          />   
          <br />
          <Field
            className={classes.input}
            component={TextField}
            name="totalSupply"
            label={'Total Supply'}
            variant="outlined"
          />  
          <br />
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            disabled={isSubmitting || !isValid}
            onClick={submitForm}
          >
          {isSubmitting ? <CircularProgress /> : "Submit" }
          </Button>
          <div>ContractAccress: {contractAddress}</div>
        </Form>
      )}      
    </Formik>    
    
    </>
  );
};

export default withSnackbar(ERC20Publisher);