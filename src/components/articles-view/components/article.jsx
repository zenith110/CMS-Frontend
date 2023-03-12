import { gql, useMutation} from '@apollo/client'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
const Article = ({articleUuid, articleName, articleDescription, author}) => {
    const { uuid } = useParams();
    const navigate = useNavigate();
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
                }
        }
    }
    `
    const DeleteArticleQuery = gql`
    mutation deletearticle($deleteArticleInput: DeleteBucketInfo){
        deleteArticle(input: $deleteArticleInput)
    }
    `
    const jwt = sessionStorage.getItem("JWT");
    const role = sessionStorage.getItem("role");

    let deleteArticleInput = {
        uuid: articleUuid,
        jwt,
        project_uuid: uuid,
        articlename: articleName,
        username: author
    }
    const [deleteArticles] = useMutation(DeleteArticleQuery, {
        refetchQueries: [
            articlesQuery
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
            <Button size="small">Update Article</Button>
        </CardActions>
        </Card>
        </>
    )
}
export default Article;