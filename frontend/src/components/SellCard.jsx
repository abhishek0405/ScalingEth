import {React, useState} from 'react';

import forebodingABI from "../contracts/ForebodingABI.json"
import {ethers} from "ethers"


const provider = new ethers.providers.Web3Provider(window.ethereum);



const SellCard = ({ title, description, imageUrl, tokenId }) => {


    const [price, setPrice] = useState()

  
  
  
  async function handleList(e){

    e.preventDefault()

    await provider.send("eth_requestAccounts", []);
    var signer = await provider.getSigner();
    const contract = new ethers.Contract('0x9eeF83ebA708c760b9D8f761835a47B9ff200722', forebodingABI, signer);
    
    const a = await contract.putUpForSale(tokenId, price)
    console.log(a)

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