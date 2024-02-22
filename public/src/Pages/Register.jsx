import styled from "styled-components"
import {Link, useNavigate} from "react-router-dom"
import Logo from "../Assets/logo.svg"
import {useState,useEffect} from "react"
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../Utils/APIroutes";

const Register = () => {
  const navigate = useNavigate();
  const [values,setValues] = useState({
    username:"",
    email:"",
    password:"",
    confirmPassword:""
  })
  const toastOptions ={
    position:"top-right",
    autoClose:8000,
    pauseOnHover:true,
    draggable:true,
    theme : "dark",
  }
  useEffect(()=>{
    const user = localStorage.getItem('chat-app-user');
    if (user) {
       navigate('/');
    }
  },[])


  const handleSubmit = async(event)=>{
    event.preventDefault();
    if(handleValidation()){
      const {password,username,email} = values;
      const {data} = await axios.post(registerRoute,{
        username,email,password
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
    const {password,confirmPassword,username,email} = values;
    if(password!==confirmPassword){
      toast.error("password and confirm password should be same",toastOptions); 
      return false;
    }else if(username.length<3){
      toast.error("enter strong username",toastOptions); 
      return false;
    }else if(password.length<3){
      toast.error("password should be greater than 3 letters ",toastOptions); 
      return false;
    }else if(email === ""){
      toast.error("email is required ",toastOptions); 
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
          <input type="email" placeholder="Email" name="email" onChange={handleChange} />
          <input type="password" placeholder="Password" name="password" onChange={handleChange} />
          <input type="password" placeholder="Confirm password" name="confirmPassword" onChange={handleChange} />
          <button type ="submit" > Create User </button>
          <span>Alreay have an account ?  <Link to="/login" > Login </Link> </span>
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

export default Register