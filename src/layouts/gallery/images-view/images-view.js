import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
import { gql, useQuery } from "@apollo/client";
import ImageCard from "./image-card";
const ImagesView = () => {
    const imageViewQuery = gql`
    query{
    getGalleryImages{
        images{
            url 
            type 
            name
            uuid
        }
    }
    }`;
    const { data, loading, error } = useQuery(imageViewQuery);
     if (loading) {
        return <p>Loading Graphql data...</p>
    }
    if (error) return `Submission error! ${error.message}`;
    console.log(data);
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
              {data.getGalleryImages.images.map((image) => 
                  <ImageCard image={image} key={image.uuid}/>
              )}
            </Grid>
        </DashboardLayout>
    )
}
export default ImagesView