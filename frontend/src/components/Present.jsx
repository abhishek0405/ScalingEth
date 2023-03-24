
import React, { useState,useEffect,useContext} from 'react';

import { useLocation } from 'react-router-dom';
import SocketContext from "./SocketContext";
import './PresentRoomStyles.css'
import chemical from '../components/props/chemical.png'
import computer from '../components/props/computer.png'
import closedBox from '../components/props/closedBox.png'
import scissor from '../components/props/scissor.png'
import scissor_new from '../components/props/scissor_new.png'
import locker from '../components/props/locker.png'
import PresentRoom from "../components/PresentRoom"
import Bag from './Bag';
import InventoryBagPresent from './InventoryCardBagPresent';
import LaptopImg from '../components/props/laptop.png'
import Computer  from './Computer';
import Keypad from './Keypad';
import Chat from "./Chat";
import theme from "../assets/theme1.mp3"
 
 
  // const [isSocketSet,setisSocket] = useState(false)
  // const socket = useContext(SocketContext);
const Present = () => {
  const socket = useContext(SocketContext);
  
  console.log("socket here",socket);
  const location = useLocation();
  // console.log(location)
  const data = location.state;
  const username = data.username;
  const room = data.room;

  const [items, setItems] = useState([]);
  // const [username, setUsername] = useState("");
  // const [room, setRoom] = useState("");
 
 const [hint, setHint] = useState('Hint')
 const [isDocRetrieved, setIsDocRetrieved] = useState(false)
 const [isLockersUnlocked, setIsLockersUnlocked] = useState(false)
 const handleAddItem = (item) => {
    setItems([...items, item]);
  };
  const handleAddItemToBag = (item) => {
    const itemExists = items.find((i)=>i.name===item.name)
    if(!itemExists){
      setItems([...items, item]);
    }
   
  };

  useEffect(() => {
    //const data = location.state.data;
    //console.log(props.location.state)
    //console.log("props",location.state)
    //alert(props.location.state)
    console.log("socket") 
    console.log(socket)
  }, []);
  const handleRemoveFromBag = (itemName)=>{
    alert("hi")
    setItems(items.filter(function(_item){
      alert(_item.name)
      return _item.name !== itemName
    }))
  }
  // const onDragStartHandler = (event,keyType)=>{
  //   event.dataTransfer.setData("keyType",keyType)
  // }
  return (
    <>
    
   
    <div className='room'>
    <audio src={theme} loop="true" autoplay="true"></audio>
    <PresentRoom
      username={username}
      room={room}
      backgroundImage="https://wallpaperaccess.com/full/758571.jpg"
      lockers={[
        // {
        //   position: { x: 720, y:645 },
        //   size: { width: 70, height: 70 },
        //   image: scissor_new
        // },
        {
          position: { x: 670, y: 340 },
          size: { width: 30, height: 30 },
          image:locker
        },
        {
          position: { x: 700, y: 340 },
          size: { width: 30, height: 30 },
          image:locker
        },
        {
          position: { x: 730, y: 340 },
          size: { width: 30, height: 30 },
          image:locker
        },
        {
          position: { x: 670, y: 370 },
          size: { width: 30, height: 30 },
          image:locker
        },
        {
          position: { x: 700, y: 370 },
          size: { width: 30, height: 30 },
          image:locker
        },
        {
          position: { x: 730, y: 370 },
          size: { width: 30, height: 30 },
          image:locker
        },
        {
          position: { x: 670, y: 400 },
          size: { width: 30, height: 30 },
          image:locker
        },
        {
          position: { x: 700, y: 400 },
          size: { width: 30, height: 30 },
          image:locker
        },
        {
          position: { x: 730, y: 400 },
          size: { width: 30, height: 30 },
          image:locker
        },
        // {
        //   position: { x: 800, y: 480 },
        //   size: { width: 110, height: 100 },
        //   image: chemical
        // },
        // {
        //   position: { x: 100, y: 490 },
        //   size: { width: 300, height: 300 },
        //   image: computer
        // }
      ]} onAddItemToBag={handleAddItemToBag} onRemoveItemFromBag = {handleRemoveFromBag}
      
      
    />
     
   
    <Bag items={items} />
    
    
      {/* <button className="app__button" onClick={() => handleAddItem({ name: 'Item 2', image: scissor })}>
        Add Item
      </button> */}
    
     
     </div>
     {/* <Computer image={LaptopImg}></Computer> */}
     <div>
      <h1>Present</h1>
      
    </div>
      
     
    
    </>
    
    
  )};

export default Present;
