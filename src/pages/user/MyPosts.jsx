import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import PostTable from "../../components/post/PostTable";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

function MyPosts() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card sx={{ height: "auto" }}>
            <CardContent>
              <Typography variant="h4" sx={{ color: "black"}}>
                Posts
              </Typography>
              <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<AddIcon />}
                >
                  <Link
                    style={{ color: "white", textDecoration: "none" }}
                    to="/posts/create-post"
                  >
                    Create Post
                  </Link>{" "}
                </Button>
              </Box>
              <PostTable />
            </CardContent>
          </Card>
        </Grid>
        {/* <Grid item xs={4}>
          <Card sx={{ height: 60 + "vh" }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                My Orders
              </Typography>
            </CardContent>
          </Card>
        </Grid> */}
      </Grid>
    </>
  );
}

export default MyPosts;
