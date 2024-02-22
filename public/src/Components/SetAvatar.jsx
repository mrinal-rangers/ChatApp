import styled from "styled-components"
import { useNavigate} from "react-router-dom"
import {useState,useEffect} from "react"
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import loader from "../Assets/loader.gif"
import { Buffer } from "buffer";
import { setAvatarRoute } from '../Utils/APIroutes';


const SetAvatar = () => {

    const api  = "https://api.multiavatar.com/1234"
    const navigate = useNavigate();
    const [avatars,setAvatars] = useState([]);
    const [isLoading,setisLoading] = useState(false);
    const [selectedAvatar,setSelectedAvatars] = useState(undefined);

    const toastOptions ={
        position:"top-right",
        autoClose:8000,
        pauseOnHover:true,
        draggable:true,
        theme : "dark",
      }

      const setProfilePicture = async()=>{
        if(selectedAvatar === undefined){
          toast.error("Select an image",toastOptions); 
          return false;
        }

      };


      useEffect(()=>{
        const fetchData = async () => {
          try {
            const data = [];
            for (let i = 0; i < 4; i++) {
              const image = await axios.get(`${api}/${Math.round(Math.random() * 10000)}`);
              const buffer = new Buffer(image.data);
              data.push(buffer.toString('base64'));
            }
            setAvatars(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          } finally {
            setisLoading(false); 
          }
        };
      
        setisLoading(true);
        fetchData();
      },[])

  return (
    <>
    <Container>
        <div className="title-container">
            <h1>Pick an avatar as your Profile Picture</h1>
        </div>
        <div className="avatars">
            {
                avatars.map((avatar,index)=>{
                    return (
                        <div className={`avatar ${selectedAvatar ===index ? "selected":""}`} key={index} onClick = {()=> setSelectedAvatars(index)} > 
                        <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" />
                        </div>
                    )
                })
            }
        </div>
        <button className="submit-btn" onClick={setProfilePicture} >Set as Profile Picture</button>
    </Container>
    <ToastContainer/>
    </>
  )
}


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  overflow:hidden;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
      margin-left:1rem;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    overflow:hidden;
    @media (max-width: 767px) {
    transform:scale(0.6);
    padding:1rem;
    }

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
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
`;

export default SetAvatar;