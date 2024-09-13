import { useState } from "react";
import server from "./server";
import { getPublicKey, signMessage } from "./ethereum/sign";

function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {
      const msg = {
        sender: address, recipient, amount: parseInt(sendAmount)
      }
      const tx = JSON.stringify(msg)
      console.log(`VITE_${address}`, import.meta.env[`VITE_${address}`])
      const [signature, recoveryBit] = await signMessage(tx, import.meta.env[`VITE_${address}`])
      console.log(signature)
      const {
        data: { balance },
      } = await server.post(`send`, {
        tx,
        signature,
        recoveryBit,
        publicKey: getPublicKey(import.meta.env[`VITE_${address}`])
      });
      setBalance(balance);
      alert("Transfer success")
    } catch (ex) {
      console.log(ex)
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
