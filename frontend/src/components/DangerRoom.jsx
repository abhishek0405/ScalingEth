

import axios from 'axios';
import React from 'react';

import {useState, useEffect,useContext} from 'react'
import Modal from 'react-modal';
import { useLocation } from 'react-router-dom';
import { future_bg, skeleton, diary, opendiary, key, key_tag, openparchment, parchroll, danger_room, red_flask, blue_flask, green_flask, virus } from "../assets";

import DangerBag from './DangerBag';
import InventoryBag from './InventoryCardBag';
import Chat from "./Chat";
import SocketContext from "./SocketContext";
import NFTABI from '../contracts/NFTABI.json'
import {ethers} from "ethers"
import "../components/PresentRoomStyles.css"
import {Web3Storage} from 'web3.storage'

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
      background :'rgba(0,0,0,0)',
      position: 'absolute',
      overflowX : 'hidden',
      overflowY : 'hidden',
      outline : 'none'
      
      
      
    },
  };
  

  Modal.setAppElement('#root');





function DangerRoom () {
  const socket = useContext(SocketContext);

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalOneIsOpen, setOneIsOpen] = React.useState(false);
    const [modalTwoIsOpen, setTwoIsOpen] = React.useState(false);
    const [success, setSuccess] = useState('')
    const [items, setItems] = useState([]);
    const location = useLocation();
    const username = location.state.username;
    const room = location.state.room;
    // const data = location.state.data;
    
    const client = new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGFBOEQ0QzMwNmI4ZjhjNjZCMTQyN2Y3NEIzZjlDNTI2YzE0RTFDRWEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjkwOTc5NDk3MjksIm5hbWUiOiJ5dXUifQ.t8HIerpToxPT9zgQzsZlAJeCWIBnZqlAaSOoZVkVUnw" })

    console.log("danger loc")
    console.log(location)
 
 
    let subtitle;
    const [isVisibleRed, setIsVisibleRed] = useState(true);
    const [isVisibleBlue, setIsVisibleBlue] = useState(true);
    const [isVisibleGreen, setIsVisibleGreen] = useState(true);
    const [isVirusDestroyed, setVirusDestroyed] = useState(false)
    const [hint, setHint] = useState('Hint')

    const expectedOrder = ['red', 'green', 'blue'];
    let droppedChemicals = 0;


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



    const handleUse = (tokenId, owner) => {
      console.log('tokenId: ', tokenId)
      console.log('owner: ', owner)
      if(isVirusDestroyed === false){
        const newHint = 'select the flasks and put them in your bag. pour in correct order on the virus.';
        if(hint===newHint){
          return;
        }
        setHint(newHint)
      }
      var d = {}
        d.tokenId = tokenId
        d.user = owner
      
      if(tokenId !== null && owner !== null){

        axios.post('http://localhost:5000/check/addUsedToken', d, {
        withCredentials: true
      })
      .then(res=> {console.log(res.data)
          if(res.data.status === 'error'){
              console.log('here')
              
          }
          else{
            console.log('succesfully added')
          }
      
      })
      .catch(err=>console.log(err.response.data));

      }

      
    }
    



    const handleAddItemToBag = (item) => {
      const itemExists = items.find((i)=>i.name===item.name)
      if(!itemExists){
        setItems([...items, item]);
      }
     
    };
    const handleRemoveFromBag = (itemName)=>{
      alert("hi")
      setItems(items.filter(function(_item){
        alert(_item.name)
        return _item.name !== itemName
      }))
    }


    const onDragOverHandler = (event) => {
      event.preventDefault();
    };
    

    const handleObjectDoubleClick = (event, img, name) => {
      
      const item = {}
      item.image = img;
      item.name=name;
      
      handleAddItemToBag(item);
    };

    

      

  function openModal(e) {
    e.preventDefault()
    console.log("hello")
      setIsOpen(true);
  }
  function afterOpenModal1() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#f00';
  }

  function closeModal() {

      setIsOpen(false);
  }


  async function openModalOne(e) {
    e.preventDefault()
    console.log("hello")
    const accounts =await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log(accounts[0])

    
    await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();

  const contract = new ethers.Contract('0xABC3c9cC5A0B019fb42cd00e62693446D92FaEC8', NFTABI, signer);


    const tx1 = await contract.getAll(accounts[0]);
    console.log(tx1)
    var x = 0

    for(var i = 0; i < tx1.length; i++){
      if(parseInt(tx1[i]._hex, 16) !== 0){
        x = 1
        break
      }
    }

    if(x === 0){

      var files = makeFileObjects({
        name : 'virus game solved',
        solvedBy : accounts[0]
      }, "data.json")
      console.log(files)
      var cid = await storeFiles(files)
      const ipfs_url = `https://${cid}.ipfs.w3s.link/data.json`
      console.log("content saved on: ", cid)
  
      
    const tx = await contract.mint(ipfs_url, {});
    const receipt = await tx.wait();
    console.log(receipt.transactionHash)
   
    setSuccess('Congratulations you earned an NFT - beginner star!!')
    //setSuccess(`Successfully minted new NFT with transaction hash: ${receipt.transactionHash}`);
  

    }


    

      setOneIsOpen(true);
  }
  function afterOpenModalOne() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#f00';
  }

  function closeModalOne() {

      setOneIsOpen(false);
  }



      function MouseOver(event) {
        event.target.style.cursor = 'pointer';
      }
      function MouseOut(event){
        event.target.style.background="";
      }
          


    return (
        <>
       
        <div style={{overflowX : 'hidden', overflow: 'hidden' ,position : 'fixed'}}>
        <img src={danger_room} alt=""  />
        <div style={{
      position: 'absolute',
      left: 0,
      bottom: 150,
      minWidth: '200px',
      height: '50px',
      backgroundColor: 'red',
      opacity : 0.4,
      color : 'white'
    }}>
      {hint}
    </div>
        
        </div>

       



        <div className='login-modal'>


        <div onMouseOver={MouseOver} onMouseOut={MouseOut} >
            <h1 style={{color : 'rgba(0, 0, 0, 1)', position : 'absolute', top : '450px', left : '400px', msUserSelect : 'none', MozUserSelect: "none",
WebkitUserSelect: "none"}} >
  
  {
    isVisibleRed && (
      <img src={red_flask} style={{width : '150px', height : '100px'}}  alt="" onDoubleClick={(event) => 
        {
          handleObjectDoubleClick(event, red_flask,'red_flask');
          setIsVisibleRed(false)
        
          
          
        
          
      }} />
    )
  }
  
  
  
  
  </h1>
        </div>
        
        

           </div> 



           <div className='login-modal'>


        <div onMouseOver={MouseOver} onMouseOut={MouseOut} >
            <h1 style={{color : 'rgba(0, 0, 0, 1)', position : 'absolute', top : '265px', left : '1000px', msUserSelect : 'none', MozUserSelect: "none",
WebkitUserSelect: "none"}} >
  
  {
    isVisibleBlue && (
      <img src={blue_flask} style={{width : '50px', height : '50px'}}  alt="" onDoubleClick={(event) => 
        {
          handleObjectDoubleClick(event, blue_flask,'blue_flask');
          setIsVisibleBlue(false)
          
          
        
          
      }} />
    )
  }
  
  
  </h1>
        </div>
        
        

           </div>





           <div className='login-modal'>


        <div onMouseOver={MouseOver} onMouseOut={MouseOut} >
                    <h1 style={{color : 'rgba(0, 0, 0, 1)', position : 'absolute', top : '260px', left : '120px', msUserSelect : 'none', MozUserSelect: "none",
        WebkitUserSelect: "none"}} >
          
          {
            isVisibleGreen && (
              <img src={green_flask} style={{width : '50px', height : '40px'}}  alt=""  onDoubleClick={(event) => 
                {
                  handleObjectDoubleClick(event, green_flask,'green_flask');
                  setIsVisibleGreen(false)
                  
                  
                
                  
              }}/>
            )
          }
          
          
          
          </h1>
        </div>
        
        

           </div>





           <div className='login-modal'>



           <Modal
               isOpen={modalIsOpen}
               
               onRequestClose={closeModal}
               style={customStyles}
               contentLabel="Example Modal"
               className={'bg-discount-gradient'}
           >
            <div style={{width:"300px",height:"200px",color:'white',backgroundColor:'rgba(0,0,0,0.7)'}}>
            
           <h1 style={{position:"absolute",top:"25%",left:"25%"}}>Incorrect order!</h1>
          
           </div>
            </Modal>


            <Modal
               isOpen={modalOneIsOpen}
               
               onRequestClose={closeModalOne}
               style={customStyles}
               contentLabel="Example Modal"
               className={'bg-discount-gradient'}
           >
             <div style={{width:"300px",height:"200px",color:'white',backgroundColor:'rgba(0,0,0,0.7)'}}>
            
            <h1> 
              
              Congratulations !!! <p> You have saved the world!
                </p></h1>
           
            </div>
          
           {success}
            </Modal>


        <div onMouseOver={MouseOver} onMouseOut={MouseOut} >

                    <h1 style={{color : 'rgba(0, 0, 0, 1)', position : 'absolute', top : '440px', left : '670px', msUserSelect : 'none', MozUserSelect: "none",
        WebkitUserSelect: "none"}} >
          
          
          <img src={virus} style={{width : '50px', height : '50px'}}  alt="" 
          
          onDrop={event => {
            console.log('dropped')
            console.log(event.dataTransfer.getData('flask'))
            event.preventDefault();

            const data = event.dataTransfer.getData('flask');
            if (data !== expectedOrder[droppedChemicals]) {
              //console.error('Incorrect order!');
              openModal(event)
              return;
            }
            //event.target.appendChild(document.getElementById(data));
            droppedChemicals += 1;
            if(droppedChemicals === 3){
              openModalOne(event)
              setVirusDestroyed(true)

            }
          }}
          onDragOver={event => {
            event.preventDefault();
          }}
        
        
        
        /></h1>
        </div>
        
        

           </div>  
           <DangerBag items={items} />
           <InventoryBag handleUse={handleUse} />
           {socket ? (
        <div style={{position:'absolute',left:"83%",top:"350px",zIndex:5}}>
      <Chat socket={socket} username={username} room={room} />
      </div>
         
       
      ) : (
        <></>
      )}
        </> 
    )


}


export default DangerRoom 