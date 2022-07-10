import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
const ImageCard = ({ image }) => {
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={image.url}
        alt={image.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {image.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {image.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Edit</Button>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
}
export default ImageCard