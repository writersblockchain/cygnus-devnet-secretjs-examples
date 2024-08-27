import { SecretNetworkClient, Wallet, TxResultCode,  } from "secretjs";
import * as fs from "fs";
import dotenv from "dotenv"
dotenv.config()

const wallet = new Wallet(
process.env.MNEMONIC
);

const contract_wasm = fs.readFileSync("../contract.wasm.gz");

const secretjs = new SecretNetworkClient({
  chainId: "secretdev-1",
  url: "http://20.121.117.166:1317",
  wallet: wallet,
  walletAddress: wallet.address,
});

let storeContract = async () => { 

  // Store the contract code
  const txStore = await secretjs.tx.compute.storeCode(
    {
      sender: wallet.address,
      wasm_byte_code: contract_wasm, 
      source: "",
      builder: "",
    },
    {
      gasLimit: 5_000_000,
    }
  );

  console.log(txStore);

//   // Check if the transaction was successful
//   if (txStore.code !== TxResultCode.Success) {
//     console.error(txStore.rawLog);
//   }

//   // Ensure that the transaction was successful
//   if (txStore.code !== TxResultCode.Success) {
//     throw new Error(`Failed to store contract: ${txStore.rawLog}`);
//   }

//   // Extract the code_id from the transaction events
//  const code_id = Number(getValueFromEvents(txStore.events, "message.code_id"));
// console.log("code_id: ", code_id);


}
// storeContract();

let getCodehash = async () => {

  let code_id = 7;

    // Query the code hash
const { code_hash } = await secretjs.query.compute.codeHashByCodeId({
        code_id: code_id,
      });
      console.log("code_hash: ", code_hash);
}
// getCodehash();

let initContract = async () => {

  let code_id = 7;
  let code_hash = "b94ef8b7dadafa725f02a0a499de5f7853db74b7084af659d8ed11e237d28deb"; 

  // Instantiate the contract
  const txInit = await secretjs.tx.compute.instantiateContract(
    {
      sender: wallet.address,
      code_id: code_id,
      code_hash: code_hash,
      init_msg: {flip: 0},
      label: `label-${Date.now()}`,
      init_funds: [],
    },
    {
      gasLimit: 5_000_000,
    }
  );

  console.log(txInit);

//   // Check if the transaction was successful
//   if (txInit.code !== TxResultCode.Success) {
//     console.error(txInit.rawLog);
//     throw new Error(`Failed to instantiate contract: ${txInit.rawLog}`);
//   }

//   // Verify the action in the events
//   const action = getValueFromEvents(txInit.events, "message.action");
//   if (action !== "/secret.compute.v1beta1.MsgInstantiateContract") {
//     throw new Error(`Unexpected action: ${action}`);
//   }

//   // Return the contract address from the events
// console.log(getValueFromEvents(txInit.events, "message.contract_address"));
}

initContract();

// helper functions 
function getValueFromEvents(events, key) {
  if (!events) {
    return "";
  }

  for (const e of events) {
    for (const a of e.attributes) {
      if (`${e.type}.${a.key}` === key) {
        return String(a.value);
      }
    }
  }

  return "";
}

