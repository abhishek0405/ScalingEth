import React from 'react';
import './PresentRoomStyles.css'
const Bag = ({ items }) => {
  return (
    <div className="bag">
      {items.map((item, index) => (
        <div key={index} className="bag__item">
          {item.name==='key117'
          ?
          <img src={item.image} alt={item.name} style={{width : '80px', height : '80px'}} draggable onDragStart={(event) => event.dataTransfer.setData("keyType", "correctKey")}/>
          :
          <img src={item.image} alt={item.name} style={{width : '80px', height : '80px'}} draggable onDragStart={(event) => event.dataTransfer.setData("keyType","incorrectKey")}/>}
          
        </div>
      ))}
    </div>
  );
};

export default Bag;
