import { useMutation, gql} from '@apollo/client'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import {useNavigate} from 'react-router-dom';
import "./index.css"
const ProjectCreation = () => {
    const navigate = useNavigate();
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const createProject = gql`
    mutation($createProjectInput: CreateProjectInput){
        createProject(input: $createProjectInput){
            uuid
        }
    }
    `
    
    const jwt = sessionStorage.getItem("JWT")

    // When a project is created, refresh the projects query
    const [createProjectMutation] = useMutation(createProject, {
        refetchQueries: ['projects']
    });

    return(
        <div className='projectcreation'>
        <label className='textLabel'>Project Name</label>
        <input type="text" onChange={(e) => setProjectName(e.target.value)}></input>
        <br/>
        <label className='textLabel'>Project Description</label>
        <input type="text" onChange={(e) => setProjectDescription(e.target.value)}></input>
        <br/>
        <button className="submitbutton" onClick={() => {
            let createProjectInput = {
                uuid: uuidv4(),
                name: projectName,
                jwt,
                role: "Creator",
                description: projectDescription
            }
            createProjectMutation({
                variables: {
                    createProjectInput
                }
            });
            navigate(-1);
        }}>Submit</button>
        <br/>
        <button className="backbutton" onClick={() => {
            navigate(-1);
        }}>Go Back</button>
        </div>
    )
}
export default ProjectCreation