import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import { gql, useMutation} from '@apollo/client'
import {useNavigate } from 'react-router-dom';
const UserCreation = () => {
    const navigate = useNavigate();
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("Admin")
    const [profilePic, setProfilePic] = useState({})
    const [name, setName] = useState("")
    const jwt = sessionStorage.getItem("JWT");
    const panelRole = sessionStorage.getItem("role");
    const uuid = uuidv4()
    const createUserMutation = gql`
    mutation($newUserCreation: UserCreation){
        createUser(input: $newUserCreation){
            uuid
        }
    }
    `
    const [createUser] = useMutation(createUserMutation, {
        refetchQueries: [
          "users"
        ]
      });
     /*
    Gets the file, and modifies it to be an ArrayBuffer to be used for uploading to s3
    */
    const arrayBufferCreation = async(file) => {
        return new Promise((resolve, reject) => {
          let ProfilePic = new FileReader()
          ProfilePic.onload = () =>{
            resolve(ProfilePic.result)
          }
          ProfilePic.onerror = reject
          ProfilePic.readAsArrayBuffer(file)
        })
      }
    return(
        <>
        <label>Name</label>
        <input onChange={(e) => setName(e.target.value)}/>
        <br/>
        <label>Username</label>
        <input onChange={(e) => setUserName(e.target.value)}/>
        <br/>
        <label>Password</label>
        <input onChange={(e) => setPassword(e.target.value)} type="password"/>
        <br/>
        <label>Email</label>
        <input onChange={(e) => setEmail(e.target.value)}/>
        <br/>
        <label>Role</label>
        <br/>
        {panelRole == "Admin" ?
        <select onChange={(e) => setRole(e.target.value)}>

            <option value="Admin">Admin</option>
    
            <option value="Writer">Writer</option>
    
        </select> : <></>
        }
        <br/>
        <label>Profile Picture</label>
        <input type="file" id="myFile" name="filename" accept=".png, .jpg, .jpeg" onChange={e => setProfilePic(e.target.files[0])} />
        <br/>
        <br/>
        <button onClick={async() => {
            let data = await arrayBufferCreation(profilePic);
            let newUserCreation = {
                uuid: uuid,
                email: email,
                username: username,
                password: password,
                jwt: jwt,
                role: role,
                name: name,
                profilePic: {
                    name: profilePic.name,
                    fileData: new File([data], profilePic.name, {
                    type: profilePic.type
                    }),
                    contentType: profilePic.type
                },
            }
            createUser({
                variables: {
                    newUserCreation
                }
            })
            navigate(-1);
        }}>Submit</button>
        </>
    )
}
export default UserCreation