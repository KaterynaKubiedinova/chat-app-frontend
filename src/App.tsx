import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import ChatPage from './pages/chats/ChatPage';
import RegistrationPage from './pages/registration/RegistrationPage';
import { CurrentChat } from './pages/chats/currentChat/CurrentChat';
import { ExplanationText } from './themes/styledComponents';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="registration" element={<RegistrationPage />} />
        <Route path="chat/:userId" element={<ChatPage />}>
          <Route
            path=""
            element={
              <ExplanationText>
                Select or create a chat to start messaging
              </ExplanationText>
            }
          />
          <Route path=":chatName" element={<CurrentChat />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
