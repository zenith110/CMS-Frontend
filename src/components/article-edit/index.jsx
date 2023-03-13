import { gql, useMutation, useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom';
import ArticleToBeUpdated from './article';
const EditArticle = () => {
    const { articleuuid, uuid } = useParams();
    const jwt = sessionStorage.getItem("JWT")
    const fetchArticleQuery = gql`
        query($articleInput: FindArticlePrivateType){
            articlePrivate(input: $articleInput){
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
        }
    `

    /*
    Query to add more articles
    */
    const UpdateArticleMutation = gql`
      mutation($UpdateArticle: UpdatedArticleInfo){
        updateArticle(input: $UpdateArticle){
        uuid
       }
      }
    `;
     
    
    /*
    Creates the mutation result variables, and refetches the articleview query when the mutation is sucessful
    */
    const [updateArticle] = useMutation(UpdateArticleMutation, {
      refetchQueries: [
        "articles"
      ]
    });
    let articleInput = {
        jwt,
        project_uuid: uuid,
        uuid: articleuuid
    } 
    const { data, loading, error} = useQuery(fetchArticleQuery, {
        variables: {
            articleInput
        },
        notifyOnNetworkStatusChange: true,
    });
    if (loading) return "Submitting...";
    if (error) return `Submission error! ${error.message}`;
    
    return (
        <>
        <ArticleToBeUpdated data={data} updateArticle={updateArticle} articleuuid={articleuuid} jwt={jwt} project_uuid={uuid}/>
        </>
    )            
}
export default EditArticle