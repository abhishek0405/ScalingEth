

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import {
  BrowserRouter as Router,
  Link
}  from "react-router-dom";
import {useState, useEffect} from 'react'
import Navbar from './Navbar';

import Web3 from 'web3'
import './PresentRoomStyles.css'
import Chat from "./Chat";
// import "../components/Chat.css"
import io from "socket.io-client";
import SocketContext from "./SocketContext";

import { landing_bg } from '../assets';


function Landing () {

    const navigate = useNavigate();
    // const { socket } = useSocket();
    const [isPresentModelOpen, setIsPresentModelOpen] = useState(false);
    const [isFutureModelOpen, setIsFutureModelOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);
    const [accounts, setAccounts] = useState([]);
    const [web3, setWeb3] = useState(null);
    
    const socket = useContext(SocketContext);
    console.log("socket",socket);
    useEffect(() => {
      async function handleConnect(){
        if (window.ethereum) {
          try {
            // Request account access if needed
            await window.ethereum.request({ method: 'eth_requestAccounts' });
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
    const joinRoom = () => {
       
        if (username !== "" && room !== "") {
         socket.emit("join_room", room);
         
          setShowChat(true);
          const obj = {
            name:"abhishek",
            age:21
          }
          //navigate('/present', { state: { data:obj } });
      
        //console.log(socket)

        }
        
      };

      // const handleModelClose = () => {
      //   setIsPresentModelOpen(false);
      //   set
      // };
    
      



    return (
        
       <>

            <Navbar />
            <div className='landing-page'>
            <img src={landing_bg} alt=""  />
                <div className="foreboding-text">Foreboding</div>
                <button className="wallet-button" >Connect Your Wallet</button>

                <a href="#" style={{position : 'absolute', top : '80%', left : '30%', fontSize : '30px', }} onClick={()=>{setIsPresentModelOpen(true)}}>Present</a>
                <a href="#" style={{position : 'absolute', top : '80%', left : '65%', fontSize : '30px', }} onClick={()=>{setIsFutureModelOpen(true)}}>Future</a>

            </div>
       
    <div className='chat_popup'>
    {isPresentModelOpen  && (
        <div className="chat__model">
           
           <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          
          <input
            type="text"
           
            placeholder="John..."
            onChange={(event) => {
              
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        
        
      // <Link to={{pathname:"/present",state:{username:username,room:room}}}>Play</Link>
      <Link to={'/present'} state={{ username:username,room:room }} >Play</Link>
   
       
        // <Chat socket={socket} username={username} room={room} />
      )}
      
     
    </div>

    
            
          </div>
         
    )}  
    </div>

    <div className='chat_popup'>
    {isFutureModelOpen  && (
        <div className="chat__model">
           
           <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          
          <input
            type="text"
           
            placeholder="John..."
            onChange={(event) => {
              
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        
        
        <Link to={'/future'} state={{ username:username,room:room }} >Play</Link>
      
   
       
        // <Chat socket={socket} username={username} room={room} />
      )}
      
     
    </div>

    
            
          </div>
         
    )}  
    </div>
    
   
    
    
    </>
     
            

        
       
    )


}


export default Landing