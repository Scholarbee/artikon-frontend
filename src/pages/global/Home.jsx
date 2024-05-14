import React, { useEffect, useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import Navbar from "../../components/global/Navbar";
import PostCard from "../../components/post/PostCard";
import Footer from "../../components/global/Footer";
import { getPosts } from "../../redux/posts/postActions";
import { toast } from "react-toastify";
import moment from "moment";
import Loader from "../../components/global/Loader";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <>
      <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh" }}>
        <Navbar />
        <Container sx={{ pt: 5, pb: 5, minHeight: "83vh" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {loading ? (
                <Loader />
              ) : (
                posts.map((post, index) => (
                  <Grid item xs={12} sm={4} md={4} key={index}>
                    <PostCard
                      id={post._id}
                      title={post.title}
                      description={post.description ? post.description : ""}
                      image={post.coverPhoto ? post.coverPhoto.url : ""}
                      subheader={moment(post.createdAt).format("MMMM DD, YYYY")}
                      comments={post.comments.length}
                      likes={post.likes.length}
                      likesId={post.likes}
                      showPosts={getAllPosts}
                    />
                  </Grid>
                ))
              )}
            </Grid>
          </Box>
        </Container>
        <Footer />
      </Box>
    </>
  );
}

export default Home;
