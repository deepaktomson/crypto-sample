import * as secp256k1 from "ethereum-cryptography/secp256k1.js"
import * as utils from "ethereum-cryptography/utils.js"
import * as keccak from "ethereum-cryptography/keccak.js"

export const ACCOUNTS = {}

const generatePrivateKey = () => {
    return secp256k1.utils.randomPrivateKey()
}

export const generateAccounts = N => {
    for(let i = 0; i < N; i++) {
        const pvtKey = generatePrivateKey()
        const publicKey = secp256k1.getPublicKey(pvtKey)
        const publicKeyhash = utils.toHex(keccak.keccak256(publicKey))
        const address = publicKeyhash.slice(-20)
        
        ACCOUNTS[address.toString()] = 10 + Math.round(Math.random() * 90)
    }
}



// generateAccounts(5);

// console.log("Acounts: ", ACCOUNTS)