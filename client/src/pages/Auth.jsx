import React, { useContext, useState } from 'react';
import { Container, Card, TextField, Button, Grid, Box } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE, LOGIN_ROUTE, MEDICINE_ROUTE, REGISTRATION_ROUTE, STATISTICS_ROUTE } from '../utils/consts';
import { login, registration } from '../services/userAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      user.setUser(user);
      user.setIsAuth(true);
      navigate(ADMIN_ROUTE)
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <Box margin={'5% 33%'}>
        <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54, textAlign: 'center'}}
    >
      <Card style={{ width: 600, padding: '20px' }} className="p-5">
        <h2 className="m-auto">{isLogin ? 'Authorization' : 'Registration'}</h2>
        <form className="d-flex flex-column" style={{display: 'flex' , flexDirection: 'column' , gap: "20px"}}>
          <TextField
            className="mt-3"
            label="Input your email..."
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            className="mt-3"
            label="Input your password..."
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Grid container justifyContent="space-between" className="mt-3 pl-3 pr-3">
            {isLogin ? (
              <div>
                No account? <Link to={REGISTRATION_ROUTE}>Registarion!</Link>
              </div>
            ) : (
              <div>
                Have an account ? <Link to={LOGIN_ROUTE}>Log in!</Link>
              </div>
            )}
            <Button variant="outlined"  onClick={click}> 
              {isLogin ? 'Log in' : 'Registrate'}
            </Button>
          </Grid>
        </form>
      </Card>
    </Container>
    </Box>
  );
});

export default Auth;
