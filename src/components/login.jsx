import { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import {useNavigate} from 'react-router-dom';
import "./login.css"
const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loginClient = gql`
    mutation login($username: String!, $password: String!){
        loginUser(username: $username, password: $password){
          jwt
          role
        }
    }
  `
  const [login, {loading, error }] = useMutation(loginClient, {
    onCompleted: (data) => {
          var role = data.loginUser.role
          if(role == "Reader"){

          }
          else if(role == "Admin" || role == "Writer"){
            sessionStorage.setItem("JWT", data.loginUser.jwt);
            sessionStorage.setItem("role", data.loginUser.role);
            sessionStorage.setItem("username", data.loginUser.username);
            navigate('/dashboard');
          }
    }
  });
  if (loading) return 'Submitting...';

  if (error) return `Submission error! ${error.message}`;
  return (
    <div className='loginField'>
      <label className='textLabel'>Username: </label>
      <input onChange={(e) => setUsername(e.target.value)} type="text"/>
      <br/>
      <label className='textLabel'>Password:  </label>
      <input onChange={(e) => setPassword(e.target.value)} type="password"/>
      <br/>
      <br/>
      <button onClick={() => {
        login({
          variables:
          {
            username,
            password
          }
          })
      }}>Login</button>
    </div>
  )
}

export default Login
