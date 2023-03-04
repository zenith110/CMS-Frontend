import { useQuery, gql, useMutation } from '@apollo/client'
import {useNavigate } from 'react-router-dom';
import Project from "./projects-view/index"
import "./dashboard.css"
const Dashboard = () => {
    const navigate = useNavigate();
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    const jwt = localStorage.getItem("JWT");
    const projectsQuery = gql`
        query projects($projectsInfo: GetProjectType){
            getProjects(input: $projectsInfo){
                projects{
                    uuid
                    name
                    author
                    description
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
        }`;
    let projectsInfo = {
        jwt: jwt,
        username: username,
        password: password
    }

    const { data, loading, error} = useQuery(projectsQuery, {
        variables: {
            projectsInfo
        },
        notifyOnNetworkStatusChange: true
    });
    const deleteProjectsQuery = gql`
            mutation DeleteAllProjects($selectedProjects: DeleteAllProjects){
                deleteProjects(input: $selectedProjects)
            }
        `;
    const [deleteAllProjects] = useMutation(deleteProjectsQuery, {
        refetchQueries: [
            projectsQuery
        ]
    });
    if (loading) return <p>Loading Graphql data...</p>
    
    if (error) return `Submission error! User is not authenticated!`;
    const selectedProjects = {
        username, 
        jwt
    }
    return(
        <>
        <button onClick={() => navigate("/project-creation")}>Create new Project</button>
        <button onClick={() => deleteAllProjects({
            variables:
            {
                selectedProjects
            }
        })}>Delete All Projects</button>
        <button onClick={() => {
            localStorage.removeItem("JWT");
            localStorage.removeItem("username", username);
            localStorage.removeItem("password", password)
            navigate("/")
        }}>Log out</button>
        {data.getProjects.projects.map((project) => (
            <div className="project" key={project.uuid}>
                <Project key={project.uuid} uuid={project.uuid} projectName={project.name} description={project.description}/>
            </div>
        ))
        }
        </>
    )
}   
export default Dashboard