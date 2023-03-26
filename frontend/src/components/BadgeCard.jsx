import {React, useState} from 'react';


const BadgeCard = ({ name, imageUrl, tokenId }) => {


  return(
    <div className="card">
      <img src={imageUrl} alt="" style={{width : '100px', height : '100px'}} />
      <div className="card-title">{"Achievement"}</div>
      <div className='card-description'>{name}</div>
      

    </div>
  )}

export default BadgeCard