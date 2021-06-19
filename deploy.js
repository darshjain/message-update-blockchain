const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const { interface, bytecode } = require('./compile')

const provider = new HDWalletProvider(
  'smoke canoe club mule retreat suspect unique abandon lion clarify dish pulse',
  'https://rinkeby.infura.io/v3/3a4fe6fd68534f858f1f393b0a8f322d',
)

const web3 = new Web3(provider)

const deploy = async () => {
  const accounts = await web3.eth.getAccounts()
    // console.log(accounts)
    
  console.log('ATTEMPTING DEPLOY FROM', accounts[0])

   const result=  await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['HI THERE!'] }).send({ gas: '1000000', from: accounts[0] });

    console.log("CONTRACT DEPLOYED:",result.options.address);
};
deploy();
