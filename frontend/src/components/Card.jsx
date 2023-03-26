import React from 'react';

// import forebodingABI from "../contracts/ForebodingABI.json"
import mantleABI from '../contracts/MantleMarketplace.json'
import Web3 from 'web3';
import {ethers} from "ethers"


const provider = new ethers.providers.Web3Provider(window.ethereum);



const Card = ({ title, description, imageUrl, price, tokenId }) => {

  
  
  
  async function handleBuy(e){

    e.preventDefault()
    console.log("buying")
    await provider.send("eth_requestAccounts", []);
    const web3Instance = new Web3(window.ethereum);
    const chainId = await web3Instance.eth.getChainId();

    console.log(chainId)

    if (chainId === 5001) { 
      var signer = await provider.getSigner();
      console.log(signer)
      const contract = new ethers.Contract('0x22Cc03FaD19a7104841CE24E99F76fe769AEb016', mantleABI, signer);
      //const contract = new ethers.Contract('0x9eeF83ebA708c760b9D8f761835a47B9ff200722', forebodingABI, signer);
      console.log(tokenId)
      console.log(price)
      const a = await contract.buy(parseInt(tokenId), {value: price})
      console.log(a)
    }
    else{
      alert('switch to mantle')
    }

  }
  
  return(
    <div className="card">
      <img src={imageUrl} alt="" style={{width : '100px', height : '100px'}} />
      <div className="card-title">{title}</div>
      <div className="card-description">{description} {"Price: " + price}</div>

      <button onClick={handleBuy} style={{backgroundColor:'black'}}>Buy</button>
      
    </div>
  )}

export default Card