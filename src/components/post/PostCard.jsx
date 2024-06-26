import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red, teal } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import InfoIcon from "@mui/icons-material/Info";
import { Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addLke, removeLike } from "../../redux/posts/postActions";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/authSlice";
import { useState } from "react";
//import image from '../images/blog.jpg'

const PostCard = ({
  id,
  title,
  subheader,
  image,
  description,
  comments,
  likes,
  showPosts,
  likesId,
}) => {
  const userInfo = useSelector(selectUser);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  //add like
  const handleAddLike = async () => {
    try {
      // setIsLoading(true);
      const data = await addLke(id);
      if (data.success == true) {
        showPosts();
        // setIsLoading(false);
      }
      // setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data.error);
      // setIsLoading(false);
    }
  };

  //remove like
  const handleRemoveLike = async () => {
    try {
      // setIsLoading(true);
      const data = await removeLike(id);
      if (data.success == true) {
        showPosts();
        // setIsLoading(false);
      }
      // setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data.error);
      // setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: teal[200] }} aria-label="recipe" />}
        title={title}
        subheader={subheader}
      />
      {/* <Link to={`/post/${id}`}> */}
      <CardMedia component="img" height="240" image={image} alt="Artikon" />
      {/* </Link> */}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {/* {content} */}

          <Box
            component="span"
            dangerouslySetInnerHTML={{
              __html: description.split(" ").slice(0, 5).join(" ") + "...",
            }}
          ></Box>
        </Typography>
      </CardContent>
      <CardActions>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            {likesId.includes(userInfo && userInfo.id) ? (
              <IconButton
                disabled={isLoading}
                onClick={handleRemoveLike}
                aria-label="add to favorites"
              >
                <FavoriteIcon sx={{ color: "teal" }} />
              </IconButton>
            ) : (
              <IconButton
                disabled={isLoading}
                onClick={handleAddLike}
                aria-label="add to favorites"
              >
                <FavoriteBorderIcon sx={{ color: "teal" }} />
              </IconButton>
            )}
            {likes} Like(s)
          </Box>
          <Box>
            {/* {comments} */}
            <IconButton
              aria-label="info"
              onClick={() => navigate("/post/info/" + id)}
            >
              <InfoIcon />
            </IconButton>
          </Box>
          <Box>
            {comments}
            <IconButton
              aria-label="comment"
              onClick={() => navigate("/post/comments/session/" + id)}
            >
              <CommentIcon />
            </IconButton>
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
};

export default PostCard;
