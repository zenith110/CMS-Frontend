import { useQuery, gql, useMutation} from "@apollo/client"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./article.css"
import Article from "./components/article";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from "react";
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
const ArticlesView = () => {
    const { uuid } = useParams();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const role = sessionStorage.getItem("role");
    const articlesQuery = gql`
    query articles($articlesInput: ArticlesPrivate){
        articlesPrivate(input: $articlesInput){
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
                tags{
                    tag
                }
            }
            ZincPassword
        }
    }
    `
    const jwt = sessionStorage.getItem("JWT")
    let articlesInput = {
        jwt,
        project_uuid: uuid
    }
    const DeleteArticlesQuery = gql`
    mutation deleteallarticles($deleteAllArticlesInput: DeleteAllArticlesInput){
        deleteAllArticles(input: $deleteAllArticlesInput)
    }
    `
    let deleteAllArticlesInput = {
        jwt,
        project_uuid: uuid
    }
    const { data, loading, error} = useQuery(articlesQuery, {
        variables: {
            articlesInput
        },
        notifyOnNetworkStatusChange: true,
    });
    const [deleAllArticles] = useMutation(DeleteArticlesQuery, {
        refetchQueries: [
            articlesQuery
          ]
    });
    if (loading) return <p>Loading Graphql data...</p>
    
    if (error) return `Submission error! ${error.message}`;
    return(
        <>
        <button onClick={() => {
            navigate(`/projects/${uuid}/article-creation`)
        }}>Create Article</button>
        {role == "Admin" ?
        <> 
        <button onClick={handleOpen}>Show Password</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Credentials for searching
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {`Username:${uuid}`}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {`Password:${data.articlesPrivate.zincPassword}`}
                </Typography>
                <Button onClick={() => handleClose()}>Close</Button>
                </Box>
            </Modal>
            </> : <></> 
            }
        {data.articlesPrivate.article.length > 0 ?< button onClick={() => {
            deleAllArticles({
                variables:{
                    deleteAllArticlesInput
                }
            })
        }}>Delete All Articles</button> : <></>}
        <button onClick={() => {
            navigate(-1);
        }}>Go Back</button>
        {data.articlesPrivate.article.map((article) => (
            <div className="article" key={article.uuid}>
            <Article articleUuid={article.uuid} articleName={article.title} key={article.uuid} articleDescription={article.description} author={article.author.name} ArticleData={article}/>
            </div>
        ))}
        </>
    )
}
export default ArticlesView