import { gql, useMutation} from '@apollo/client'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Button from '@mui/material/Button';
import ReactMarkdown from 'react-markdown'
const ArticleCreation = () => {
    const { uuid } = useParams();
    const jwt = sessionStorage.getItem("JWT")
    const navigate = useNavigate();
    const [title, setTitleName] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState([]);
    const [titleCard, setTitleCard] = useState({})
    const [content, setContent] = useState("");
    /*
    Query to add more articles
    */
    const createArticleClient = gql`
      mutation($newArticle: CreateArticleInfo){
      createArticle(input: $newArticle){
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
    /*
    Creates the mutation result variables, and refetches the articleview query when the mutation is sucessful
    */
    const [createArticle, { data, loading, error }] = useMutation(createArticleClient, {
      refetchQueries: [
        "articles"
      ]
    });
    if (loading) return "Submitting...";
    if (error) return `Submission error! ${error.message}`;
    const currentDate = new Date();
    let date = currentDate.toISOString()
    return (
    <div style={{textAlign: "center"}}>
        <label>
        <input
            style={{ textAlign: "center" }}
            type="text"
            id="title"
            name="title"
            placeholder="title"
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
            placeholder="description"
            onChange={(event) => setDescription(event.target.value)}
        />
        </label>
        <br/>
        <label>Title Card </label>
        <input type="file" id="myFile" name="filename" accept=".png, .jpg, .jpeg" onChange={e => setTitleCard(e.target.files[0])} />
        <br/>
        <label>
        <input
            style={{ textAlign: "center" }}
            type="text"
            id="tags"
            name="tags"
            placeholder="tags"
            onChange={(event) => setTags(event.target.value.split(","))}
        />
        </label>
        <br/>
        <textarea rows="4" cols="50" onChange={(e) => setContent(e.target.value)} value={content}>
        
        </textarea>
        <ReactMarkdown children={content}/>
        <br/>
        <Button
        style={{ textAlign: "center" }}
        onClick={async () => {
            let tagStorage = []
            for(let tag = 0; tag < tags.length; tag++){
            tagStorage.push({
                name: tags[tag]
            })
            }
            /*
            Creates an arraybuffer that we can convert to a binarystring to pass to S3
            */
            let data = await arrayBufferCreation(titleCard);
            let newArticleData = {  
                title: title,
                titleCard: {
                    name: titleCard.name,
                    fileData: new File([data], titleCard.name, {
                    type: titleCard.type
                    }),
                    contentType: titleCard.type
                },
                contentData: content,
                dateWritten: date,
                url: title.toLowerCase().replace(" ", "_"),
                description: description,
                uuid: uuidv4(),
                tags: tagStorage,
                project_uuid: uuid,
                jwt
                }
            createArticle({
            variables: {
                newArticle: newArticleData
            },
            });
            navigate(-1);
        }}
        >
        Submit Data
        </Button>
        <br/>
        <Button onClick={() => navigate(-1)}>Back</Button>
    </div>)            
}
export default ArticleCreation