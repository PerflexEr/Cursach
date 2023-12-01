import React, { useContext, useEffect } from 'react';
import MedicinesChart from '../charts/MedicinesStateChart';
import FamilyAgeGroups from '../charts/FamilyAgeGroupsChart';
import FamilyMemberSpent from '../charts/FamilyMemberSpentChart';
import FamilyIllnesHistoryChart from '../charts/FamilyIllnesHistoryChart';

import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { Typography, Grid, Container, Paper } from '@mui/material';

const Statistics = observer(() => {
  const { medicines, illnes, familyMembers } = useContext(Context);

  useEffect(() => {
    medicines.fetchMedicines();
    illnes.fetchIllneses();
  }, [medicines, illnes, familyMembers]);

  const amountOffamilyMembers = familyMembers._familyMembers.length;
  const amountOfMedicines = medicines._medicines.length;

  return (
    <Container style={{ paddingTop: '24px', paddingBottom: '24px' }}>
      <Typography variant="h4" style={{ marginBottom: '16px', textAlign: 'center' }}>
        Statistics
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '16px', marginBottom: '16px' }}>
            <Typography variant="h6">
              Family members quantity: {amountOffamilyMembers}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '16px', marginBottom: '16px' }}>
            <Typography variant="h6">
              Amount of medicines: {amountOfMedicines}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper style={{ padding: '16px', height: '400px' }}>
            <FamilyIllnesHistoryChart />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper style={{ padding: '16px', height: '400px' }}>
            <FamilyAgeGroups />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper style={{ padding: '16px', height: '400px' }}>
            <MedicinesChart />
          </Paper>
        </Grid>
        <Grid item xs={12} md={12}>
          <Paper style={{ padding: '16px', height: '400px' }}>
            <Typography variant="h6" style={{ marginBottom: '16px' }}>
              Amount of money spent on family member
            </Typography>
            <FamilyMemberSpent />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
});

export default Statistics;
