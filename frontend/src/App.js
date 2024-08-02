
import './App.css';
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import Home from './Pages/Home';
import YourBlogs from './Pages/YourBlogs';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Pages/Navbar';
import { useContext } from 'react';
import UserContext from './context/UserContext';
import Foreget from './Pages/Foreget';
function App() {
  let ctx = useContext(UserContext)
  let login =ctx.user.Login
  // console.log(login)
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
    { login===true && <Route  path='/' element={<Home/>}/>}
    { login===false && <Route  path='/' element={<Navigate to ='/Login'/>}/>}
    {login===true &&<Route  path='/yourblog' element={<YourBlogs/>}/>}
    {login===false &&<Route  path='/yourblog' element={<Navigate to="/Login"/>}/>}
    {login===true &&<Route  path='/Login' element={<Navigate to='/'/>}/>}
    {login===false &&<Route  path='/Login' element={<Login/>}/>}
    {login ===false &&<Route  path='/signup' element={<Signup/>}/>}
    <Route path='/ForgetPassword' element={<Foreget/>}/>
      </Routes>
      <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
