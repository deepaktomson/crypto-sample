const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");

function hashMessage(message) {
    const bytes = utf8ToBytes(message);
    return keccak256(bytes);
}


function recoverKey(message, signature, recoveryBit) {
    const msgHash = hashMessage(message);
    return toHex(secp.recoverPublicKey(msgHash, signature, recoveryBit))
    
}

module.exports = {
    hashMessage,
    recoverKey
}