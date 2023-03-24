// import React, { useState  ,useEffect, useRef} from 'react';
// import './PresentRoomStyles.css'
// import Document from '../components/props/Document.png'
// import image from './props/laptop.png'
// import Modal from 'react-modal'


// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//     minWidth: '25%',
//     minHeight: '40%',
//     background :'rgba(255,255,255,1)',
//     position: 'absolute',
//     overflowX : 'hidden',
//     overflowY : 'hidden',
//     zIndex : 4
    
//   },
// };


// Modal.setAppElement('#root');


// const Computer = (props) => {
  
//   const [isModelOpen, setIsModelOpen] = useState(false);
//   const [password, setPassword] = useState('');
//   const [passwordStatus, setPasswordStatus] = useState('pending');
//   const [error, setError] = useState('');
//   const [modalIsOpen, setIsOpen] = useState(false);
//   let subtitle


//   function openModal(e, description, valid, tokenId ) {
//     e.preventDefault()
//     console.log("hello")
//       setIsOpen(true);
      
//   }
//   function afterOpenModal1() {
//       // references are now sync'd and can be accessed.
//       subtitle.style.color = '#f00';
//   }

//   function closeModal() {

//       setIsOpen(false);
//   }
  

//   const handleKeyPress = (event) => {
//     const key = event.key;
//     if (key >= '0' && key <= '9') {
//       setPassword(password + key);
//     }
//   };

//   const handleModelClose = () => {
//     console.log('hey')
//     setIsModelOpen(false);
//     setPassword('');
//     setError('');
//   };

//   const handleModelSubmit = () => {
//     console.log('yo')
//     if (password === '0411') {
//       setPasswordStatus('success');
//       props.handleCorrect()
//       // Load the document
//       setError('');
//     } else {
//       setPasswordStatus('error');
//       setError('Invalid password');
//     }
//   };

//   return (
//     <div className="computer" style={{
//       position: 'absolute',
//       top: 500,
//       left: 600,
     
//       minWidth: '200px',
//       height: '50px',
      
//       color : 'white'
//     }} >
//       <img src={image} alt="computer" onClick={openModal} />
//       <div className='login-modal'>

//     <Modal
//         isOpen={modalIsOpen}
        
//         onRequestClose={closeModal}
//         style={customStyles}
//         contentLabel="Example Modal"
//         className={'bg-discount-gradient parent'}
//     >


//                     <span>Enter Password..</span>
           
           
            
//            <div className="computer__keypad">
           
           
//              <button onClick={() => setPassword(password + '1')}>1</button>
//              <button onClick={() => setPassword(password + '2')}>2</button>
//              <button onClick={() => setPassword(password + '3')}>3</button>
//              <button onClick={() => setPassword(password + '4')}>4</button>
//              <button onClick={() => setPassword(password + '5')}>5</button>
//              <button onClick={() => setPassword(password + '6')}>6</button>
//              <button onClick={() => setPassword(password + '7')}>7</button>
//              <button onClick={() => setPassword(password + '8')}>8</button>
//              <button onClick={() => setPassword(password + '9')}>9</button>
//              <button onClick={() => setPassword(password + '0')}>0</button>
//            </div>
           
//            <div className="computer__password">
//              {password.split('').map((char, index) => (
//                <span key={index}>*</span>
//              ))}
//            </div>
//            {error && <div className="computer__error">{error}</div>}

//            <div className='computer__actions'>
//            <button onClick={() => {setIsModelOpen(false);
//      setPassword('');
//      setError('');}}>Clear</button>
//               <button onClick={handleModelSubmit}>Submit</button>
//            </div>

//            {modalIsOpen  && passwordStatus==='success' && (
//         <div >
//             <div className='computer__keypad'>
//             <img src={Document}></img>
//             <div className="computer__actions">
//             <button onClick={closeModal}>Close</button>
//             </div>
            
//           </div>
              
//     </div>
//       )}
          
            

//     </Modal>

// </div>
      
      
        
    
      
//     </div>
//   );
//             }
// export default Computer;

import React, { useState  ,useEffect, useRef} from 'react';
import './PresentRoomStyles.css'
import Document from '../components/props/Document.png'
import image from './props/laptop.png'
const Computer = (props) => {
  
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState('pending');
  const [error, setError] = useState('');
  

  const handleKeyPress = (event) => {
    const key = event.key;
    if (key >= '0' && key <= '9') {
      setPassword(password + key);
    }
  };

  const handleModelClose = () => {
    setIsModelOpen(false);
    setPassword('');
    setError('');
  };

  const handleModelSubmit = () => {
      if (password === '0411') {
      setPasswordStatus('success');
      props.handleCorrect()
      // Load the document
      setError('');
    } else {
      setPasswordStatus('error');
      setPassword('')
      setError('Invalid password');
    }
  };

  return (
    <div className="computer" >
      <img src={image} alt="computer" onClick={() => setIsModelOpen(true)} />
      {isModelOpen  && (passwordStatus==='pending' || passwordStatus==='error') && (
        <div className="computer__model">
            <span>Enter Password..</span>
          <div className="computer__keypad">
            <button onClick={() => setPassword(password + '1')}>1</button>
            <button onClick={() => setPassword(password + '2')}>2</button>
            <button onClick={() => setPassword(password + '3')}>3</button>
            <button onClick={() => setPassword(password + '4')}>4</button>
            <button onClick={() => setPassword(password + '5')}>5</button>
            <button onClick={() => setPassword(password + '6')}>6</button>
            <button onClick={() => setPassword(password + '7')}>7</button>
            <button onClick={() => setPassword(password + '8')}>8</button>
            <button onClick={() => setPassword(password + '9')}>9</button>
            <button onClick={() => setPassword(password + '0')}>0</button>
          </div>
          <div className="computer__password">
            {password.split('').map((char, index) => (
              <span key={index}>*</span>
            ))}
          </div>
          {error && <div className="computer__error">{error}</div>}
          <div className="computer__actions">
            <button onClick={handleModelClose}>Close</button>
            <button onClick={handleModelSubmit}>Submit</button>
          </div>
        </div>
      )}
      {isModelOpen  && passwordStatus==='success' && (
        <div className="computer__model">
            <div className='computer__keypad'>
            <img src={Document} id="doc_img"></img>
            <div className="computer__actions">
            <button onClick={handleModelClose} id="doc_button">Close</button>
            </div>
            
          </div>
        
        
    </div>
      )}
      
    </div>
  );
            }
export default Computer;