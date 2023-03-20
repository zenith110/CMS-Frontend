import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useMutation, gql } from '@apollo/client'
import { useNavigate } from 'react-router-dom';
const Project = ({uuid, projectName, description}) => {
    const navigate = useNavigate();
    const deleteProjectQuery = gql`
    mutation($deleteProject: DeleteProjectType){
        deleteProject(input: $deleteProject)
    }
    `

    const jwt = sessionStorage.getItem("JWT");
    const role = sessionStorage.getItem("role");
    // When a project is deleted, refresh the projects query
    const [deleteProjectMutation] = useMutation(deleteProjectQuery, {
        refetchQueries: [
            "projects"
          ]
    });
    const deleteProject = {
        jwt,
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
            <Button size="small" onClick={() => {
                navigate(`/projects/${uuid}`)
            }}>Articles page</Button>
            <Button size="small">Edit</Button>
            {role == "Admin" ? <Button size="small" onClick={() => deleteProjectMutation(
                {
                    variables: {
                        deleteProject
                    }
                }
            )}>Delete</Button> : <></>}
        </CardActions>
        </Card>
        </>
    )
}
export default Project