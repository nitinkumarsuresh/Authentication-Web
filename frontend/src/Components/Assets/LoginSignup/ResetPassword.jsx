import React, { useEffect, useState } from 'react'
import password_icon from '../Assets/password.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  useLocation, useNavigate } from "react-router-dom";
function ResetPassword(){
  const [password , setPassword] = useState('');
  const [password1 , setPassword1] = useState('');
  const [password2 , setPassword2] = useState('');
  const [error , setError] = useState('');

  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const navigate=useNavigate();



  async function handlesubmit(e){
    e.preventDefault();
    console.log("hello");
    try {
      console.log(password +" "+ id);
      await fetch("http://localhost:9000/update-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id  , password }),
      });
        toast.success('Password Reset successfull', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });
    } catch (error) {
      console.error("An error occurred. Please try again.", error);
    }
    navigate("/");
  }
  useEffect(()=>{
    if(password1!==password2){
      setError("password does not match");
    }else{
      setError("");
    }
  },[password])
  return (
    <div className='container'>
    <div className='header'>
      <div className='text'>Reset Password </div>
      <div className='underline' style={{width:'40%'}}></div>
    </div>
    <form className='container' onSubmit={handlesubmit}>
      <div className='inputs'>
        

        <div className='input'>
            <img src={password_icon} alt='' />
            <input
              type='password'
              name='password'
              placeholder='New Password'
              onChange={(e)=>{setPassword1(e.target.value) ; setPassword(e.target.value)}}
            />
        </div>

        <div className='input'>
            <img src={password_icon} alt='' />
            <input
              type='password'
              name='password'
              placeholder='Re-type New Password'
              onChange={(e)=>{setPassword2(e.target.value);setPassword(e.target.value)}}
            />
        </div>
        
      </div>
      <div style={{textAlign:'center'}}>{error && <span style={{color:"red"}}>{error}</span>}</div>
      
      <div className='submit-container'>
        <div>
          <button 
              className='submit'
              type='submit'
          >Reset</button>
        </div>
        
      </div>
    </form>
    
  </div>
  )
}
 
export default ResetPassword;
