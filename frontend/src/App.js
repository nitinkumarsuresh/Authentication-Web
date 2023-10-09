import LoginSignup from "./Components/Assets/LoginSignup/LoginSignup";
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './Components/Assets/LoginSignup/LoginSignup.css'
import ForgetPassword from "./Components/Assets/LoginSignup/ForgetPassword";
import ResetPassword from "./Components/Assets/LoginSignup/ResetPassword";
function App() {
  
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/reset-password/:id' element={<ResetPassword/>}/>
            <Route path='/' element={<LoginSignup/>} />
            <Route path='/forgot-password' element={<ForgetPassword/>} />
          </Routes>
        </BrowserRouter>
        <ToastContainer/>
    </div>
      
    
  );
}

export default  App;

