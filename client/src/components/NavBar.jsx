import React, { useContext, useState } from 'react';
import { Context } from '../index';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Drawer,
  List,
  ListItem,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import {
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  STATISTICS_ROUTE,
  FAMILY_ROUTE,
  MEDICINE_ROUTE,
  ILLNES_ROUTE,
  MEDICINE_USAGE_ROUTE,
} from '../utils/consts';
import { observer } from 'mobx-react-lite';

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

  const theme = useTheme();
  const isWideScreen = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <AppBar position="static" color="primary">
      <Container>
        <Toolbar >
          <Link to={STATISTICS_ROUTE} style={{ color: 'white', textDecoration: 'none' ,marginRight: '20px'}}>
            <Typography variant="h6" noWrap component="div" 
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
              Family Pharmacy
            </Typography>
          </Link>

          {isWideScreen ? (
            <>
              <Link to={MEDICINE_ROUTE} style={{ color: 'white', textDecoration: 'none' }}>
                <Button color="inherit">
                  <Typography variant="body1" textTransform={'none'}>Medicines</Typography>
                </Button>
              </Link>
              <Link to={FAMILY_ROUTE} style={{ color: 'white', textDecoration: 'none' }}>
                <Button color="inherit">
                  <Typography variant="body1" textTransform={'none'}>Family Members</Typography>
                </Button>
              </Link>
              <Link to={ILLNES_ROUTE} style={{ color: 'white', textDecoration: 'none' }}>
                <Button color="inherit">
                  <Typography variant="body1" textTransform={'none'}>Illness History</Typography>
                </Button>
              </Link>
              <Link to={MEDICINE_USAGE_ROUTE} style={{ color: 'white', textDecoration: 'none' }}>
                <Button color="inherit">
                  <Typography variant="body1" textTransform={'none'}>Medicines Usage</Typography>
                </Button>
              </Link>
            </>
          ) : (
            <>
              <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
                <MenuIcon />
              </IconButton>
              <Drawer anchor="left" open={open} onClose={handleDrawerToggle}>
                <List>
                  <ListItem  component={Link} to={MEDICINE_ROUTE} onClick={handleDrawerToggle}>
                    <Typography variant="body1">Medicines</Typography>
                  </ListItem>
                  <ListItem  component={Link} to={FAMILY_ROUTE} onClick={handleDrawerToggle}>
                    <Typography variant="body1">Family Members</Typography>
                  </ListItem>
                  <ListItem  component={Link} to={ILLNES_ROUTE} onClick={handleDrawerToggle}>
                    <Typography variant="body1">Illness History</Typography>
                  </ListItem>
                  <ListItem  component={Link} to={MEDICINE_USAGE_ROUTE} onClick={handleDrawerToggle}>
                    <Typography variant="body1">Medicines Usage</Typography>
                  </ListItem>
                </List>
              </Drawer>
            </>
          )}

          {user._isAuth ? (
            <div style={{ marginLeft: 'auto' }}>
              <Button color="inherit" onClick={() => navigate(ADMIN_ROUTE)}>
                Admin Panel
              </Button>
              <Button color="inherit" onClick={() => logOut()} style={{ marginLeft: '10px' }}>
                Log Out
              </Button>
            </div>
          ) : (
            <div style={{ marginLeft: 'auto' }}>
              <Button color="inherit" onClick={() => navigate(LOGIN_ROUTE)}>
                Authorization
              </Button>
            </div>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
});

export default NavBar;
