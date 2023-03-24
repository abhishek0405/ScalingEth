import { CoinbaseWalletProvider } from "@coinbase/wallet-sdk";
import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "../components/Chat.css"
function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [count,setCount] = useState(0);
  // const sendMessage = async () => {
  //   if (currentMessage !== "") {
  //     const messageData = {
  //       room: room,
  //       author: username,
  //       message: currentMessage,
  //       time:
  //         new Date(Date.now()).getHours() +
  //         ":" +
  //         new Date(Date.now()).getMinutes(),
  //     };

  //     await socket.emit("send_message", messageData);
  //     setMessageList((list) => [...list, messageData]);
  //     setCurrentMessage("");
  //   }
  // };

  const sendMessage = async () => {
    console.log("send")
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
  
        setMessageList((list) => [...list, messageData]);
      
  
      await socket.emit("send_message", messageData);
      setCurrentMessage("");

    }
  };
  

  useEffect(() => {
    const fetchMessage = async()=>{
      await socket.off("receive_message").on("receive_message", (data) => {
        console.log("rec ",data)
       // console.log(messageList)
        setMessageList((list) => [...list, data]);
      });
      return () => {
        socket.off("receive_message");
      }
    }
    fetchMessage();
  
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Phone</p>
        
      </div>
      <div className="chat-body">
        
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;