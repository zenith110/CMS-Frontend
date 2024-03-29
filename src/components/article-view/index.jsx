import { useQuery, gql } from '@apollo/client'
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown'
const ArticleView = () => {
    const { uuid, articleuuid } = useParams();
    const navigate = useNavigate();
    const articleQuery = gql`
    query article($articleInput: FindArticlePrivateType){
        articlePrivate(input: $articleInput){
            title
            contentData
            dateWritten
            titleCard
            uuid
            description
        }
    }
    `
    
    const jwt = sessionStorage.getItem("JWT")
    const articleInput = {
        project_uuid: uuid,
        uuid: articleuuid,
        jwt
    }
    const { data, loading, error} = useQuery(articleQuery, {
        variables: {
            articleInput
        },
        notifyOnNetworkStatusChange: true,
    });

    if (loading) return <p>Loading Graphql data...</p>
    
    if (error) return `Submission error! ${error.message}`;
    var isoDateTime = new Date(data.articlePrivate.dateWritten);
    var localDateTime = isoDateTime.toLocaleDateString();
    return(
        <>
        <label>Article Title: </label><p>{data.articlePrivate.title}</p>
        <br/>
        <label>Current thumbnail</label>
        <br/>
        <img src={data.articlePrivate.titleCard}/>
        <br/>
        <label>Content</label>
        <br/>
        <ReactMarkdown children={data.articlePrivate.contentData}/>
        <br/>
        <label>Date Written: </label><p>{localDateTime}</p>
        <br/>
        <label>Description: </label><p>{data.articlePrivate.description}</p>
        <br/>
        <button onClick={() => navigate(-1)}>Go Back</button>
        </>
    )
}
export default ArticleView