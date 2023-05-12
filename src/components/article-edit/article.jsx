
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ReactMarkdown from 'react-markdown'
import { gql, useMutation } from '@apollo/client'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

import LinkRef from '../reusableComponents/LinkRef';
import Youtube from '../reusableComponents/Youtube';
const ArticleToBeUpdated = ({ data, updateArticle, articleuuid, jwt, project_uuid, textareaRef}) => {
    const ArticleData = data.articlePrivate;
    let { contentData } = ArticleData
    let { dateWritten } = ArticleData
    const navigate = useNavigate();
    const [title, setTitleName] = useState(ArticleData.title);
    const [description, setDescription] = useState(ArticleData.description);
    const [tags, setTags] = useState(ArticleData.tags);
    const [titleCard, setTitleCard] = useState(ArticleData.titleCard)
    const [content, setContent] = useState(contentData);
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
    const UploadImage = gql`
      mutation($uploadArticleImageInput: UploadArticleImageInput){
        uploadArticleImage(input: $uploadArticleImageInput)
      }
    `;
    
    const [uploadArticleImage] = useMutation(UploadImage, {
        onCompleted: (data) => {
            const selectionStart = textareaRef.current.selectionStart;
            const selectionEnd = textareaRef.current.selectionEnd;
            let newValue = content.substring(0, selectionStart) + `![](${data.uploadArticleImage})` + content.substring(selectionEnd, content.length);
            setContent(newValue)
        }
    });
    
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
        <label htmlFor="file-upload" className="custom-file-upload"><AddAPhotoIcon/></label>
        <input type="file" id="file-upload" name="filename" accept=".png, .jpg, .jpeg" onChange={async (e) => {
          let articleImage = e.target.files[0]
          let articleImagedata = await arrayBufferCreation(articleImage);
          let uploadArticleImageInput = {  
              file: {
                name: articleImage.name,
                fileData: new File([articleImagedata], articleImage.name, {
                  type: articleImage.type
                }),
                contentType: articleImage.type
              },
              article_uuid: articleuuid,
              project_uuid: project_uuid,
              article_name: ArticleData.title
            }
            uploadArticleImage({
            variables: {
              uploadArticleImageInput
              }
            })
        }} />
        <LinkRef setContent={setContent} textareaRef={textareaRef} content={content}/>
        <Youtube setContent={setContent} textareaRef={textareaRef} content={content}/>
        <br/>
        <textarea rows="4" cols="50" onChange={(e) => setContent(e.target.value)} value={content} ref={textareaRef}>
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
                originalfoldername: ArticleData.title,
                dateWritten: dateWritten
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