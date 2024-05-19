import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostInfo } from "../../redux/posts/postActions";
import { BACKEND_URL } from "../../redux/auth/authActions";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import useRedirectLoggedOutUser from "../../services/useRedirectLoggedOutUser";
import { Box, Button, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { selectIsLoggedIn } from "../../redux/auth/authSlice";
import moment from "moment";

function PostInfo() {
  useRedirectLoggedOutUser("/login");
  const userInfo = useSelector(selectIsLoggedIn);

  const [ref, setRef] = useState("");
  const [title, setTitle] = useState("");
  const [postedBy, setPostedBy] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const { id } = useParams();

  const displaySinglePost = async () => {
    setLoading(true);
    try {
      const { data } = await getPostInfo(id);
      console.log(data);
      setRef(data.post._id);
      setTitle(data.post.title);
      setContent(data.post.description);
      setBusinessType(data.post.businessType);
      setImage(data.post.coverPhoto.url);
      setPostedBy(data.post.postedBy.name);
      setLocation(data.post.postedBy.city);
      setPhone(data.post.postedBy.phone);
      setCreatedAt(data.post.createdAt);
      // setCreatedAt(data.post.createdAt);
      // setLoading(false);
      // setComments(data.post.comments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!loading) {
      displaySinglePost();
    }
  }, []);

  // add comment
  const handleOrders = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${BACKEND_URL}/api/posts/post/place-order/${id}`,
        {
          comment,
        }
      );
      if (data.success === true) {
        setComment("");
        toast.success("comment added");
        displaySinglePost();
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  // add comment
  const handleAppointments = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${BACKEND_URL}/api/posts/post/book-appointment/${id}`,
        {
          comment,
        }
      );
      if (data.success === true) {
        setComment("");
        toast.success("comment added");
        displaySinglePost();
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <Card>
            <Box sx={{ width: "100%", height: "400px", overflow: "hidden" }}>
              <img
                src={image}
                alt={title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  overflow: "clip",
                  display: "block",
                  position: "relative",
                }}
              />
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography
                sx={{ textAlign: "center", margin: "0 0 25px 0" }}
                gutterBottom
                variant="h5"
                component="div"
              >
                {title}
              </Typography>
              <Box>
                <Typography gutterBottom variant="h7" component="div">
                  Brand Owner: {postedBy}
                </Typography>
                <Typography gutterBottom variant="h7" component="div">
                  Ref: {ref}
                </Typography>
                <Typography gutterBottom variant="h7" component="div">
                  Date Posted:{" "}
                  {moment(createdAt).format("DD MMMM, YYYY - (HH:MM)")}
                </Typography>
                <Typography gutterBottom variant="h7" component="div">
                  Phone: {phone}
                </Typography>
                <Typography gutterBottom variant="h7" component="div">
                  Address: {location}
                </Typography>
                <Typography gutterBottom variant="h7" component="div">
                  Business Type: {businessType}
                </Typography>
                <Typography gutterBottom variant="h7" component="div">
                  Category: {""}
                </Typography>
                {businessType === "service" ? (
                  <Typography gutterBottom variant="h7" component="div">
                    Service Charge: {"¢12.00"}
                  </Typography>
                ) : (
                  <Typography gutterBottom variant="h7" component="div">
                    Price: {"¢12.00"}
                  </Typography>
                )}
              </Box>
              <Box>
                <Typography
                  sx={{ margin: "20px 0 0px 0" }}
                  variant="h5"
                  // color="text.secondary "
                >
                  Description
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {content}
                </Typography>
              </Box>
              <Stack sx={{ margin: "5px 0 0 0" }}>
                {businessType === "service" ? (
                  <Button
                    href=""
                    variant="contained"
                    sx={{ backgroundColor: "teal" }}
                    // onClick={changePassword}
                    // endIcon={<SendIcon />}
                  >
                    Book Appointment
                  </Button>
                ) : (
                  <Button
                    href=""
                    variant="contained"
                    sx={{ backgroundColor: "teal" }}
                    // onClick={changePassword}
                    // endIcon={<SendIcon />}
                  >
                    Place Order
                  </Button>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default PostInfo;
