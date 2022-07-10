import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";
const VideosView = () => {
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
              <p>Yo</p>
            </Grid>
        </DashboardLayout>
    )
}
export default VideosView