import React from 'react';
import './PresentRoomStyles.css'
const DangerBag = ({ items }) => {
  return (
    <div className="bag">
      {items.map((item, index) => (
        <div key={index} className="bag__item">
          {item.name==='red_flask'
          ?
          <img src={item.image} alt={item.name} style={{width : '80px', height : '80px'}} draggable onDragStart={(event) => event.dataTransfer.setData("flask", "red")}/>
          :
          item.name === 'blue_flask' ? 
          <img src={item.image} alt={item.name} style={{width : '80px', height : '80px'}} draggable onDragStart={(event) => event.dataTransfer.setData("flask","blue")}/>
          :
          <img src={item.image} alt={item.name} style={{width : '80px', height : '80px'}} draggable onDragStart={(event) => event.dataTransfer.setData("flask","green")}/>}
        
        </div>
      ))}
    </div>
  );
};

export default DangerBag;
