import React, { useContext } from 'react';
import { Context } from "../index";
import { AppBar, Toolbar, Typography, Button, Container, Box} from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import {
     ADMIN_ROUTE, LOGIN_ROUTE ,STATISTICS_ROUTE , FAMILY_ROUTE , MEDICINE_ROUTE ,ILLNES_ROUTE ,MEDICINE_USAGE_ROUTE
} from "../utils/consts";
import { observer } from "mobx-react-lite";

const NavBar = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
    };

    return (
        <AppBar position="static" color="primary">
            <Container>
                <Toolbar>
                    <Link to={STATISTICS_ROUTE} style={{ color: 'white', textDecoration: 'none' }}>
                        <Typography variant="h6">
                            FamilyFarmacy
                        </Typography>
                    </Link>
                     <Box sx={{
                            display: 'flex',
                            
                            marginLeft: '50px',
                            gap: '20px',
                            alignItems: 'center',  
                            color: '#F3F3F3',
                            '& a': {
                                textDecoration: 'none',
                                color: '#F3F3F3',
                                transition: 'color 0.3s',
                            },
                            }}>
                        <Link to={MEDICINE_ROUTE}>
                            <Typography variant='body1'>
                                Medicines
                            </Typography>
                        </Link>
                        <Link to={FAMILY_ROUTE}>
                            <Typography variant='body1'>
                                Family Members
                            </Typography>
                        </Link>
                        <Link to={ILLNES_ROUTE}>
                            <Typography variant='body1'>
                                Illnes history
                            </Typography>
                        </Link>
                        <Link to={MEDICINE_USAGE_ROUTE}>
                            <Typography variant='body1'>
                                Medicines Usage
                            </Typography>
                        </Link>
                     </Box>
                    {user.isAuth ?
                        <div style={{ marginLeft: 'auto' }}>
                            <Button
                                color="inherit"
                                onClick={() => navigate(ADMIN_ROUTE)}
                            >
                                Админ панель
                            </Button>
                            <Button
                                color="inherit"
                                onClick={() => logOut()}
                                style={{ marginLeft: '10px' }}
                            >
                                Выйти
                            </Button>
                        </div>
                        :
                        <div style={{ marginLeft: 'auto' }}>
                            <Button color="inherit" onClick={() => navigate(LOGIN_ROUTE)}>
                                Авторизация
                            </Button>
                        </div>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
});

export default NavBar;
