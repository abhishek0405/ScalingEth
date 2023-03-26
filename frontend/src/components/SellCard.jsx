import {React, useState} from 'react';

//import forebodingABI from "../contracts/ForebodingABI.json"
import mantleABI from '../contracts/MantleMarketplace.json'
import Web3 from 'web3';
import {ethers} from "ethers"


const provider = new ethers.providers.Web3Provider(window.ethereum);



const SellCard = ({ title, description, imageUrl, tokenId }) => {


    const [price, setPrice] = useState()

  
  
  
  async function handleList(e){

    e.preventDefault()

    await provider.send("eth_requestAccounts", []);
    const web3Instance = new Web3(window.ethereum);
    const chainId = await web3Instance.eth.getChainId();

    console.log(chainId)

    if (chainId === 5001) { 
      var signer = await provider.getSigner();
      const contract = new ethers.Contract('0x22Cc03FaD19a7104841CE24E99F76fe769AEb016', mantleABI, signer);
      console.log("contract",contract);
    //const contract = new ethers.Contract('0x9eeF83ebA708c760b9D8f761835a47B9ff200722', forebodingABI, signer);
    
    const a = await contract.putUpForSale(tokenId, price)
    console.log(a)
    }else{
      // alert('switch to mantle on metamask')
    }

  }
  
  return(
    <div className="card">
      <img src={imageUrl} alt="" style={{width : '100px', height : '100px'}} />
      <div className="card-title">{title}</div>
      <div className="card-description">{description} {"Price: " + price}</div>


        <input type="number" placeholder='Enter price in Wei' value={price} onChange={e => setPrice(e.target.value)} />
      <button onClick={handleList} style={{backgroundColor:'black'}}>List</button>
      
    </div>
  )}

export default SellCard