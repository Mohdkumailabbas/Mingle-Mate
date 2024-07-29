// import React from 'react'
/* eslint-disable no-unused-vars */
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import Logo from '../assets/logochat.svg'
import { useEffect, useState } from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { loginRoute } from '../Utils/ApiRoute';

const Login = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    username: "", 
    password: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  };
  useEffect(()=>{
    if(localStorage.getItem('chat-app-user')){
      navigate("/"); // Navigate to home page if user is already logged in
    }
  },[])
  const handleValidation = () => {
    const { password, username } = value;
    if (password ==="") {
      toast.error("Password  is obligatory", toastOptions);
     
      return false;
    } else if (username.length ==="") {
      toast.error("Username is obligatory!!", toastOptions);
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const {  password, username } = value;
      try {
        const { data } = await axios.post(loginRoute, {
          username,
      
          password
        });
        if (data.status === false) {
          toast.error(data.message, toastOptions);
        } else if (data.status === true) {
          localStorage.setItem("chat-app-user", JSON.stringify(data.user));
          navigate("/"); // Navigate after successful registration
        }
      } catch (error) {
        console.error("Registration failed:", error);
        toast.error("Registration failed. Please try again later.", toastOptions);
      }
    }
  };

  const handleChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  }; 
   return (
      <>
       <FormContainer>
        <form action="" onSubmit={(event)=>handleSubmit(event)}>
         < div className="brand">
            <img src={Logo} alt="logo" />
            <h1 className='font-extrabold'>Mingle Mate</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min=""
          />
           
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Login </button>
          <span>
            New User ? <Link to="/register" >Create Account</Link>
          </span>
        </form>
       </FormContainer>
       <ToastContainer /> 
      </>
    )
  }
  const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
       font-weight: bold;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    display: flex;
    color: white;
    text-transform: uppercase;
    gap: 2rem;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
  export default Login