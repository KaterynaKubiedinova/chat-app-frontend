import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import ChatPage from './pages/chats/ChatPage';
import RegistrationPage from './pages/registration/RegistrationPage';
import { CurrentChat } from './pages/chats/currentChat/CurrentChat';
import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";

const pubnub = new PubNub({
  publishKey: "demo",
  subscribeKey: "demo",
  userId: "test-user"
});

function App() {
  return (
    <PubNubProvider client={pubnub}>
      <div className="App">
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='registration' element={<RegistrationPage />} />
          <Route path='chat/:userId' element={<ChatPage />}>
            <Route path='' element={<div className="explanation-text">
                Select or create a chat to start messaging
            </div>} />
            <Route path=':chatName' element={<CurrentChat />}/>
          </Route>
        </Routes>
      </div>
    </PubNubProvider>
  );
}

export default App;
