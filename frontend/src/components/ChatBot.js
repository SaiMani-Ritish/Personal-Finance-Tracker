import { Button } from '@mui/material';
import React from 'react';

function ChatBot() {
  return (
    <div className="chatbot">
      <div className="chat-header">
        <h3>Chat Bot</h3>
      </div>
      <div className="chat-messages">
        <div className="message">Hi! How can I help you today?</div>
      </div>
      <div className="chat-input">
        <input type="text" placeholder="Type your question..." />
        <Button variant='contained'>Send</Button>
      </div>
    </div>
  );
}

export default ChatBot;