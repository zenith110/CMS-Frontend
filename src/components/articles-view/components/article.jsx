import { gql, useMutation} from '@apollo/client'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
const Article = ({articleUuid, articleName}) => {
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
    const username = localStorage.getItem("username")
    const jwt = localStorage.getItem("JWT")
    const password = localStorage.getItem("password")
    let deleteArticleInput = {
        uuid: articleUuid,
        username,
        password,
        jwt,
        project_uuid: uuid,
        articlename: articleName
    }
    const [deleteArticles] = useMutation(DeleteArticleQuery, {
        refetchQueries: [
            articlesQuery
          ]
    });
    return(
        <>
        <p>{articleName}</p>
        <button onClick={() => {
            deleteArticles({
                variables: {
                    deleteArticleInput
                }
            })
        }}>Delete Article</button>
        <button>View Article</button>
        <button>Update Article</button>
        </>
    )
}
export default Article;