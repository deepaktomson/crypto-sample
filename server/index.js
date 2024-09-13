const express = require("express");
const app = express();
const cors = require("cors");
const { generateAccounts, ACCOUNTS } = require("./ethereum/generate");
const { recoverKey } = require("./ethereum/recoverKey");
const port = 3042;

generateAccounts(5)

console.log("ACCOUNTS: ", ACCOUNTS)

app.use(cors());
app.use(express.json());


app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = ACCOUNTS[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { tx, signature, recoveryBit, publicKey } = req.body;

  // recover key
  
  const recoveredKey = recoverKey(tx, signature, recoveryBit)
 
  if (recoveredKey !== publicKey) {
    res.status(401).send({ message: 'You are not authorized'})
    return;
  }
  const { sender, amount, recipient } = JSON.parse(tx)
  setInitialBalance(sender);
  setInitialBalance(recipient);
  if (ACCOUNTS[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    ACCOUNTS[sender] -= amount;
    ACCOUNTS[recipient] += amount;
    res.send({ balance: ACCOUNTS[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!ACCOUNTS[address]) {
    ACCOUNTS[address] = 0;
  }
}
