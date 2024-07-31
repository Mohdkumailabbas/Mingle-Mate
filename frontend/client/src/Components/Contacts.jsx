/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import styled from "styled-components";
import Logo from "../assets/logochat.svg";

const Contacts = ({ contacts = [], currentUser,changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username);
      setCurrentUserImage(currentUser.avatarImage);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {
        currentUserImage && currentUserName && (
          <Container>
            <div className="brand">
              <img src={Logo} alt="Logo" />
              <h1>Mingle Mate</h1>
            </div>
            <div className="contacts">
              {
                contacts.length > 0 ? (
                  contacts.map((contact, index) => {
                    return (
                      <div
                        className={`contact ${index === currentSelected ? "selected" : ""}`}
                        key={index}
                        onClick={() => changeCurrentChat(index, contact)}
                      >
                        <div className="avatar">
                          <img
                            src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                            alt="avatar"
                          />
                        </div>
                        <div className="username">
                          <h3>{contact.username}</h3>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div>No contacts found</div>
                )
              }
            </div>
            <div className="current-user">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentUserImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h2>{currentUserName}</h2>
              </div>
            </div>
          </Container>
        )
      }
    </>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    margin-top: 0.5rem;
    margin-left: 0.5rem;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    overflow: hidden;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    .contact {
      background-color: #ffffff39;
      min-height: 5rem;
      width: 90%;
      cursor: pointer;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      margin-top: 0.5rem;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }
  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
  }
`;

export default Contacts;
