
import styled from "styled-components"
import {Link, useNavigate} from "react-router-dom"
import Logo from "../Assets/logo.svg"
import {useEffect, useState} from "react"
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../Utils/APIroutes";

const Login = () => {
  const navigate = useNavigate();
  const [values,setValues] = useState({
    username:"",
    email:"",
  })
  const toastOptions ={
    position:"top-right",
    autoClose:8000,
    pauseOnHover:true,
    draggable:true,
    theme : "dark",
  }

  useEffect(()=>{
    if(localStorage.getItem('chat-app-user')){
      navigate('/');
    }
  },[])

  const handleSubmit = async(event)=>{
    event.preventDefault();
    if(handleValidation()){
      const {password,username} = values;
      const {data} = await axios.post(loginRoute,{
        username,password
      });
      if(data.status === false){
        toast.error(data.msg,toastOptions);
        return ;
      }
      if(data.status === true){
        localStorage.setItem('chat-app-user',JSON.stringify(data.user));
      }
      navigate('/');
    }
  }
  const handleValidation =()=>{
    const {password,username} = values;
    if(password===''){
      toast.error("password is required",toastOptions); 
      return false;
    }else if(username.length===""){
      toast.error("username is required ",toastOptions); 
      return false;
    }
    return true;
  }

  const handleChange = (event)=>{
    setValues({...values,[event.target.name]:event.target.value});
  }

  return (
    <>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <div className="brand">
            <img src ={Logo} alt="logo"/>
            <h1>Snappy</h1>
          </div>
            <label htmlFor="username" >Username</label>
            <input type="text" placeholder="Username" name="username" onChange={handleChange} />
            <input type="password" placeholder="Password" name="password" onChange={handleChange} />
            <button type ="submit" > Login </button>
            <span>do not have an account ? <Link to="/register"> Register</Link> </span>
          </form>
      </FormContainer>
      <ToastContainer />
    </>

  )
}

const FormContainer = styled.div`
  height:100vh;
  width:100vw;
  display:flex;
  overflow:hidden;
  flex-direction:column; 
  justify-content:center;
  align-items:center;
  gap:1rem;
  background-color: #131324;
  .brand{
    display:flex;
    justify-content:center;
    align-items:center;
    gap:1rem;
    img{
      height 5rem;
      width:5rem;
    }
    h1{
      color:white;
      text-transform:uppercase;
    }
  }
  form{
    display:flex;
    flex-direction:column;
    gap:2rem;
    background-color:#00000076;
    border-radius:2rem;
    padding:3rem 6rem 3rem 4rem;
    input{
      background-color:transparent;
      padding:1rem;
      border:0.1rem solid #4e0eff;
      border-radius:0.4rem;
      color:white;
      width:100%;
      font-size:1rem;
      &:focus{
        border: 0.1rem solid #9997af0;
        outline:none;
      }
    }
    button{
      background-color: #997af0;
      width:113%;
      color:white;
      padding: 1rem 2rem;
      border:none;
      font-weight:bold;
      cursor:pointer;
      border-radius:0.4rem;
      font-size:1rem;
      text-transform:uppercase;
      transition:0.5s ease-in-out; 
      &:hover{
        background-color:#4e0eff;
      }
    }
    span{
      color:white;
      text-transform:uppercase;
      a{
        color:#997af0;
        text-decoration:none;
        font-weight:bold;
      }
    }
  }
`;

export default Login;