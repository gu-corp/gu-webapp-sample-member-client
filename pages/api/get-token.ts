import Web3 from 'web3';
import readline from 'readline';
const ethTx = require('ethereumjs-tx')

const handler = async (req, res) => {
  const reciept = await sendEther(
    '0xe546882a744f43d20b84e8a0e5a6ac9f83f9d6e0',
    '0x131b395794e487b564fd86f5872727fc44544d23',
    'ac5818a4755e1d88b1c7b88d059c96c312343afaa76c3a70ebb3d0f838658313');
  
  return res.status(200).json(reciept)
}

async function sendEther(addressFrom: string, addressTo: string, pKey: string) {
  const args = process.argv.slice(2);

  // web3 initialization - must point to the HTTP JSON-RPC endpoint
  var provider = 'https://a59e3f60-ff0f-4530-9e46-b9f371e345bd.4z9mdn90pg6rby7s7iqv9kjgg.ep.bccloud.net:8545/';
  console.log("******************************************");
  console.log("Using provider : " + provider);
  console.log("******************************************");
  var web3 = new Web3(new Web3.providers.HttpProvider(provider))
  web3.eth.transactionConfirmationBlocks = 1;
  // Sender address and private key
  // Second acccount in dev.json genesis file
  // Exclude 0x at the beginning of the private key
  const privKey = Buffer.from(pKey, 'hex')

  // Receiver address and value to transfer
  // Third account in dev.json genesis file
  const valueInEther = 1

  // Get the address transaction count in order to specify the correct nonce
  const txnCount = await web3.eth.getTransactionCount(addressFrom, "pending");
  console.log('txCount :' + txnCount);
  // Create the transaction object
  var txObject = {
      from: addressFrom,
      to: addressTo,
      value: web3.utils.numberToHex(web3.utils.toWei(valueInEther.toString(), 'ether')),
      gasPrice: web3.utils.numberToHex(10000000000),
      gas: web3.utils.numberToHex(21000),
      nonce: web3.utils.numberToHex(txnCount),
      chainId: '0x1869f',
  };

  // Sign the transaction with the private key
  var tx = new ethTx(txObject);
  tx.sign(privKey)

  //Convert to raw transaction string
  var serializedTx = tx.serialize();
  var rawTxHex = '0x' + serializedTx.toString('hex');

  // log raw transaction data to the console so you can send it manually
  console.log("Raw transaction data: " + rawTxHex);

  console.log("******************************************");
  console.log("Value transaction sent, waiting for receipt.");
  console.log("******************************************");
  try {
    const recipt = await web3.eth.sendSignedTransaction(rawTxHex);
    console.log('Reciept: ', recipt);
  } catch ( err ) {
    console.log('Error: ', err.message);
    return { err: true, message: err.message }
  }
}

export default handler
