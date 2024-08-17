import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SET_LOGIN, selectIsLoggedIn } from "../../redux/auth/authSlice";
import { logoutUser } from "../../redux/auth/authActions";

const pages = ["Home", "Dashboard"];

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const logOutUser = async () => {
    await logoutUser();
    dispatch(SET_LOGIN(false));
    navigate("/");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "rgb(38, 38, 38)" }}>
      <Container>
        <Toolbar disableGutters>
          <Button onClick={() => navigate("/")}>
            <Avatar alt="logo" src="/logo.png" sx={{ width: 70, height: 70 }} />
          </Button>
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".5rem",
              color: "#f57eb6",
              textDecoration: "none",
            }}
          >
            ArtiKon
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="open navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <Link
                    to={`/`}
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    {"Home"}
                  </Link>
                </Typography>
              </MenuItem>
              {isLoggedIn ? (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link
                      to={`/user/dashboard`}
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      {"Dashboard"}
                    </Link>
                  </Typography>
                </MenuItem>
              ) : (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link
                      to={`/login`}
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      {"Login"}
                    </Link>
                  </Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#f57eb6",
              textDecoration: "none",
            }}
          >
            ArtiKon
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => {
                handleCloseNavMenu();
                navigate("/");
              }}
              sx={{ my: 2, color: "white", display: "block", mr: 2 }}
            >
              Home
            </Button>
            {isLoggedIn ? (
              <Button
                onClick={() => {
                  handleCloseNavMenu();
                  navigate("/user/dashboard");
                }}
                sx={{ my: 2, color: "white", display: "block", mr: 2 }}
              >
                Dashboard
              </Button>
            ) : (
              <Button
                onClick={() => {
                  handleCloseNavMenu();
                  navigate("/login");
                }}
                sx={{ my: 2, color: "white", display: "block", mr: 2 }}
              >
                Login
              </Button>
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src="" />
              </IconButton>
            </Tooltip>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              sx={{ mt: "45px" }}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">
                  <Link to="/profile" style={{ textDecoration: "none" }}>
                    Profile
                  </Link>
                </Typography>
              </MenuItem>
              {isLoggedIn ? (
                <MenuItem onClick={logOutUser}>
                  <Typography textAlign="center" color="#8e67b2">
                    Log Out
                  </Typography>
                </MenuItem>
              ) : (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    <Link to="/login" style={{ textDecoration: "none" }}>
                      Login
                    </Link>
                  </Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
