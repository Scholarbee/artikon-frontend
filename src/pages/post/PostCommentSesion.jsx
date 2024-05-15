import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Button, Divider, Grid, Stack } from "@mui/material";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { toast } from "react-toastify";
import Loader from "../../components/global/Loader";
import CommentList from "../../components/post/CommentList";
import { addComment, getPost } from "../../redux/posts/postActions";
import { selectIsLoggedIn } from "../../redux/auth/authSlice";
import { io } from "socket.io-client";
import { BACKEND_URL } from "../../redux/auth/authActions";
import useRedirectLoggedOutUser from "../../services/useRedirectLoggedOutUser";

const socket = io("/", {
  reconnection: true,
});

const PostCommentSesion = () => {
  useRedirectLoggedOutUser("/login");
  const userInfo = useSelector(selectIsLoggedIn);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentsRealTime, setCommentsRealTime] = useState([]);

  const { id } = useParams();

  const displaySinglePost = async () => {
    setLoading(true);
    try {
      const { data } = await await getPost(id);
      console.log(data);
      setTitle(data.post.title);
      setContent(data.post.description);
      setImage(data.post.coverPhoto.url);
      setCreatedAt(data.post.createdAt);
      setLoading(false);
      setComments(data.post.comments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!loading) {
      displaySinglePost();
    }
  }, []);

  useEffect(() => {
    // console.log('SOCKET IO', socket);
    socket.on("new-comment", (newComment) => {
      setCommentsRealTime(newComment);
    });
  }, []);

  // add comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${BACKEND_URL}/api/posts/add-comment/${id}`,
        {
          comment,
        }
      );
      if (data.success === true) {
        setComment("");
        toast.success("comment added");
        displaySinglePost();
        socket.emit("comment", data.post.comments);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              // avatar={
              //   <Avatar sx={{ bgcolor: red[500] }} aria-label="coverPhoto" />
              // }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={title}
              subheader={moment(createdAt).format("MMMM DD, YYYY")}
            />
            <CardMedia component="img" height="350" image={image} alt={title} />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                <Box
                  component="span"
                  dangerouslySetInnerHTML={{ __html: content }}
                ></Box>
              </Typography>
              <Divider variant="inset" />

              {comments.length === 0 ? (
                <h4>No comments yet</h4>
              ) : (
                <Typography variant="h5" sx={{ pt: 1, mb: 1 }}>
                  Comments:
                </Typography>
              )}

              <Box sx={{ overflow: "scroll", maxHeight: 440 }}>
                {comments.map((comment) => (
                  <CommentList
                    key={comment._id}
                    name={comment.postedBy.name}
                    date={moment(comment.createdAt).format(
                      "MMMM DD, YYYY (HH:MM)"
                    )}
                    text={comment.text}
                  />
                ))}
              </Box>

              {userInfo ? (
                <Stack>
                  <Grid item xs={12} sm={6} md={6}>
                    <Box
                      sx={{ pt: 1, pl: 3, pb: 3, pr: 3, bgcolor: "#fafafa" }}
                    >
                      <h5>Add your comment here!</h5>
                      <form onSubmit={handleAddComment}>
                        <Stack>
                          <TextareaAutosize
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                            aria-label="minimum height"
                            minRows={3}
                            placeholder="Add a comment..."
                            style={{ padding: "5px" }}
                          />
                        </Stack>
                        <Box sx={{ pt: 1 }}>
                          <Button type="submit" variant="contained">
                            Comment
                          </Button>
                        </Box>
                      </form>
                    </Box>
                  </Grid>
                </Stack>
              ) : (
                <>
                  <Link to="/login"> Log In to add a comment</Link>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default PostCommentSesion;
