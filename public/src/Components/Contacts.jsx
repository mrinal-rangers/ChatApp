import { useState } from "react"
import Logo from '../Assets/logo.svg';
import styled from 'styled-components';
import { useEffect } from "react";
import Contacts from './Contacts';

const Contacts = ({contacts,currUser}) => {
  const [currUserName,setCurrUserName] = useState(undefined);
  const [currUserImage,setCurrUserImage] = useState(undefined);
  const [currSelected,setCurrSelected] = useState(undefined);
  
  useEffect(()=>{
    if(currUser){
      setCurrUserName(currUser.username);
      setCurrUserImage(currUser.avatarImage);
    }
  },[currUser])

  const changeCurrChat = (index,contacts)=>{

  }

  return (
    <>
      {
        (currUserImage && currUserName) ? <Container>
          <div className="brand">
            <img src={Logo} alt="logo"/>
            <h3>Snappy</h3>
          </div>
          <div className="contacts">
            {
              contacts.map((contact,index)=>{
                return (<>
                  <div className={`contact ${ index ===currSelected ? "selected":""}`} key={index}>
                  <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar" />
                  </div>
                  <div className="username">
                    <h3> {contact.username} </h3>
                  </div>
                  </>)
              })

            }

          </div>

        </Container> : <div>

        </div>
      }

    </>
  )
}

const Container = styled.div`

`

export default Contacts