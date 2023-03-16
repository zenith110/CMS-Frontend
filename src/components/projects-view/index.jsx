import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useMutation, gql } from '@apollo/client'
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    color: "black"
  };
const Project = ({uuid, projectName, description, encryptionKey}) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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
        {role == "Admin" ?
        <> 
        <Button onClick={handleOpen}>Show Password</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Credentials for searching on blog
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {`Username:${uuid}`}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {`Password:${uuid}-${encryptionKey}`}
                </Typography>
                <Button onClick={() => handleClose()}>Close</Button>
                </Box>
            </Modal>
            </> : <></> 
            }
        </CardActions>
        </Card>
        </>
    )
}
export default Project