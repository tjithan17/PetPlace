'use client'
import React, { use, useEffect, useState } from 'react';
import './style.css';



export default function Messages() {
  const [chatRooms, setChatRooms] = useState([]);
  const [curChatRoom, setCurChatRoom] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [curUser, setCurUser] = useState('');

  useEffect(() => {
    fetch(`/api/profile/messages`, {method: "get"}).then((response) => response.json()).then((chats) => {
        return fetch(`/api/profile/userinfo`, {method: "get"}).then((res) =>res.json()).then((user) => {
            setChatRooms(chats);
            setCurUser(user);
            setCurChatRoom(chats[0])
            if (chats[0])
            {
                let curid = chats[0].chatRoomId
                let link1 = `/api/profile/messages/message/${curid}`
                return fetch(link1 , {method: "get"}).then((resp) => {return resp.json().then((mes) =>{
                    setMessages(mes);
             })})
            }})
      });
  }, []);



  async function handleChatroomSwitch(chatroom) {
    setCurChatRoom(chatroom);
    let curid = chatroom.chatRoomId
    let link1 = `/api/profile/messages/message/${curid}`
    await fetch(link1 , {method: "get"}).then((resp) => {return resp.json().then((mes) =>{
        setMessages(mes);
    })
  })};

  async function handleSendMessage(){
    await fetch(`/api/profile/messages/message`, {method: "post", body: JSON.stringify({roomId: curChatRoom.chatRoomId ,send: curUser.username, cont: newMessage})}).then((res) => {return res.json().then((message) => {
        return fetch(`/api/profile/messages`, {method: "put", body: JSON.stringify({mess: [...messages, message] ,utwoId: curChatRoom.usertwoId })}).then((respo) => {return respo.json().then((outp) => {
            console.log('it WOOOORKS')
            setMessages([...messages, message])
            setNewMessage('');  
            
        })})
    })})
  };


  return (
    <div className="messages-container">
      {/* Chatrooms Panel */}
      <div className="chatrooms-panel">
        <div className="chatroom-switcher">
          {chatRooms.map((chatroom) => (
            <div
              key={chatroom.chatRoomId}
              className={`chatroom-circle ${chatroom.chatRoomId === curChatRoom.chatRoomId ? 'active' : ''}` }
              onClick={() => handleChatroomSwitch(chatroom)}
            />
          ))}
        </div>
        <ul className="chatroom-list">
          {chatRooms.map((chatroom) => (
            <li
              key={chatroom.chatRoomId}
              className={`chatroom-item ${chatroom.chatRoomId === curChatRoom.chatRoomId ? 'active' : ''}`}
              onClick={() => handleChatroomSwitch(chatroom)}
            >
              <p className="chatroom-name">{chatroom.usertwo === curUser.username ? chatroom.userone : chatroom.usertwo}</p>
              <p className="last-message">{messages.length > 0 ? messages.slice(-1)[0].content : ''}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Current Chatroom */}
      <div className="chatroom">
        <div className="chatroom-header">
          <h1 className="chatroom-title">{(curChatRoom) ? curChatRoom.usertwo === curUser.username ? curChatRoom.userone : curChatRoom.usertwo : ''}</h1>
        </div>
        <div className="chatroom-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender === curUser.username ? 'my-message' : 'other-message'}`}>
              <p className="message-sender">{message.sender}</p>
              <p className="message-content">{message.content}</p>
            </div>
          ))}
        </div>
        <div className="message-input">
          <input
            type="text"
            className="input-box"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className="send-button" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}