const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const { interface, bytecode } = require('./compile')
require('dotenv/config')

const provider = new HDWalletProvider(
  process.env.KEYPHRASE_WALLET,
  process.env.INFURA_KEY,
)

const web3 = new Web3(provider)

const deploy = async () => {
  const accounts = await web3.eth.getAccounts()
  // console.log(accounts)

  console.log('ATTEMPTING DEPLOY FROM', accounts[0])

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['HI THERE!'] })
    .send({ gas: '1000000', from: accounts[0] })

  console.log('CONTRACT DEPLOYED:', result.options.address)
}
deploy()
