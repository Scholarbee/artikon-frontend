/* eslint-disable react/display-name */
import { Box, Container } from "@mui/material";
import React from "react";
import Navbar from "../components/global/Navbar";
import Sidebar from "../components/global/Sidebar";

const Layout =
  (Component) =>
    ({ ...props }) => {
    
    return (
      <>
        {/* <Container> */}
          <div style={{ display: "flex", minHeight: "100vh" }}>
            <Sidebar />
            <Box sx={{ width: "100%", bgcolor: "rgb(232, 232, 232)" }}>
              <Navbar />
              <Box sx={{ p: 2 }}>
                <Component {...props} />
              </Box>
            </Box>
          </div>
        {/* </Container> */}
      </>
    );
  };

export default Layout;
