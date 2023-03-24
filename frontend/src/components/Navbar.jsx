import { useEffect, useState } from "react";

import axios from 'axios'
import CoinbaseWalletSDK from '@coinbase/wallet-sdk'
import Web3 from 'web3'

const Navbar =  () => {
  const [active, setActive] = useState("Home");
  const [walletAddress, setWalletAddress] = useState("Get Started");
  


  

const APP_NAME = 'My Awesome App'
const APP_LOGO_URL = 'https://example.com/logo.png'
const DEFAULT_ETH_JSONRPC_URL = `https://${process.env.NODE_USERNAME}:${process.env.NODE_PASSWORD}@mainnet.ethereum.coinbasecloud.net`
const DEFAULT_CHAIN_ID = 1

// Initialize Coinbase Wallet SDK
const coinbaseWallet = new CoinbaseWalletSDK({
  appName: APP_NAME,
  appLogoUrl: APP_LOGO_URL,
  darkMode: false
})

// Initialize a Web3 Provider object
const ethereum = coinbaseWallet.makeWeb3Provider(DEFAULT_ETH_JSONRPC_URL, DEFAULT_CHAIN_ID)

// Initialize a Web3 object
const web3 = new Web3(ethereum)
  

  useEffect(() => {
    ethereum.request({ method: 'eth_requestAccounts' }).then(response => {
        const accounts = response;
        console.log(`User's address is ${accounts[0]}`)
        setWalletAddress(accounts[0])
      
        // Optionally, have the default account set for web3.js
        web3.eth.defaultAccount = accounts[0]
      })
      
      // Alternatively, you can use ethereum.enable()
      ethereum.enable().then((accounts) => {
        console.log(`User's address is ${accounts[0]}`)
        web3.eth.defaultAccount = accounts[0]
      })
    
  }, []);
  

  return (
    <nav  className="navbar dark-theme"
    
    >
     
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        
          <li
            key={"home"}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === "Home" ? "text-white" : "text-dimWhite"
            } mr-10`}
            onClick={() => setActive("Home")}
          >
            <a href={`/`}>{"Home"}</a>
          </li>


          <li
            key={"marketplace"}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === "Home" ? "text-white" : "text-dimWhite"
            } mr-10`}
            onClick={() => setActive("Marketplace")}
          >
            <a href={`/marketplace`}>{"Marketplace"}</a>
          </li>

          <li
            key={"myCollection"}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === "My Collection" ? "text-white" : "text-dimWhite"
            } mr-10`}
            onClick={() => setActive("myCollection")}
          >
            <a href={`/myCollection`}>{"My Collection"}</a>
          </li>

          <li
            key={"myBadges"}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === "My Badges" ? "text-white" : "text-dimWhite"
            } mr-10`}
            onClick={() => setActive("myBadges")}
          >
            <a href={`/myBadges`}>{"My Badges"}</a>
          </li>


          
          <li
            key={"getStarted"}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === "Get Started" ? "text-white" : "text-dimWhite"
            } mr-10`}
            onClick={() => setActive("Get Started")}
          >
            <a href={`#${"getStarted"}`}>{walletAddress}</a>
          </li>
            
      </ul>

      
    </nav>
  );
};

export default Navbar;
