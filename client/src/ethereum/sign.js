import * as secp from "ethereum-cryptography/secp256k1.js";
import * as keccak  from "ethereum-cryptography/keccak.js";
import * as utils  from "ethereum-cryptography/utils.js";

export function hashMessage(message) {
    const bytes = utils.utf8ToBytes(message);
    return keccak.keccak256(bytes);
}


export async function signMessage(msg, PRIVATE_KEY) {
    const msgHash = hashMessage(msg);
    const [signature, recoveryBit] = await secp.sign(msgHash, PRIVATE_KEY, { recovered: true } );
    return [utils.toHex(signature), recoveryBit];
    
}

export function getPublicKey(pvtKey) {
    return utils.toHex(secp.getPublicKey(pvtKey))
}
