import React, { useContext, useState } from 'react';
import { Context } from "../index";
import { AppBar, Toolbar, Typography, Button, Container, Box, Drawer, List, ListItem, IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE, LOGIN_ROUTE ,STATISTICS_ROUTE , FAMILY_ROUTE , MEDICINE_ROUTE ,ILLNES_ROUTE ,MEDICINE_USAGE_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";

const NavBar = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
    };

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    return (
        <AppBar position="static" color="primary">
            <Container>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Drawer
                        anchor="left"
                        open={open}
                        onClose={handleDrawerToggle}
                    >
                        <List>
                            <ListItem button component={Link} to={MEDICINE_ROUTE}>
                                <Typography variant='body1'>
                                    Medicines
                                </Typography>
                            </ListItem>
                            <ListItem button component={Link} to={FAMILY_ROUTE}>
                                <Typography variant='body1'>
                                    Family Members
                                </Typography>
                            </ListItem>
                            <ListItem button component={Link} to={ILLNES_ROUTE}>
                                <Typography variant='body1'>
                                    Illnes history
                                </Typography>
                            </ListItem>
                            <ListItem button component={Link} to={MEDICINE_USAGE_ROUTE}>
                                <Typography variant='body1'>
                                    Medicines Usage
                                </Typography>
                            </ListItem>
                        </List>
                    </Drawer>
                    <Link to={STATISTICS_ROUTE} style={{ color: 'white', textDecoration: 'none' }}>
                        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                            Family Farmacy
                        </Typography>
                    </Link>

                    {user._isAuth ?
                        <div style={{ marginLeft: 'auto' }}>
                            <Button
                                color="inherit"
                                onClick={() => navigate(ADMIN_ROUTE)}
                            >
                                Admin panel
                            </Button>
                            <Button
                                color="inherit"
                                onClick={() => logOut()}
                                style={{ marginLeft: '10px' }}
                            >
                                Log out
                            </Button>
                        </div>
                        :
                        <div style={{ marginLeft: 'auto' }}>
                            <Button color="inherit" onClick={() => navigate(LOGIN_ROUTE)}>
                                Authorization
                            </Button>
                        </div>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
});

export default NavBar;
