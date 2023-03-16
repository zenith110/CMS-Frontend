import { gql, useMutation} from '@apollo/client'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
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
const Article = ({articleUuid, articleName, articleDescription, author, ArticleData}) => {
    const { uuid } = useParams();
    const navigate = useNavigate();
    const DeleteArticleQuery = gql`
    mutation deletearticle($deleteArticleInput: DeleteBucketInfo){
        deleteArticle(input: $deleteArticleInput)
    }
    `
    const jwt = sessionStorage.getItem("JWT");
    const role = sessionStorage.getItem("role");
    
    const tags = []
    ArticleData.tags.map((tagData) => {
      tags.push(tagData.tag)
    })
    
    let deleteArticleInput = {
        uuid: articleUuid,
        jwt,
        project_uuid: uuid,
        articlename: articleName,
        username: author
    }
    const [deleteArticles] = useMutation(DeleteArticleQuery, {
        refetchQueries: [
            "articles"
          ]
    });
    return(
        <>
        <Card sx={{ minWidth: 275 }} key={uuid}>
        <CardContent>
        <Typography gutterBottom variant="h5" component="div">
            {articleName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
              {articleDescription}
          </Typography>
        </CardContent>
        <CardActions>
            {role == "Admin" || username == author ? <Button onClick={() => {
                deleteArticles({
                    variables: {
                        deleteArticleInput
                    }
                })
            }}>Delete Article</Button> : <></>}
            <Button size="small" onClick={() => {
                navigate(`/projects/${uuid}/articles/${articleUuid}`)
            }}>View Article</Button>
            <Button size="small" onClick={() => {
              navigate(`/projects/${uuid}/articles/${articleUuid}/edit`)
            }}>Update Article</Button>
        </CardActions>
        </Card>
        </>
    )
}
export default Article;