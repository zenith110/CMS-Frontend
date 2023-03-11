import {useNavigate, Navigate} from 'react-router-dom';

import './App.css'
const App = () => {
  const navigate = useNavigate();
  const jwt = localStorage.getItem("JWT");
  const LoginRedirect = () => {
    navigate("/login")
  }
  return(
    <>
      {jwt ? <Navigate to="/dashboard"/> : <button onClick={LoginRedirect}>
        Login
      </button>}
    </>
  )
}


export default App
