import {useNavigate } from 'react-router-dom';
import { gql, useMutation, useQuery } from '@apollo/client';
import toast, { Toaster } from 'react-hot-toast';
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
    const deleteUser = gql`
    mutation($inputData: DeleteUser){
        deleteUser(input: $inputData)
    }
    `
    const { data, loading, error} = useQuery(usersQuery, {
        variables: {
            jwt
        },
        notifyOnNetworkStatusChange: true
    });
    const [deleteUserMutation, {deleteUserData}] = useMutation(deleteUser, {
        refetchQueries: ["users"], 
        onCompleted: (deleteUserData) => {
            toast(deleteUserData.deleteUser);
        }
    })
    if (loading) return <p>Loading Graphql data...</p>
    
    if (error) return `Submission error! User is not authenticated!`;
    
    return(
        <>
        <div><Toaster/></div>
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
        <thead>
        <tr>
            <th>User Management</th>
            <th>Edit User</th>
            <th>Delete User</th>
        </tr>
        </thead>
        <tbody>
            {data.getUsers.users.map((user) => (
                <tr key={user.uuid}>
                <td>{user.username}</td>
                {role == "Admin" || username == user.username 
                ? <td><button>Edit User</button></td> : <></>}
                {role == "Admin" 
                ? <td><button onClick={() => {
                    let inputData = {
                        jwt: jwt,
                        uuid: user.uuid
                    }
                    deleteUserMutation({
                        variables: {
                            inputData
                        }

                    })
                }}>Delete User</button></td> : <></>}
                </tr>
            ))}
        </tbody>
        </table>
        </>
    )
}
export default UserManagement