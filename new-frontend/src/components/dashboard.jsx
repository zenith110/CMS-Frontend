import { useQuery, gql, useMutation } from '@apollo/client'
import {useNavigate } from 'react-router-dom';
import Project from "./project-view/index"
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
        fetchPolicy: "no-cache",
        notifyOnNetworkStatusChange: true,
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
    
    if (error) return `Submission error! ${error.message}`;
    const selectedProjects = {
        username, 
        jwt
    }
    return(
        <>
        {data.getProjects.projects.map((project) => (
            <Project key={project.uuid} uuid={project.uuid} projectName={project.name} description={project.description}/>
        ))
        }
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
        </>
    )
}   
export default Dashboard