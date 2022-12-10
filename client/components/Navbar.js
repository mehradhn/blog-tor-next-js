import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
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
import PetsIcon from "@mui/icons-material/Pets";
import Link from "next/link";
import { Me } from "../pages/api/blogAPIs";
import { useMutation } from "@tanstack/react-query";
import Cookies from "universal-cookie";
import CircularIndeterminate from "./CircularIndeterminate";
const pages = ["HOME", "LOGIN", "BLOGS", "AUTHERS", "TOP-AUTHERS", 'TOP-BLOGS'];
const settings = ["Dashboard", "Logout"];

function Navbar() {
  const [loading, setLoading] = useState(true);
  const [isUser, setIsUser] = useState(false);
  const [user, setUser] = useState(false);
  const router = useRouter();
  const cookies = new Cookies();
  const token = cookies.get("token");
  const isLogin = useMutation({
    mutationFn: Me,
    onSuccess: (res) => {
      // console.log(res.data);
      pages.splice(1, 1);
      setIsUser(true);
      setUser(res.data);
      setLoading(false);
    },
  });

  // console.log(token)
  useEffect(() => {
    if (token) {
      isLogin.mutate();
    } else setLoading(false);
  }, []);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting) => {
    if (setting === "Logout") {
      cookies.remove("token", { path: "/" });
      setAnchorElUser(null);
      window.location.href = "http://localhost:3000/";
    } else {
      window.location.href = "http://localhost:3000/dashboard";
    }
  };

  const naviagateHandler = (page) => {
    // console.log(`page is ${page}`)
    if (page === "HOME") {
      router.push("/");
    } else {
      router.push(`/${page.toLocaleLowerCase()}`);
    }
  };

  if (loading) return <CircularIndeterminate />;

  return (
    <AppBar style={{ background: "#2E3B55", margin: 0 }} position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
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
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography
                    onClick={() => naviagateHandler(page)}
                    textAlign="center"
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Typography onClick={() => naviagateHandler(page)}>
                  {page}
                </Typography>
              </Button>
            ))}
          </Box>
          {isUser && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="profile-avatar"
                    src={"http://localhost:4000/" + user.avatar}
                  >
                    <Avatar alt="default-image" src={"/images/unknown.png"} />
                  </Avatar>
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleCloseUserMenu(setting)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
