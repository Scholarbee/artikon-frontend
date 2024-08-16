import { useEffect, useState } from "react";
import { Box, Button, Container, Grid, Paper, useMediaQuery, useTheme } from "@mui/material";
import Navbar from "../../components/global/Navbar";
import PostCard from "../../components/post/PostCard";
import Footer from "../../components/global/Footer";
import { getPosts } from "../../redux/posts/postActions";
import { toast } from "react-toastify";
import moment from "moment";
import Loader from "../../components/global/Loader";

import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Carousel from "react-material-ui-carousel";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const getAllPosts = async () => {
    setLoading(true);
    try {
      const data = await getPosts();
      setPosts(data.data);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const showPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data.data);
      false;
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

        <Container sx={{ pt: 2, pb: 5, minHeight: "83vh" }}>
          <Box sx={{ maxWidth: "100%", flexGrow: 1, marginBottom: 4 }}>
            <Carousel
              autoPlay={true}
              navButtonsAlwaysVisible={isSmallScreen}
              interval={3000}
              next={(next, active) => <Button>{<KeyboardArrowRight />}</Button>}
              prev={(prev, active) => <Button>{<KeyboardArrowLeft />}</Button>}
            >
              {images.map((item, index) => (
                <Paper key={index} sx={{ padding: 2, textAlign: "center" }}>
                  <Box
                    component="img"
                    src={item.imgPath}
                    alt={item.label}
                    sx={{
                      width: "100%",
                      height: { xs: 350, md: 500 },
                      objectFit: "cover",
                    }}
                  />
                  <Box sx={{ marginTop: 2 }}>
                    <h3>{item.label}</h3>
                  </Box>
                </Paper>
              ))}
            </Carousel>
          </Box>
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
                      showPosts={showPosts}
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

const images = [
  {
    label: "ArtiKon carousel image 1",
    imgPath: "/carousel-img/p1.jpg",
  },
  {
    label: "ArtiKon carousel image 2",
    imgPath: "/carousel-img/p2.jpg",
  },
  {
    label: "ArtiKon carousel image 3",
    imgPath: "/carousel-img/p3.jpg",
  },
  {
    label: "ArtiKon carousel image 4",
    imgPath: "/carousel-img/p4.jpg",
  },
  {
    label: "ArtiKon carousel image 5",
    imgPath: "/carousel-img/p5.jpg",
  },
  {
    label: "ArtiKon carousel image 6",
    imgPath: "/carousel-img/p6.jpg",
  },
  {
    label: "ArtiKon carousel image 7",
    imgPath: "/carousel-img/p7.jpg",
  },
  {
    label: "ArtiKon carousel image 8",
    imgPath: "/carousel-img/p8.jpg",
  },
  {
    label: "ArtiKon carousel image 9",
    imgPath: "/carousel-img/p9.jpg",
  },
  {
    label: "ArtiKon carousel image 10",
    imgPath: "/carousel-img/p10.jpg",
  },
];
