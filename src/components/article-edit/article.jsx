
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ReactMarkdown from 'react-markdown'
const ArticleToBeUpdated = ({ data, updateArticle, articleuuid, jwt, project_uuid}) => {
    const ArticleData = data.articlePrivate;
    const navigate = useNavigate();
    const [title, setTitleName] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState([]);
    const [titleCard, setTitleCard] = useState({})
    const [content, setContent] = useState(ArticleData.contentData);
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
    
    
    const tagsArray = []
    
    ArticleData.tags.map((tag) => {
        tagsArray.push(tag.tag)
    })
    const previousTags = tagsArray.join(",");
    return(
        <div style={{textAlign: "center"}}>
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
        <label>Title Card </label>
        <input type="file" id="myFile" name="filename" accept=".png, .jpg, .jpeg" onChange={e => setTitleCard(e.target.files[0])} />
        <br/>
        <label>
        <input
            style={{ textAlign: "center" }}
            type="text"
            id="tags"
            name="tags"
            placeholder={previousTags}
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
        onClick={async (e) => {
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
            let updateArticleData = {  
                title: title,
                titleCard: {
                  name: titleCard.name,
                  fileData: new File([data], titleCard.name, {
                    type: titleCard.type
                  }),
                  contentType: titleCard.type
                },
                contentData: content,
                url: title.toLowerCase().replace(" ", "_"),
                description: description,
                uuid: articleuuid,
                tags: tagStorage,
                jwt: jwt,
                project_uuid: project_uuid,
                originalfoldername: ArticleData.title
              }
            updateArticle({
            variables: {
                UpdateArticle: updateArticleData
            },
            });
            navigate(-1);
        }}
        >
        Submit Data
        </Button>
        <br/>
        <Button onClick={() => navigate(-1)}>Back</Button>
        </div>
    )
}
export default ArticleToBeUpdated