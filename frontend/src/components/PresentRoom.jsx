import React, { useState,useContext } from 'react';
import './PresentRoomStyles.css'
import Keypad from './Keypad';
import SocketContext from "./SocketContext";
import locker_117 from '../components/props/117_locker.png'
import locker_204 from '../components/props/204_locker.png'
import locker_359 from '../components/props/359_locker.png'
import locker_593 from '../components/props/593_locker.png'
import locker_862 from '../components/props/862_locker.png'
import locked_lock from '../components/props/locked_lock.png'
import empty_locker from '../components/props/empty_locker.png'
import key_117 from '../components/props/key_117.png'
import key_204 from '../components/props/key_204.png'
import key_359 from '../components/props/key_359.png'
import key_593 from '../components/props/key_593.png'
import key_862 from '../components/props/key_862.png'
import red_siren from '../components/props/red_siren.png'
import green_siren from '../components/props/green_siren.png'
import axios from 'axios'

import LaptopImg from '../components/props/laptop.png'
import Computer  from './Computer';
import InventoryBagPresent from './InventoryCardBagPresent';
import Chat from "./Chat";
import phone from "../assets/phone.png"
//import { Redirect } from 'react-router-dom';

import { useNavigate } from "react-router-dom";
const PresentRoom = ({ username,room,backgroundImage, lockers, onAddItemToBag,onItemRemoveFromBag }) => {
  const socket = useContext(SocketContext);
    const [zoomedObject, setZoomedObject] = useState(null);
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [chosenLocker,setChosenLocker]=useState(null)
    const [chosenKey,setChosenKey]=useState(null)
    const [chosenKeyName,setChosenKeyName]=useState('')
    const [sirenImg,setSirenImg] = useState(red_siren)
    const [chosenKeys,setChosenKeys] = useState([])
    const [lockOpen, setLockOpen] = useState(false);
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [isLockerOpen, setIsLockerOpen] = useState(false)
    const [hint, setHint] =useState('Hint')
    const [laptopCorrect, isLaptopCorrect] = useState(false)
    const [showChat,setShowChat] = useState(false);






    const handleUse = (tokenId, owner ) => {
      console.log('tokenId: ', tokenId)
    console.log('owner: ', owner)
    
    var d = {}
      d.tokenId = tokenId
      d.user = owner
      console.log(isLockerOpen)
      console.log(isPasswordCorrect)


      if(isLockerOpen === true){
        const newHint = 'Choose the correct key from the lockers. Get this information from the Future player';
        if(hint===newHint){
          return;
        }
        setHint(newHint)
      }
      else if(isLockerOpen === false && laptopCorrect === true){
        console.log('hi')
        const newHint = 'Type in the correct locker password to unlock them. Get the cipher text from Future player';
        if(hint===newHint){
          return;
        }
        setHint(newHint)
      }
      else if(laptopCorrect === false ){
        const newHint = 'Use the password given in a diary in the Future side.';
        if(hint===newHint){
          return;
        }
        setHint(newHint)
      }
    
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

    const navigate = useNavigate();
    const handleModelClose = () => {
      setIsModelOpen(false);
     
    };
    const onDragOverHandler = (event) => {
      event.preventDefault();
    };
    const onDropHandler = (event) => {
      //event.preventDefault();
      //alert(event.dataTransfer.getData("keyType"))
      setShouldRedirect(true);
      // if (shouldRedirect) {
      //   return <Redirect to="/some/path" />;
      // }
      const keyType = event.dataTransfer.getData("keyType");
      if (keyType === "correctKey") {
        navigate('/danger',{state: { username: username,room:room}});
        setLockOpen(true);
        //check this
        onItemRemoveFromBag('key117');
       
      }
      
    };
    function handlePasswordCorrect() {
      setSirenImg(green_siren)
      setIsLockerOpen(true)
      setIsPasswordCorrect(true);
    }
    const handleObjectDoubleClick = (event, img, name) => {
        // Add the object to the bag
        //console.log(lockers[index])
        const item = {}
        item.image = img;
        item.name=name;
        setChosenKeys([name,...chosenKeys])
        onAddItemToBag(item);
      };
      const handleLockerClick = ()=>{
        
      }

      const handleCorrect = (e) => {

        isLaptopCorrect(true)

      }
      
    return (
      <>

     
      <Keypad onPasswordCorrect={handlePasswordCorrect} image="https://thumbs.dreamstime.com/b/alphabet-keypad-parking-meter-pay-machine-also-has-words-cancel-ok-them-numbers-49482354.jpg"></Keypad>
      <div className="room">
       
      {lockOpen===false?
      <img src={locked_lock} class='room__object'style={{height:'20px',width:'20px',top:'470px',left:'440px',zIndex:2}} onDragOver={onDragOverHandler} onDrop={onDropHandler}></img>
      :
      <img></img>} 
      <img src={sirenImg} class='room__object'style={{height:'20px',width:'20px',top:'310px',left:'708px'}}></img>

        <img src={backgroundImage} alt="room" className="room__image" />
        
<Computer handleCorrect = {handleCorrect} />

      
        <div style={{
      position: 'absolute',
      top: 650,
      left: 0,
     
      minWidth: '200px',
      height: '50px',
      backgroundColor: 'red',
      opacity : 0.4,
      color : 'white'
    }}>
      {hint}
    </div>
        
        {lockers.map((object, index) => (
        
          <div
            key={index}
            className={`room__object ${index === zoomedObject ? 'zoomed' : ''}`}
            style={{
              top: object.position.y,
              left: object.position.x,
              width: object.size.width,
              height: object.size.height
            }}
            onClick={isPasswordCorrect ? (()=>{
              if(index===0){
                const keyExists = chosenKeys.find((key)=>key==='key862')
                if(keyExists){
                 setChosenLocker(empty_locker)
                }
                else{
                  setChosenLocker(locker_862);
                }
                setChosenKey(key_862)
                setChosenKeyName('key862')
              }
              else if(index===2){
                const keyExists = chosenKeys.find((key)=>key==='key593')
                if(keyExists){
                 setChosenLocker(empty_locker)
                }
                else{
                  setChosenLocker(locker_593);
                }
                setChosenKey(key_593)
                setChosenKeyName('key593')
              }
              else if(index===4){
                const keyExists = chosenKeys.find((key)=>key==='key359')
                if(keyExists){
                 setChosenLocker(empty_locker)
                }
                else{
                  setChosenLocker(locker_359);
                }
                setChosenKey(key_359)
                setChosenKeyName('key359')
              }
              else if(index===6){
                const keyExists = chosenKeys.find((key)=>key==='key204')
                if(keyExists){
                 setChosenLocker(empty_locker)
                }
                else{
                  setChosenLocker(locker_204);
                }
                setChosenKey(key_204)
                setChosenKeyName('key204')
              }
              else if(index===8){
                const keyExists = chosenKeys.find((key)=>key==='key117')
                if(keyExists){
                 setChosenLocker(empty_locker)
                }
                else{
                  setChosenLocker(locker_117);
                }
   
                
                setChosenKey(key_117);
                setChosenKeyName('key117');
              }
              else{
                setChosenKey(null);
                setChosenKeyName('');
                setChosenLocker(empty_locker)
              }
              setIsModelOpen(true);
              //setZoomedObject(index === zoomedObject ? null : index);
            }) : () => {}}
            // s
            // onDoubleClick={isPasswordCorrect?(event) => handleObjectDoubleClick(event, index):()=>{}}
          >
            
            <img src={object.image} alt="object" className="room__object-image" />
          </div>
        ))}

        {isModelOpen && (
       <div className="keypad" >
          <div className="keypad__model">
          <img src={chosenLocker} style={{width:"100%",height:"100%"}}  onDoubleClick={(event) => 
            {
              handleObjectDoubleClick(event, chosenKey,chosenKeyName);
            
              setChosenLocker(empty_locker)
              
            
              
          }}></img>
          <button onClick={handleModelClose}>Close</button>
          </div>
          </div>
        )}

    
      
        
      </div>
      
      <InventoryBagPresent handleUse = {handleUse} />
      
     
      
      {showChat ? (
        <div style={{position:'absolute',left:"83%",top:"350px",zIndex:5}}>
      <Chat socket={socket} username={username} room={room} />
      </div>
         
       
      ) : (
         <img src={phone} onClick = {()=>{setShowChat(true)}}style={{position:"absolute",left:"450px",width:"30px",height:"30px",top:"525px"}}></img>
      )}
    
      </>
    );
    
  };

export default PresentRoom;
