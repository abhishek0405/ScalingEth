import {React, useState, useEffect} from 'react';

//import forebodingABI from "../contracts/ForebodingABI.json"
import mantleABI from '../contracts/MantleMarketplace.json'
import Web3 from 'web3';
import {ethers} from "ethers"
import SellCard from './SellCard'
import Navbar from './Navbar';
import axios from 'axios'
import {Web3Storage} from 'web3.storage'

import { future_bg, skeleton, diary, opendiary, key, key_tag, openparchment, parchroll, paper_ball, open_paperball, hint } from "../assets";



const provider = new ethers.providers.Web3Provider(window.ethereum);



const MyCollection = () => {


    
    const [ipfsData, setIpfsData] = useState([])
    
    let subtitle;

    const client = new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGFBOEQ0QzMwNmI4ZjhjNjZCMTQyN2Y3NEIzZjlDNTI2YzE0RTFDRWEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjkwOTc5NDk3MjksIm5hbWUiOiJ5dXUifQ.t8HIerpToxPT9zgQzsZlAJeCWIBnZqlAaSOoZVkVUnw" })
    const [loading, setLoading] = useState(true)
    const [account,setAccount] = useState(null);

    function check(x, y){
        for(var i = 0; i < 42; i++){
            if(x[i].toLowerCase() !== y[i].toLowerCase()){
                console.log('x is ', x[i])
                console.log('y is ', y[i])
                return false
            }
        }
        return true
    }
    

    


    

    useEffect( () => {


        

        async function getData(){
            const data = []
            await provider.send("eth_requestAccounts", []);
            const accounts =await window.ethereum.request({
                method: "eth_requestAccounts",
              });
            setAccount(accounts[0]);


            const web3Instance = new Web3(window.ethereum);
            const chainId = await web3Instance.eth.getChainId();
        
            console.log(chainId)

            if (chainId === 5001) {
            var signer = await provider.getSigner();
            const contract = new ethers.Contract('0x22Cc03FaD19a7104841CE24E99F76fe769AEb016', mantleABI, signer);
            console.log("contract",contract);
            //const contract = new ethers.Contract('0x9eeF83ebA708c760b9D8f761835a47B9ff200722', forebodingABI, signer);

            const currTokens = await contract._tokenIds();
            

            for(var i = 0; i < parseInt(currTokens._hex, 16); i++){


                    var own = await contract._tokenOwner(i)
                    console.log(accounts[0])
                    console.log(own)
                    
                    if(check(accounts[0], own)){
                        
                        var forSale = await contract._marketPlace(i)
                        console.log('for sale: ', forSale)
                        if(parseInt(forSale._hex,16) === 0){
                            var currData = await contract.tokenURI(i);
                   
                            console.log(currData)
                            var response = await fetch(currData);
                            if(!response.ok)
                                throw new Error(response.statusText);
                                //console.log(response)
                                
                            

                            var json = await response.json();
                            console.log(json)
                            
                            Object.assign(json, {key : i})
                            Object.assign(json, {tokenId : i})

                            // eslint-disable-next-line no-loop-func
                            //setIpfsData(prevState => [...prevState, json])
                            data.push(json)
                            //console.log(data)

                        }
                    }
                
                    
                
            }
            console.log('data: ')
            console.log(data)
        
        let newData = []
        for(const obj of data){
                const tokenId = obj.tokenId;
                const tokenValidCount = obj.valid;
                const user =  accounts[0];
                console.log('account: ', accounts[0])
                const body = {
                    tokenId:tokenId,
                    tokenValidCount:tokenValidCount,
                    user:user
                }
                if(tokenId !== null){
                    const res =  await axios.post('http://localhost:5000/check/checkUsedToken', body, {
                                withCredentials: true
                              })

                    const isValid = res.data.isValid;
                    newData.push({...obj,isValid:isValid});
                }

        }
        
            
        setIpfsData(newData)
        
        setLoading(false)
        console.log("new",newData);
        console.log("ipfs2",ipfsData)
    }else{
        // alert('switch to mantle net on metamask')
    }
}
        
        
        getData()
    
    
        
        
    }, [])


  
  
  
  
  
  return(
    <>
    <Navbar />
            
            <div style={{ backgroundColor: 'black', color : 'white', height : '100%' }}>
            
          
            <div className="container">
            <div className="card-grid">

            {(loading === true) ? (<p>Loading</p>) : (

                <>

                

                {
                    
                    ipfsData.map(d => {
                    //   return (
                    //      <SellCard  title={d.title} description={d.description} imageUrl={hint} tokenId= {d.tokenId} key={d.key}  />
                    //   )
                         
                    // {d.isValid ? ( <SellCard  title={d.title} description={d.description} imageUrl={hint} tokenId= {d.tokenId} key={d.key}  />):(<></>)}
                     return(
                        <>
                        {d.isValid &&  <SellCard  title={d.title} description={d.description} imageUrl={hint} tokenId= {d.tokenId} key={d.key}  />}
                        {!d.isValid && <></>}
                        </>
                     )  

                      })
                }

                </>
               
            )
}


            
            
                
            </div>

            </div>
            </div>
        
            
        
        </>
  )}

export default MyCollection