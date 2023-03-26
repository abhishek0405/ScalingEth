import { useEffect, useState } from "react";

import axios from 'axios'
import CoinbaseWalletSDK from '@coinbase/wallet-sdk'
import Web3 from 'web3'

const Navbar =  () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const [walletAddress, setWalletAddress] = useState("Get Started");
  const [advertiserStatus, setAdvertiserStatus] = useState('')
  const [publisherStatus, setPublisherStatus] = useState('')
  const [accounts, setAccounts] = useState([]);
  const [web3, setWeb3] = useState(null);
    


  useEffect(() => {
    async function handleConnect(){
      if (window.ethereum) {
        try {
          // Request account access if needed
          //await window.ethereum.request({ method: 'eth_requestAccounts' });
          
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          // Get accounts
          const accounts = await web3Instance.eth.getAccounts();
          setAccounts(accounts);
        } catch (error) {
          console.error(error);
        }
      }

    }
    handleConnect()
    
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
            <a href={`#${"getStarted"}`}>{accounts[0]}</a>
          </li>
            
      </ul>

      
    </nav>
  );
};

export default Navbar;