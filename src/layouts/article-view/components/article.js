/* eslint-disable no-unused-vars */
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { gql, useMutation} from "@apollo/client";
import Typography from '@mui/material/Typography';
import Pencil from "./img/editing.png"
import Eraser from "./img/delete-article.png"
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import SlateEditor from "../../article-creation/components/slate-editor";
import HtmlDeserailizer from "../../article-creation/components/html-deserailizer";
import HTMLSerializer from "../../article-creation/components/html-serializer";

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
};

const Article = ({ArticleData}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [title, setTitleName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [titleCard, setTitleCard] = useState({})
  const articleContentParsed = new DOMParser().parseFromString(ArticleData.contentData, "text/html")
  const deserializedData = HtmlDeserailizer(articleContentParsed.body)
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
  const [value, setValue] = useState(deserializedData)
  const deleteArticleClient = gql`
          mutation($DeleteBucket: DeleteBucketInfo){
          deleteArticle(input: $DeleteBucket){
              uuid
              }
          }
      `;
    
  const updateArticleClient = gql`
          mutation($updatedArticle: UpdatedArticleInfo){
          updateArticle(input: $updatedArticle){
              uuid
              }
          }
      `;
    /*
  Gets the file, and modifies it to be an ArrayBuffer to be used for uploading to s3
  */
  const arrayBufferCreation = async(file) => {
    return new Promise((resolve, reject) => {
      let titleCardReader = new FileReader()
      titleCardReader.onload = () =>{
        resolve(titleCardReader.result)
      }
      titleCardReader.onerror = reject
      titleCardReader.readAsArrayBuffer(file)
    })
  }
  const [deleteArticle, { data, loading, error }] = useMutation(deleteArticleClient, {
     refetchQueries: [
      articleViewQuery
    ]
  });
  const [updateArticle, { dataUpdate, loadingUpdate, errorUpdate}] = useMutation(updateArticleClient, {
    refetchQueries: [
      articleViewQuery
    ]
  })
  
  let date = new Date(ArticleData.dateWritten)
  let writtenDate = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear()
  if (loading || loadingUpdate) {
    return <p>Loading Graphql data...</p>
  }
  
  // eslint-disable-next-line no-return-assign
  if (error || errorUpdate) return `Submission error! ${error.message}`;
    return(
        <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
           <label>
              <input
                style={{ textAlign: "center" }}
                type="text"
                id="title"
                name="title"
                placeholder={ArticleData.title}
                onChange={(event) => setTitleName(event.target.value)}
              />
            </label>
            <br/>
            <label>
              <input
                style={{ textAlign: "center" }}
                type="text"
                id="description"
                name="description"
                placeholder={ArticleData.description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </label>
            <br/>
            <label>Title Card:</label>
            <br/>
            <input type="file" id="myFile" name="filename" accept=".png, .jpg, .jpeg" onChange={e => setTitleCard(e.target.files[0])} />
            <SlateEditor value={value} setValue={setValue} />
              <label>
              <input
                style={{ textAlign: "center" }}
                type="text"
                id="tags"
                name="tags"
                placeholder={ArticleData.tags}
                onChange={(event) => setTags(event.target.value.split(","))}
              />
            </label>
            <br/>
          <Button onClick={async() => {
            let data = await arrayBufferCreation(titleCard)
             let tagStorage = []
              for(let tag = 0; tag < tags.length; tag++){
                tagStorage.push({
                  name: tags[tag]
                })
              }
             let updateArticleData = {  
                  title: title,
                  titleCard: {
                    name: titleCard.name,
                    fileData: new File([data], titleCard.name, {
                      type: titleCard.type
                    }),
                    contentType: titleCard.type
                  },
                  contentData: HTMLSerializer(value[0]),
                  dateWritten: date,
                  url: title.toLowerCase().replace(" ", "_"),
                  description: description,
                  uuid: ArticleData.uuid,
                  tags: tagStorage
                }
            
            updateArticle({
                    variables: {
                        updatedArticle: updateArticleData
                    },
                })
                handleClose()
          }}>Submit</Button>
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
        <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {ArticleData.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
              {ArticleData.description}
          </Typography>
        </CardContent>
        <CardActions>
             <input type="image" src={Pencil} alt="Pencil" onClick={handleOpen}/>
             <input type="image" src={Eraser} alt="Eraser" onClick={() => {
                let DeleteBucketInfo = {
                  uuid: ArticleData.uuid,
                  bucketName: ArticleData.title
                }
                deleteArticle({
                    variables: {
                        DeleteBucket: DeleteBucketInfo
                    },
                })}
            }/>
            <Button size="small" onClick={() => window.open(window._env_.BLOGURL + "/" + ArticleData.url)}>Published: {writtenDate}</Button>
            </CardActions>
      </Card>
    </div>
    )
}
export default Article