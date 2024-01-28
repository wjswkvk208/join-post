"use client";
import AppBar from "@/components/common/AppBar";
import {
  Avatar,
  Badge,
  Box,
  Container,
  CssBaseline,
  Divider,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import React, { Suspense } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Drawer from "@/components/common/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { mainListItems, secondaryListItems } from "./listItems";
import Copyright from "@/components/common/Copyright";
import { useSession, signOut } from "next-auth/react";

const defaultTheme = createTheme();

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: "24px", // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: "32px",
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>

              <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                Golf Team Paring Post
              </Typography>

              {status === "authenticated" ? (
                <>
                  <IconButton aria-label="notification" onClick={handleMenu}>
                    <Badge badgeContent={4} color="secondary" overlap="circular">
                      {/* <Avatar sx={{ bgcolor: green[500] }}> */}
                      <NotificationsIcon />
                      {/* </Avatar> */}
                    </Badge>
                  </IconButton>
                  <IconButton aria-label="account" color="inherit" onClick={handleMenu}>
                    {/* <Badge badgeContent={4} color="secondary"> */}

                    <Avatar alt={session.user.nickname} src={session.user.image ?? ""} sx={{ width: 32, height: 32 }} />
                    {/* </Badge> */}
                  </IconButton>

                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={anchorEl?.ariaLabel === "account"}
                    onClose={handleClose}
                  >
                    <MenuItem component={Link} href={"/account"}>
                      Account
                    </MenuItem>

                    <MenuItem onClick={() => signOut()}>로그아웃</MenuItem>
                  </Menu>

                  <Menu
                    anchorEl={anchorEl}
                    open={anchorEl?.ariaLabel === "notification"}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    onClose={handleClose}
                    sx={{ mt: 5 }}
                  >
                    <MenuItem>
                      <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                      </ListItemAvatar>
                      <ListItemText
                        primary="Brunch this weekend?"
                        secondary={
                          <React.Fragment>
                            <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                              Ali Connors
                            </Typography>
                            {" — I'll be in your neighborhood doing errands this…"}
                          </React.Fragment>
                        }
                      />
                    </MenuItem>

                    <MenuItem>
                      <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                      </ListItemAvatar>
                      <ListItemText
                        primary="Brunch this weekend?"
                        secondary={
                          <React.Fragment>
                            <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                              Ali Connors
                            </Typography>
                            {" — I'll be in your neighborhood doing errands this…"}
                          </React.Fragment>
                        }
                      />
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <a href="/api/auth/signin">Sign in</a>
              )}
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              {mainListItems}
              {/* <Divider sx={{ my: 1 }} />
              {secondaryListItems} */}
            </List>
            <Divider sx={{ mt: "auto" }} />
            <List component="nav">
              {/* {mainListItems}
              <Divider sx={{ my: 1 }} /> */}
              {secondaryListItems}
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: theme => (theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900]),
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              {/* <Suspense fallback={<Loading />}> */}
              {children}
              {/* </Suspense> */}
              <Copyright sx={{ pt: 4 }} />
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}
