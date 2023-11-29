import React, { useContext, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Grid, Container } from '@mui/material';
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
            <Card style={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6">{member.name}</Typography>
                <Typography variant="body2">{member.age} years old</Typography>
                <Typography variant="body2">{member.status}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
    </Container>
  );
});

export default FamilyMembers;
