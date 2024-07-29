/* eslint-disable no-unused-vars */
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import Logo from '../assets/logochat.svg'
import { useEffect, useState } from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { registerRoute } from '../Utils/ApiRoute';

const Register = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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
  })

  const handleValidation = () => {
    const { email, confirmPassword, password, username } = value;
    if (password !== confirmPassword) {
      toast.error("Password didn't match", toastOptions);
      return false;
    } else if (username.length <= 4) {
      toast.error("Username must be at least 4 characters", toastOptions);
      return false;
    } else if (password.length < 7) {
      toast.error("Password must be at least 7 characters", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email is required", toastOptions);
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, password, username } = value;
      try {
        const { data } = await axios.post(registerRoute, {
          username,
          email,
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
          />
           <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login" >Login</Link>
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
    gap: 1rem;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
  export default Register