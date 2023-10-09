import React, { useState } from 'react';
import './LoginSignup.css';
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

function LoginSignup() {
  const [action, setAction] = useState('Sign Up');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
  };
console.log(formData);
  const handleSubmit = async (e) => {
    
    console.log("submit");
    e.preventDefault();
   if(formData.email ==='' )return
   if(action==='Sign Up'){
    try {
        const response = await fetch('http://localhost:9000/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (response.status === 200) {
          console.log('Registration successful!');
          toast.success('Sign Up Successfull', {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
          });
          setFormData({ name: '', email: '', password: '' });
          // navigate('/login')
        } else {
          const data = await response.json();
          setError(data.error);
        }
      } catch (error) {
        setError(`Registration error: ${error.message}`);
      }
   }else{
        console.log("login occurs");
    try {
        const response = await fetch("http://localhost:9000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email:formData.email, password:formData.password }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("token", data.token);
            localStorage.setItem("email", formData.email);
            console.log(data.token);
            const userDetailsResponse = await fetch(`http://localhost:9000/details?email=${formData.email}`);
            if (userDetailsResponse.ok) {
                const ud = await userDetailsResponse.json();
                localStorage.setItem("name", ud[0]['name']);
                localStorage.setItem("id", ud[0]['id']);

                toast.success('Login Successful', {
                    position: 'top-right',
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                });
                // navigate("/");
            } else {
                setError("An error occurred while fetching user details.");
            }
        } else {
            const data = await response.json();
            setError(data.error);
        }
    } catch (error) {
        setError("An error occurred. Please try again.");
    }

    



   }
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>{action}</div>
        <div className='underline'></div>
      </div>
      <form className='container' onSubmit={handleSubmit}>
        <div className='inputs'>
          {action === 'Sign Up' && (
            <div className='input'>
              <img src={user_icon} alt='' />
              <input
                type='text'
                name='name'
                placeholder='Name'
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          )}

          <div className='input'>
            <img src={email_icon} alt='' />
            <input
              type='email'
              name='email'
              placeholder='Email Id'
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className='input'>
            <img src={password_icon} alt='' />
            <input
              type='password'
              name='password'
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>
        {action === 'Login' && (
          <div className='forgot-password'>
            Forgot password?<Link to='/forgot-password'> Click here</Link>
          </div>
        )}
        <div style={{textAlign:"center"}}>
        {error && (
          <span className='error-msg' style={{ color: 'red', fontWeight: 'bold' }}>
            {error}
          </span>
        )}
        </div>
        <div className='submit-container'>
          <div
            
          >
            <button 
                className={action === 'Login' ? 'submit gray' : 'submit'}
                onClick={() => {
                  setAction('Sign Up');
                }}
                type='submit'
            >Sign Up</button>
          </div>
          <div>
            <button
            className={action === 'Sign Up' ? 'submit gray' : 'submit'}
            onClick={() => {
              setAction('Login');
            }}
            type='submit'
            >Login</button>
          </div>
        </div>
      </form>
      
    </div>
  );
}

export default LoginSignup;
