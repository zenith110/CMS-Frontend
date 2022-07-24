import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Import React dependencies.
import React, { useState } from "react";


// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import { gql, useMutation } from "@apollo/client";
import SlateEditor from "./components/slate-editor";
import HTMLSerializer from "./components/html-serializer";
import { v4 as uuidv4 } from 'uuid';

// import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
function CreateArticle() {
  const navigate = useNavigate();
  const [title, setTitleName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [titleCard, setTitleCard] = useState({})
  /*
  Set inital content value for the editor
  */
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ]);
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
  Query to grab all the articles
  */
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
      articleViewQuery
    ]
  });
  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;
  const currentDate = new Date();
  let date = currentDate.toISOString()
  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <MDBox mt={8}>
        <MDBox mb={3}>
          <Grid container spacing={3} alignItems="center" justifyContent="center" >
            <Grid item xs={12} lg={8} alignItems="center" justifyContent="center">
              <Grid container spacing={3} alignItems="center" justifyContent="center">
                <Grid item xs={12} xl={6} alignItems="center" justifyContent="center" style={{ border: "1px solid grey" }}>
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
                    {/* <br/> */}
                    <input type="file" id="myFile" name="filename" accept=".png, .jpg, .jpeg" onChange={e => setTitleCard(e.target.files[0])} />
                    <SlateEditor value={value} setValue={setValue} />
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
                        let data = await arrayBufferCreation(titleCard)
                        /*TODO: Modify author to include authed author*/
                        let newArticleData = {  
                              title: title,
                              // titleCard: titleCard,
                              author: "Abrahan",
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
                              uuid: uuidv4(),
                              tags: tagStorage
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
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}
export default CreateArticle;
