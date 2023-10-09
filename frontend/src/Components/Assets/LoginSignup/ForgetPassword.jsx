import React,{useState} from 'react'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import email_icon from '../Assets/email.png';

function  ForgetPassword(){

  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(0);
  const [isFetched, setIsFetched] = useState(false);


  const mailprocess = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:9000/details?email=${email}`)
      .then((data) => data.json())
      .then((data) => {
        setUserId(data[0].id);
        console.log(data[0].id);
        setIsFetched(true);
      });

    if (!email) {
      alert("Enter an email");
      return;
    }

    if (isFetched){
      try {
      
        await fetch("http://localhost:9000/mailprocess", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, userId }),
        });
        toast.success("Mail sent successfully", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });
      } catch (error) {
        console.error("An error occurred. Please try again.", error);
      }
    }
    
  };


  return (
    <div className='container'>
    <div className='header'>
      <div className='text'>Password Recovery</div>
      <div className='underline' style={{width:'50%'}}></div>
    </div>
    <form className='container' onSubmit={mailprocess} >
      <div className='inputs'>
        

        <div className='input'>
          <img src={email_icon} alt='' />
          <input
            type='email'
            name='email'
            placeholder='Email Id'
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        
      </div>
      
      
      <div className='submit-container'>
        <div>
          <button 
              className='submit'
              type='submit'
          >Send</button>
        </div>
        
      </div>
    </form>
    
  </div>
  )
}

export default ForgetPassword;