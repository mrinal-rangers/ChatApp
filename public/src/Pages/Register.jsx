import styled from "styled-components"
import {Link} from "react-router-dom"
const FormContainer = styled.div``;

const Register = () => {

  const handleSubmit = (event)=>{
    event.preventDefault();
    alert("form");
  }
  const handleChange = (event)=>{
    console.log(event);
  }

  return (
    <>
      <FormContainer>
        <form onSubmit={(event)=> handleSubmit(event)}>
          <div className="brand">
            <img src ="" alt=""/>
            <h1>Snappy</h1>
          </div>
          <label htmlFor="username" >Username</label>
          <input type="text" placeholder="username" name="username" onChange={e=>handleChange(e)} />
          <input type="email" placeholder="email" name="email" onChange={e=>handleChange(e)} />
          <input type="password" placeholder="password" name="password" onChange={e=>handleChange(e)} />
          <input type="password" placeholder="confirm password" name="confirmPassword" onChange={e=>handleChange(e)} />
          <button type ="submit "> Create User </button>
          <span>Alreay have an account ?  <Link to="/login" > Login </Link> </span>
        </form>
      </FormContainer>
    </>
  )
}


export default Register