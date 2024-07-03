import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pageUser/Login';
import Register from './pageUser/Register';
import PenbuyingHome from './layout/PenbuyingHome';

function App() {
  return (
    <main className="App w-screen min-w-mobile">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main/*" element={<PenbuyingHome />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
