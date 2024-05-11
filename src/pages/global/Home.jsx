import React from "react";
import { Box, Container, Grid } from "@mui/material";
import Navbar from "../../components/global/Navbar";
import PostCard from "../../components/post/PostCard";
import Footer from "../../components/global/Footer";

function Home() {
  return (
    <>
      <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh" }}>
        <Navbar />
        <Container sx={{ pt: 5, pb: 5, minHeight: "83vh" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid>
              <PostCard />
            </Grid>
          </Box>
        </Container>
        <Footer/>
      </Box>
    </>
  );
}

export default Home;
