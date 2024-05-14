import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/authSlice";
import useRedirectLoggedOutUser from "../../services/useRedirectLoggedOutUser";

function UserDashboard() {
  useRedirectLoggedOutUser("/login");
  
  return (
    <>
      <h3>User Dashboard is under development</h3>
      <div>Will be ready ASAP 😍👍</div>
    </>
  );
}

export default UserDashboard;
