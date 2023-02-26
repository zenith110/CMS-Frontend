import {useNavigate} from 'react-router-dom';
import './App.css'
const App = () => {
  const navigate = useNavigate();
  const LoginRedirect = () => {
    navigate("/login")
  }
  return(
    <>
      <button onClick={LoginRedirect}>
        Login
      </button>
    </>
  )
}


export default App
