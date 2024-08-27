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

const queryFlip = async () => {
    const flip_query = await secretjs.query.compute.queryContract({
      contract_address: process.env.SECRET_CONTRACT_ADDRESS,
      code_hash: process.env.SECRET_CONTRACT_CODE_HASH,
      query: {
        get_flip: {},
      },
    });
    console.log(flip_query);
  };
  
  queryFlip();