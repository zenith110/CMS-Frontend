/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { gql, useQuery, useMutation} from "@apollo/client";
import Grid from "@mui/material/Grid";
import Article from "./components/article";
import "./article-view.css"
// Material Dashboard 2 React components
import { useNavigate } from "react-router-dom"

function ArticleView(){
    const navigate = useNavigate()
    const articleViewQuery = gql`
    query{
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
    }`;
  
  const { data, loading, error } = useQuery(articleViewQuery, {notifyOnNetworkStatusChange: true});
  const deleteArticlesClient = gql`
            mutation{
            deleteAllArticles{
                uuid
                }
            }
        `;
  const [deleteAllArticles, { deleteData, deleteLoading, deleteError }] = useMutation(deleteArticlesClient, {
    refetchQueries: [
      articleViewQuery
    ]
  });
  if (loading || deleteLoading) {
    return <p>Loading Graphql data...</p>
  }
  // eslint-disable-next-line no-return-assign
  if (error || deleteError) return `Submission error! ${error.message}`;
  const createArticle = () => {
    navigate("create/");
  }
  return(
      <DashboardLayout>
        <DashboardNavbar absolute isMini />
                        <Grid
                        container
                        spacing={2}
                        direction="row"
                        alignItems="center"
                        justify="center"
                        style={{ minHeight: '100vh' }}
                        >
                        {data.articles.article.map((articleData => (
                             <Grid item xs={3} key={articleData.uuid}>
                                <Article key={articleData.uuid} ArticleData={articleData}/>
                            </Grid>
                        )))}
                        </Grid>
         <div className="articleOptions">
            <button onClick={() => createArticle()}>Create Article</button>
            <button onClick={() => deleteAllArticles()}>Delete All Articles</button>
            
         </div>
      </DashboardLayout>
  )
}
export default ArticleView
