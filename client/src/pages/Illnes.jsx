import React, { useContext, useEffect } from 'react';
import { Box, Paper, Typography, Grid, Container } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';

const Illnes = observer(() => {
  const { familyMembers, medicines, illnes } = useContext(Context);

  useEffect(() => {
    familyMembers.fetchFamilyMembers();
    medicines.fetchMedicines();
  }, [familyMembers, medicines, illnes]);

  const familyMembersWithIdAndName = familyMembers._familyMembersWithIdAndName;
  const medicinesWithIdAndName = medicines._medicinesWithIdAndName;
  
   if (illnes._illneses.length === 0) {
    return (
      <Container>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '30px',
            padding: '0 20px',
          }}
        >
          <Typography variant="h6">No illnesses found.</Typography>
        </Box>
      </Container>
    );
  }

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
          {illnes._illneses.map((illness) => (
            <Grid item key={illness.id} xs={12} sm={6} md={4} lg={3}>
              <Paper style={{ height: '100%', padding: '16px', margin: '8px' }}>
                <Typography variant="h6" fontWeight={700}>
                  {illness.diagnosis}
                </Typography>
                <Typography variant="body1">
                  <strong>Reason for Medications:</strong> {illness.reason_for_medications}
                </Typography>
                <Typography variant="body1">
                  <strong>Period of Illness:</strong> {illness.period_of_illness}
                </Typography>
                <Typography variant="body1">
                  <strong>Prescribed by:</strong> {illness.prescribed_by}
                </Typography>
                <Typography variant="body1">
                  <strong>Amount of Pills:</strong> {illness.amount_of_pills}
                </Typography>
                <Typography variant="body1">
                  <strong>Result:</strong> {illness.result}
                </Typography>
                <Typography variant="body1">
                  <strong>Note:</strong> {illness.note}
                </Typography>
                <Typography variant="body1">
                  <strong>Family Member:</strong>{' '}
                  {familyMembersWithIdAndName.find((member) => member.id === illness.FamilyMemberId)?.name}
                </Typography>
                <Typography variant="body1">
                  <strong>Medicine:</strong>{' '}
                  {medicinesWithIdAndName.find((medicine) => medicine.id === illness.MedicineId)?.name}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
});

export default Illnes;
