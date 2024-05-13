import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PostTable from "../../components/post/PostTable";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { getMyPosts } from "../../redux/posts/postActions";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { teal } from "@mui/material/colors";

const columns = [
  { id: "name", label: "Brand Name", minWidth: 170 },
  {
    id: "date",
    label: "Date",
    minWidth: 170,
  },
  { id: "appointments", label: "Appointment(s)", minWidth: 100 },
  {
    id: "likes",
    label: "Like(s)",
    minWidth: 100,
    align: "right",
    // format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "comments",
    label: "Comment(s)",
    minWidth: 100,
    align: "right",
  },
  {
    id: "action",
    label: "Actions",
    minWidth: 100,
    // format: (value) => value.toFixed(2),
  },
];

const rows = [
  {
    name: "My Work",
    date: "May 4, 24",
    appointments: 7,
    likes: 5,
    comments: 2,
  },
];

function MyPosts() {
  // const [rows, setRows] = React.useState(myPosts);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    myPost();
  }, []);

  const myPost = async () => {
    const posts = await getMyPosts();
    console.log(posts.data);
    setMyPosts(posts.data);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card sx={{ height: "auto" }}>
            <CardContent>
              <Typography variant="h4" sx={{ color: "black" }}>
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
              {/* importing post list */}
              {/* <PostTable posts={myPosts} /> */}
              <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow >
                        <TableCell>Brand Name</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Likes</TableCell>
                        <TableCell>Comments</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {myPosts
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((mp, i) => {
                          return (
                            <TableRow key={i}>
                              <TableCell>{mp.title}</TableCell>
                              <TableCell>{mp.businessType}</TableCell>
                              <TableCell>{mp.likes.length}</TableCell>
                              <TableCell>{mp.comments.length}</TableCell>
                              <TableCell>Edit</TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 15, 20, 25, 30, 50, 100]}
                  component="div"
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default MyPosts;
