import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css'
import Users from '@/components/User';


import io from 'socket.io-client';

const socket = io('http://localhost:8080');

function index() {


  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [roomId, setRoomId] = useState("")


  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('private_message', { roomId, newMessage })
    setMessages([...messages, newMessage]);
    setNewMessage('');
  };


  socket.on('specific_message', (msg) => {
    console.log("Your incoming message: ", msg)
    setMessages([...messages, msg])
  });


  const joinRoom = ()=>{
    socket.emit("join", roomId)
  }


  return (
    <>
      <div className={styles.container}>
        <h1>Chat Application</h1>
        <div className={styles['chat-box']}>
          {messages?.length > 0 ? messages.map((message, index) => (
            <p key={index} className={styles.message}>
              {message}
            </p>
          )) : <p key={index} className={styles.message}>
            There is no message available
          </p>}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className={styles['chat-input']}
            value={newMessage}
            placeholder='Start typing...'
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button type="submit" className={styles['send-button']}>
            Send
          </button>
        </form>

        <Users />

      </div>
    </>
  )
}

export default index