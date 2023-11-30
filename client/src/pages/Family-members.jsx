import React, { useContext, useEffect } from 'react';
import { Box,Typography, Grid, Container, Paper } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';

const FamilyMembers = observer(() => {
  const { familyMembers } = useContext(Context);

  useEffect(() => {
    familyMembers.fetchFamilyMembers();
  }, [familyMembers]);

  return (
    <Container>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '30px',
          padding: '0 20px'
        }}
      >
        <Grid container spacing={3}>
          {familyMembers._familyMembers.map((member) => (
            <Grid item key={member.id} xs={12} sm={6} md={4} lg={3}>
              <Paper elevation={3} style={{ height: '100%', padding: '16px', borderRadius: '8px' }}>
                <Typography variant="h6" style={{ marginBottom: '8px' }}>
                  {member.name}
                </Typography>
                <Typography variant="body1" style={{ marginBottom: '8px' }}>
                  {member.age} years old
                </Typography>
                <Typography variant="body1">
                  <strong>Status:</strong> {member.status}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
});

export default FamilyMembers;
