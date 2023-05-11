import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import { blue } from "@mui/material/colors";
import { useAuth } from "hook";
import CreateTaskDialog from "components/TaskCreationDialog";

const pages: string[] = ["Workspace", "Create"];
const settings: string[] = ["Profile", "Logout"];

const CreateTaskButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(blue[500]),
  backgroundColor: blue[500],
  "&:hover": {
    backgroundColor: blue[400],
  },
}));

const Navigation = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { isAuth, authLogout } = useAuth();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuNavigate = (path: string) => {
    navigate(`/${path.toLowerCase()}`);
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };
  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleCreateTask = () => {};

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              mx={{ ml: 5 }}
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>

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
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {isAuth &&
                pages.map((page) =>
                  page !== "Create" ? (
                    <Button
                      key={page}
                      onClick={() => handleMenuNavigate(page)}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page}
                    </Button>
                  ) : (
                    <CreateTaskButton
                      key={page}
                      variant={"outlined"}
                      onClick={() => handleDialogOpen()}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page}
                    </CreateTaskButton>
                  )
                )}
            </Box>
            {isAuth ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
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
                  {settings.map((setting) => {
                    return setting === "Logout" ? (
                      <MenuItem key={setting} onClick={authLogout}>
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ) : (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    );
                  })}
                </Menu>
              </Box>
            ) : (
              <MenuItem
                component={Link}
                to="/login"
                key={"LOGIN"}
                onClick={handleCloseNavMenu}
              >
                {"LOGIN"}
              </MenuItem>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <CreateTaskDialog
        isDialogOpen={isDialogOpen}
        handleDialogClose={handleDialogClose}
      />
    </>
  );
};

export default Navigation;
