import { useQuery, gql, useMutation } from '@apollo/client'
import {useNavigate } from 'react-router-dom';
import Project from "./projects-view/index"
import "./dashboard.css"
const Dashboard = () => {
    const navigate = useNavigate();
    const jwt = sessionStorage.getItem("JWT");
    const role = sessionStorage.getItem("role");
    const projectsQuery = gql`
        query projects($projectsInfo: GetProjectType){
            getProjects(input: $projectsInfo){
                projects{
                    uuid
                    name
                    author
                    description
                    encryptionKey
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
        jwt
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
    const LogoutQuery =  gql`
    mutation Logout($jwt: String!){
        logout(jwt: $jwt)
    }
    `;
    const [Logout] = useMutation(LogoutQuery);
    if (loading) return <p>Loading Graphql data...</p>
    
    if (error) return `Submission error! User is not authenticated!`;
    const selectedProjects = {
        jwt
    }
    return(
        <>
        <button onClick={() => navigate("/project-creation")}>Create new Project</button>
        {data.getProjects.projects.length > 0 && role == "Admin" ? <button onClick={() => deleteAllProjects({
            variables:
            {
                selectedProjects
            }
        })}>Delete All Projects</button> : <></>}
        <button onClick={() => {
            Logout({
                variables: {
                    jwt
                }
            })
            sessionStorage.clear()
            navigate("/")
        }}>Log out</button>
        <button onClick={() => {
            navigate("/user-management");
        }}>User Management</button>
        {data.getProjects.projects.map((project) => (
            <div className="project" key={project.uuid}>
                <Project key={project.uuid} uuid={project.uuid} projectName={project.name} description={project.description} encryptionKey={project.encryptionKey}/>
            </div>
        ))
        }
        </>
    )
}   
export default Dashboard