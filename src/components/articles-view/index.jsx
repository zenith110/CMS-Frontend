import { useQuery, gql, useMutation} from "@apollo/client"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./article.css"
import Article from "./components/article";
const ArticlesView = ({}) => {
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
            <Article articleUuid={article.uuid} articleName={article.title} key={article.uuid} articleDescription={article.description} author={article.author.name}/>
            </div>
        ))}
        </>
    )
}
export default ArticlesView