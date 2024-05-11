import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/authSlice";
import useRedirectLoggedOutUser from "../../services/useRedirectLoggedOutUser";

function UserDashboard() {
  useRedirectLoggedOutUser("/login");
  const isLoggedIn = useSelector(selectIsLoggedIn);
  // const { products, isLoading, isError, message } = useSelector(
  //   (state) => state.product
  // );

  useEffect(() => {
    if (isLoggedIn === true) {
      console.log(isLoggedIn);
      // dispatch(getProducts());
    }

  }, [isLoggedIn]);
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Card sx={{ height: 60 + "vh" }}>
            <CardContent></CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ height: 60 + "vh" }}>
            <CardContent></CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* </Box> */}
    </>
  );
}

export default UserDashboard;
