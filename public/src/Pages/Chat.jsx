import styled from 'styled-components'
import { useState,useEffect} from 'react';
import Contacts from '../Components/Contacts';
import { useNavigate } from 'react-router-dom';
import {allUsersRoute} from '../Utils/APIroutes'
import axios from 'axios';

const Chat = () => {
  const navigate = useNavigate();
  const [contacts,setContacts] = useState([]);
  const [currUser,setCurrUser] = useState(undefined);
 
  useEffect(() => {
    const fetchData = async () => {
      if (!localStorage.getItem('chat-app-user')) {
        navigate('/login');
      } else {
        setCurrUser(JSON.parse(localStorage.getItem('chat-app-user')));
      }
    };
  
    fetchData();
  }, []);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currUser) {
          if (currUser.isAvatarImageSet) {
            const response = await axios.get(`${allUsersRoute}/${currUser._uid}`);
            setContacts(response.data);
          } else {
            navigate('/setAvatar');
          }
        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchData();
  }, [currUser]);

  return (
    <Container>
      <div className='container'>
        <Contacts contacts={contacts} currUser={currUser} />
      </div>
    </Container>
  )
}

const Container = styled.div`
  height:100vh;
  width:100vw;
  background-color:#131324;
  display:flex;
  justify-content:center;
  align-items:center;
  gap:1rem;
  .container{
    height:85vh;
    width:85vw;
    background-color:#00000076;
    grid-template-columns: 25% 75%
    @media (max-width: 767px) {
      height:100vh;
      width:100vw;
      grid-template-columns: 15% 85%
    }
  }
`

export default Chat