import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './userPage/Login';
import Register from './userPage/Register';
import Main from './mainPage/Main';

function App() {
  return (
    <div className="App w-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main/*" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
