import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserProvider } from './UserContext';
import Login from './userPage/Login';
import Register from './userPage/Register';
import Main from './mainPage/Main';

function App() {
  return (
    <div className="App w-screen">
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/main/*" element={<Main />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
