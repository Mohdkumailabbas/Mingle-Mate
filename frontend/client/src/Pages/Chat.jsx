/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Contacts from "../Components/Contacts";
import { allUsersRoute } from "../Utils/ApiRoute";

const Chat = () => {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const[currentChat,setCurrentChat]=useState(undefined);
  const navigate = useNavigate();
  useEffect(() => {
    const checkUser = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        const user = JSON.parse(localStorage.getItem("chat-app-user"));
        setCurrentUser(user);
      }
    };

    checkUser();
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          try {
            const { data } = await axios.get(`${allUsersRoute}/${currentUser._id}`);
            setContacts(data); // Ensure this sets the data correctly
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        } else {
          navigate('/setAvatar');
        }
      }
    };
  
    fetchData();
  }, [currentUser, navigate]);
  const handleChatChange=(chat)=>{
    setCurrentChat(chat);
  }

  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
      </div>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }

    // @media screen and (max-width: 719px) {
    //   grid-template-columns: 1fr;
    //   height: 100vh;
    //   width: 100vw;
    //   grid-template-rows: auto;
    // }
  }
`;

export default Chat;
 