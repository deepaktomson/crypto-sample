const secp256k1 = require("ethereum-cryptography/secp256k1")
const utils = require("ethereum-cryptography/utils")
const keccak = require("ethereum-cryptography/keccak")

const ACCOUNTS = {}

const generatePrivateKey = () => {
    return secp256k1.utils.randomPrivateKey()
}

const generateAccounts = N => {
    for(let i = 0; i < N; i++) {
        const pvtKey = generatePrivateKey()
        const publicKey = secp256k1.getPublicKey(pvtKey)
        const publicKeyhash = utils.toHex(keccak.keccak256(publicKey))
        const address = publicKeyhash.slice(-20)

        ACCOUNTS[address.toString()] = 10 + Math.round(Math.random() * 90)
    }
}


module.exports = {
    ACCOUNTS,
    generateAccounts
}