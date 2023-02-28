import { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import {useNavigate} from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loginClient = gql`
    mutation login($username: String!, $password: String!){
        loginUser(username: $username, password: $password)
    }
  `
  const [login, { data, loading, error }] = useMutation(loginClient);
  if (loading) return 'Submitting...';

  if (error) return `Submission error! ${error.message}`;
  return (
    <div>
      <label>Username</label>
      <input onChange={(e) => setUsername(e.target.value)} type="text"/>
      <label>Password</label>
      <input onChange={(e) => setPassword(e.target.value)} type="password"/>
      <button onClick={() => {
        login({
          variables:
          {
            username,
            password
          }
          })
          localStorage.setItem("JWT", data.loginUser);
          localStorage.setItem("username", username);
          localStorage.setItem("password", password)
          navigate('/dashboard');
      }}>Login</button>
    </div>
  )
}

export default Login
