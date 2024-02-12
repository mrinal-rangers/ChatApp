import styled from "styled-components"
const FormContainer = styled.div``;

const Register = () => {

  const handleSubmit = (event)=>{
    event.preventDefault();
    alert("form");
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
          <input type="text" placeholder="username" name="username" onChange={e=>changeHandler(e)} />
        </form>
      </FormContainer>
    </>
  )
}


export default Register