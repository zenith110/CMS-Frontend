import { useMutation, gql} from '@apollo/client'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import {useNavigate} from 'react-router-dom';
const ProjectCreation = () => {
    const navigate = useNavigate();
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("")
    const projects = gql`
        query projects($projectsInfo: GetProjectType){
            getProjects(input: $projectsInfo){
                projects{
                    uuid
                    name
                    author
                    articles{
                        article{
                            title
                            author{
                                name
                            }
                            contentData
                            dateWritten
                            url
                            uuid
                            description
                        }
                    }
                }
            }
        }
    `
    const createProject = gql`
    mutation($createProjectInput: CreateProjectInput){
        createProject(input: $createProjectInput){
            uuid
        }
    }
    `
    const username = localStorage.getItem("username")
    const password = localStorage.getItem("password")
    const jwt = localStorage.getItem("JWT")

    // When a project is created, refresh the projects query
    const [createProjectMutation] = useMutation(createProject, {
        refetchQueries: [
            projects
          ]
    });

    return(
        <>
        <label>Project Name</label>: <input type="text" onChange={(e) => setProjectName(e.target.value)}></input>
        <br/>
        {/* setProjectDescription(e.target.value) */}
        <label>Project Description</label>: <input type="text" onChange={(e) => setProjectDescription(e.target.value)}></input>
        <button onClick={() => {
            let createProjectInput = {
                uuid: uuidv4(),
                name: projectName,
                username,
                password,
                jwt,
                role: "Creator",
                author: username,
                description: projectDescription
            }
            createProjectMutation({
                variables: {
                    createProjectInput
                }
            });
            navigate(-1);
        }}>Submit</button>
        </>
    )
}
export default ProjectCreation