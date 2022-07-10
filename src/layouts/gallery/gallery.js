import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useNavigate } from "react-router-dom"
import Grid from "@mui/material/Grid";
import "./gallery.css"
const Gallery = () => {
    const navigate = useNavigate()
    const imagesView = () => {
        console.log("Clicking the images portion of the gallery");
        navigate("gallery/images/");
    }
    const videosView = () => {
        navigate("gallery/videos/");
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
                        ></Grid>
        <div className="galleryOptions">
            <button onClick={imagesView}>Images</button>
            <button onClick={videosView}>Video</button>
        </div>
    </DashboardLayout>
    )
}
export default Gallery