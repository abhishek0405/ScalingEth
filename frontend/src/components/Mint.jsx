import React from 'react';

import { useState } from 'react';
import {Web3Storage} from 'web3.storage'
import Web3 from 'web3';

//import forebodingABI from "../contracts/ForebodingABI.json"
import mantleABI from '../contracts/MantleMarketplace.json'
import {ethers} from "ethers"
const provider = new ethers.providers.Web3Provider(window.ethereum);

//const contract = new ethers.Contract('0x35eab4F204a41f0D6349290709adB67c2584da1a', forebodingABI, provider);


const Mint = () => {

    
    const client = new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGFBOEQ0QzMwNmI4ZjhjNjZCMTQyN2Y3NEIzZjlDNTI2YzE0RTFDRWEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjkwOTc5NDk3MjksIm5hbWUiOiJ5dXUifQ.t8HIerpToxPT9zgQzsZlAJeCWIBnZqlAaSOoZVkVUnw" })


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [valid, setValid] = useState('');
    const [tokenId, setTokenId] = useState('')
    const [web3, setWeb3] = useState(null);
    const [price, setPrice] = useState('')
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    function makeFileObjects (obj, name) {
    
        const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' })
      
        const files = [
         
          new File([blob], name)
        ]
        return files
      }
    
      async function storeFiles (files) {
        
        const cid = await client.put(files)
        console.log('stored files with cid:', cid)
        return cid
      }



    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
    
        try {
          const data = {
            title,
            description,
            valid,
            price
          };
    
          var files = makeFileObjects(data, "data.json")
            console.log(files)
            var cid = await storeFiles(files)
            const ipfs_url = `https://${cid}.ipfs.w3s.link/data.json`
            console.log("content saved on: ", cid)

            try {
                // Call the mint() function on the contract
                const accounts =await window.ethereum.request({
                  method: "eth_requestAccounts",
                });
                console.log(accounts[0])

                const web3Instance = new Web3(window.ethereum);
                const chainId = await web3Instance.eth.getChainId();
          
                console.log(chainId)

                if (chainId === 5001) { 
                  
                  // await provider.send("eth_requestAccounts", []);
                  const signer = await provider.getSigner();
                  
                  //const contract = new ethers.Contract('0x9eeF83ebA708c760b9D8f761835a47B9ff200722', forebodingABI, signer);
                    const contract = new ethers.Contract('0x22Cc03FaD19a7104841CE24E99F76fe769AEb016', mantleABI, signer )
                  const tx = await contract.mint(ipfs_url, price, {});
                  const receipt = await tx.wait();
                  setSuccess(`Successfully minted new NFT with transaction hash: ${receipt.transactionHash}`);
                } else {
                  // alert('switch to mantle testnet');
                }

              } catch (e) {
                setError(e.message);
              }
          
        } catch (e) {
          setError(e.message);
        }
    
        setLoading(false);
      }



    
    
    
    return(
    <>
        <div>
            
        <form onSubmit={handleSubmit}>
        <h1 style={{fontSize : '50px'}}>Mint an NFT</h1>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />

            <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
            <input value={valid} onChange={e => setValid(e.target.value)} placeholder="Set valid for(number of hints)" />
            
            <input type={'number'} value={price} onChange={e => setPrice(e.target.value)} placeholder="Price (in Wei)" />
            <button type="submit" disabled={loading} style={{backgroundColor : 'grey'}}>Submit</button>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {success && <p style={{width : '100px'}}>{success}</p>}
        </form>

        </div>
    
    </>
  )

}

export default Mint