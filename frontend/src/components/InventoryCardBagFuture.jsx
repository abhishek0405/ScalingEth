import {React, useState, useEffect } from 'react';
import forebodingABI from "../contracts/ForebodingABI.json"
import {ethers} from "ethers"
import SellCard from './SellCard'
import axios from 'axios';
import {Web3Storage} from 'web3.storage'
import Modal from 'react-modal';

const provider = new ethers.providers.Web3Provider(window.ethereum);



const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      minWidth: '25%',
      minHeight: '40%',
      background :'rgba(0,0,0,0.7)',
      color:'white',
      position: 'absolute',
      overflowX : 'hidden',
      overflowY : 'hidden',
      zIndex : 2
      
    },
  };
  

  Modal.setAppElement('#root');





const InventoryBagFuture = (props) => {
  



    const [ipfsData, setIpfsData] = useState([])
    const [modalIsOpen, setIsOpen] = useState(false);
    const [text, setText] = useState('')
    const [valid, setValid] = useState(null)
    const [tokenId, setTokenId] = useState(null)
    const [acc, setAcc] = useState(null)
    const [allTokens, setAllTokens] = useState([])
    let subtitle;

    const [loading, setLoading] = useState(true)

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


    
      

    function openModal(e, description, valid, tokenId ) {
        e.preventDefault()
        console.log("hello")
          setIsOpen(true);
          setText(description)
          setValid(valid)
          setTokenId(tokenId)
      }
      function afterOpenModal1() {
          // references are now sync'd and can be accessed.
          subtitle.style.color = '#f00';
      }
    
      function closeModal() {
    
          setIsOpen(false);
      }




      

      
      async function handleClick(e){
        e.preventDefault()
        const body = {
            tokenId:tokenId,
            tokenValidCount:valid,
            user:acc
        }
        console.log("use body",body)
        if(tokenId !== null){
            const res =  await axios.post('http://localhost:5000/check/checkUsedToken', body, {
                        withCredentials: true
                      })

            const isValid = res.data.isValid;
            console.log("isValid",isValid)
        
            if(isValid){
                if(props.handleUse){
                    await props.handleUse(e, tokenId, acc)
                    
                }
            }
            else{
                alert("This token usage has been exhausted")
            }
           
        }
        
        getData()

        
      }

      function countOccurrences(list, param) {
        let count = 0; 
        if(list.length !== 0){
            for (const item of list) {
                if (item === param) {
                  count++;
                }
              }
        }
        
        return count;
      }

      
      async function getData(){
        const data = []
        const finalData = []
        await provider.send("eth_requestAccounts", []);
        var signer = await provider.getSigner();
        const contract = new ethers.Contract('0x9eeF83ebA708c760b9D8f761835a47B9ff200722', forebodingABI, signer);

        const accounts =await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setAcc(accounts[0])
          console.log(accounts[0])
         
        const currTokens = await contract._tokenIds();
        
        for(var i = 0; i < parseInt(currTokens._hex, 16); i++){


                var own = await contract._tokenOwner(i)
                
                if(check(accounts[0], own)){
                    
                    var forSale = await contract._marketPlace(i)
                    console.log('for sale: ', forSale)
                    if(parseInt(forSale._hex,16) === 0){
                        var currData = await contract.tokenURI(i);
               
                        console.log(currData)
                        var response = await fetch(currData);
                        if(!response.ok)
                            throw new Error(response.statusText);
                           
                        var json = await response.json();
                        
                        Object.assign(json, {key : i})
                        Object.assign(json, {tokenId : i})

                        data.push(json)
                       

                    }
                }

            
                
            
        }
        fetch('http://localhost:5000/check/getUsedTokens?user='+accounts[0], {
            credentials : 'include'
        }).then(
            response => {return response.json()}
        
        ).then(
            dataRec => {
                console.log(dataRec.data)
                setAllTokens(dataRec)
                //console.log(typeof dataRec)
                for(var i = 0; i < data.length; i++){
                    console.log(parseInt(data[i].valid))
                    console.log('occurence: ', countOccurrences(dataRec.data, data[i].tokenId))

                    if(countOccurrences(dataRec.data, data[i].tokenId) < parseInt(data[i].valid)){
                        finalData.push(data[i])
                    }
                }
                setIpfsData(finalData)
                setLoading(false)
                
            }
        )
        
        

    }

    


    

    useEffect( () => {


        
        getData()
        
        
    }, [])


  return (


    <>
    <div className='login-modal'>

    <Modal
        isOpen={modalIsOpen}
        
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        className={'bg-discount-gradient parent'}
    >
        
            <div className='child'>
                {text} <br />
                <button className='btn-black' onClick={handleClick}>Use</button>  
            </div>
        
        
        

    </Modal>

</div>
         {(loading === true) ? (<p>Loading</p>) : (

                <>


                {
                    
                    ipfsData.map(d => {
                                    
                        return(
                            
                            <div className="inventory-bag">
                                {ipfsData.map(hintCard => (
                                <div key={hintCard.tokenId} className="hint-card" onClick={(event) => openModal(event, hintCard.description, hintCard.valid, hintCard.tokenId)}>
                                    {hintCard.title}
                                    
                                </div>
                                ))}
                            </div>
                       )

                      })
                }

                </>
               
            )
    }
 
    </>


  );
};

export default InventoryBagFuture;
