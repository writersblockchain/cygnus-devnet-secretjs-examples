import { SecretNetworkClient, Wallet  } from "secretjs";
import dotenv from "dotenv"
dotenv.config()

const wallet = new Wallet(
    process.env.MNEMONIC
    );

const secretjs = new SecretNetworkClient({
    chainId: "secretdev-1",
    url: "http://20.121.117.166:1317",
    wallet: wallet,
    walletAddress: wallet.address,
  });

  let executeFlip = async () => {
        const flip_tx = await secretjs.tx.compute.executeContract(
            {
              sender: wallet.address,
              contract_address: process.env.SECRET_CONTRACT_ADDRESS,
              msg: {
                flip: {},
              },
              code_hash: process.env.SECRET_CONTRACT_CODE_HASH,
            },
            { gasLimit: 100_000 }
          );
        
          console.log(flip_tx);
        };
        

    executeFlip();