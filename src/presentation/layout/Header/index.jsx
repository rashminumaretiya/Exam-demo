import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import { Link } from "react-router-dom";
import { IconButton, Menu } from "@mui/material";
import BSTypography from "../../../shared/BSTypography";
import BSStack from "../../../shared/BSStack";
import HeaderContainer from "../../../container/header";

const Header = () => {
  const {
    menuList,
    anchorElUser,
    userDropdownList,
    handleCloseUserMenu,
    handleOpenUserMenu,
    userInfo,
  } = HeaderContainer();
  return (
    <AppBar position="static" color="white" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <BSTypography
            variant="h5"
            component="a"
            sx={{
              mr: 2,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </BSTypography>
          <BSStack
            direction="row"
            sx={{
              ml: "auto",
              mr: 2,
              a: { color: "black.main", textDecoration: "none" },
            }}
            spacing={2}
          >
            {menuList.map((page) => (
              <Link key={page.menu} to={page.path}>
                {page.menu}
              </Link>
            ))}
          </BSStack>

          <Box sx={{ flexGrow: 0 }}>
            <BSStack
              direction="row"
              alignItems="center"
              spacing={1}
              onClick={handleOpenUserMenu}
            >
              <IconButton sx={{ p: 0 }}>
                <Avatar
                  alt={userInfo?.name.toUpperCase()}
                  src="/static/images/avatar/2.jpg"
                />
              </IconButton>
              <BSStack>
                <BSTypography sx={{ textTransform: "capitalize" }}>
                  {userInfo?.name}
                </BSTypography>
              </BSStack>
            </BSStack>
            <Menu
              sx={{ mt: "45px" }}
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
              {userDropdownList.map((item) => (
                <MenuItem key={item.title} onClick={item?.handleClick}>
                  <BSTypography textAlign="center">{item?.title}</BSTypography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
