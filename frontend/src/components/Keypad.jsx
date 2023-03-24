import React, { useState  ,useEffect, useRef} from 'react';
import './PresentRoomStyles.css'


const Keypad = ({ image,onPasswordCorrect }) => {
  const [password, setPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState('pending');
  const [isModelOpen, setIsModelOpen] = useState(false);
  const handleModelClose = () => {
    setIsModelOpen(false);
    setPassword('');
    
  };
  const checkPassword = () => {
    if (password ==='libsqx') {
      setPasswordStatus('success');
      onPasswordCorrect();
    } else {
      setPasswordStatus('error');
    }
  };

  return (
    <div className="keypad">
      <img src={image} alt="keypad" onClick={() => setIsModelOpen(true)} />
      {isModelOpen && (
        <div className="keypad__model">
         
         
           {(passwordStatus === 'pending' || passwordStatus==='error') && (
            <div>
             <div>
             Enter the password to unlock the document.
           </div>
          
           <input
             type="text"
             value={password}
             onChange={(event) => setPassword(event.target.value)}
           />
           <br></br>
              <button onClick={() => checkPassword()}>
              Check Password
            </button>
            </div>
            
          )}
          
          {passwordStatus === 'success' && (
            <div>
              Lockers Unlocked
            </div>
          )}
          {passwordStatus === 'error' && (
            <div>
              The password is incorrect. Please try again.
            </div>
            
          )}
          <button onClick={handleModelClose}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Keypad;

  