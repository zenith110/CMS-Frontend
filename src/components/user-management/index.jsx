import {useNavigate } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import "./index.css"
const UserManagement = () => {
    const navigate = useNavigate();
    const jwt = sessionStorage.getItem("JWT");
    const role = sessionStorage.getItem("role");
    const username = sessionStorage.getItem("username");
    const usersQuery = gql`
    query users($jwt: String!){
        getUsers(jwt: $jwt){
            users{
              username,
              role,
              uuid  
            }
            totalCount
        }
    }
    `
    const { data, loading, error} = useQuery(usersQuery, {
        variables: {
            jwt
        },
        notifyOnNetworkStatusChange: true
    });
    if (loading) return <p>Loading Graphql data...</p>
    
    if (error) return `Submission error! User is not authenticated!`;
    return(
        <>
        <button onClick={() => {
            navigate("/user-management/user-creation");
        }}>Create User</button>
        <button>Delete Users</button>
        <button onClick={() => {
            navigate(-1);
        }}>Back</button>
        <br/>
        <br/>
        <table>
        <tbody>
        <tr>
            <th>User Management</th>
        </tr>
        <tr>
            {data.getUsers.users.map((user) => (
                <div key={user.uuid}>
                <td>{user.username}</td>
                {role == "Admin" || username == user.username 
                ? <td><button>Edit User</button></td> : <></>}
                {role == "Admin" 
                ? <td><button>Delete User</button></td> : <></>}
                </div>
            ))}
            {data.getUsers.users.map((user) => console.log(user))} 
        </tr>
        </tbody>
        </table>
        </>
    )
}
export default UserManagement