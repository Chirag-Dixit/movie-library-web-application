import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage';
import Login from './Components/auth/Login'
import SignUp from './Components/auth/SignUp';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='login' element={<Login />}/>
        <Route path='signup' element={<SignUp />}/>
      </Routes>
    </div>
  );
}

export default App;
