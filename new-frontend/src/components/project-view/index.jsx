import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useMutation, gql } from '@apollo/client'
const Project = ({uuid, projectName, description}) => {
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
    const deleteProjectQuery = gql`
    mutation($deleteProject: DeleteProjectType){
        deleteProject(input: $deleteProject)
    }
    `
    
    const username = localStorage.getItem("username")
    const jwt = localStorage.getItem("JWT")
    
    // When a project is deleted, refresh the projects query
    const [deleteProjectMutation] = useMutation(deleteProjectQuery, {
        refetchQueries: [
            projectsQuery
          ]
    });
    const deleteProject = {
        jwt,
        username,
        uuid,
        project: projectName
    }
    return(
        <>
        <Card sx={{ minWidth: 275 }} key={uuid}>
        <CardContent>
        <Typography gutterBottom variant="h5" component="div">
            {projectName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
              {description}
          </Typography>
        </CardContent>
        <CardActions>
            <Button size="small">{projectName} Articles page</Button>
            <Button size="small">Edit</Button>
            <Button size="small" onClick={() => deleteProjectMutation(
                {
                    variables: {
                        deleteProject
                    }
                }
            )}>Delete</Button>
        </CardActions>
        </Card>
        </>
    )
}
export default Project