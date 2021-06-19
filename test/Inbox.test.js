const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const web3 = new Web3(ganache.provider())

const INITIAL_STRING = 'Hi There!'
const UPDATE_STRING='bye'

const { interface, bytecode } = require('../compile')
let accounts
let inbox


beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts()
  // Use on of those accounts to deploy contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [INITIAL_STRING] })
    .send({ from: accounts[0], gas: '1000000' })
})


describe('Inbox', () => {
  it('Deployed contract', () => {
    // console.log(inbox)
    assert.ok(inbox.options.address)
    // console.log(inbox.options.address);
  })
  it('It has a default message', async () => {
    const message = await inbox.methods.message().call()
    assert.equal(message, INITIAL_STRING)
  })
  it('It sets message', async () => {
    await inbox.methods.setMessage(UPDATE_STRING).send({ from: accounts[0] })
    const message=await inbox.methods.message().call()
    assert.equal(message,UPDATE_STRING)
  })
})
