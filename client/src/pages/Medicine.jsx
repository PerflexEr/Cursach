import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography, Grid, Container, Paper } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import MedicineFilter from '../components/MedicineFilter';

const Medicine = observer(() => {
  const { medicines, illnes,familyMembers } = useContext(Context);
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    medicines.fetchMedicines();
    illnes.fetchIllneses()
  }, [medicines, filter , illnes , familyMembers ]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const medicineInBalance = illnes._illneses.map((illnes) => ({
    medicineId: illnes.MedicineId,
    amountUsed: illnes.amount_of_pills,
  }));


 const filteredMedicines = medicines._medicines.map((medicine) => {
  let amountUsed = 0;
  let matchingMedicine;

  if (filter === 'Already used') {
    matchingMedicine = medicineInBalance.find((balance) => balance.medicineId === medicine.id);
    if (matchingMedicine) {
      amountUsed = matchingMedicine.amountUsed;
    }
  }

  if (filter === 'expired' && new Date(medicine.expiration_date) >= new Date()) {
    return null;
  }

  const familyMember = familyMembers._familyMembers.find((member) => member.id === medicine.FamilyMemberId);

  return {
    ...medicine,
    expiration_date: new Date(medicine.expiration_date).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }),
    familyMemberName: familyMember ? familyMember.name : null,
    amountUsed,
  };
  }).filter(medicine => {
    if (filter === 'Already used') {
      return medicine.amountUsed > 0;
    }
    return Boolean(medicine);
  });

  console.log(filteredMedicines);
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
        <MedicineFilter onFilterChange={handleFilterChange} />
        <Grid container spacing={3}>
          {filteredMedicines.map((medicine) => (
            <Grid item key={medicine.id} xs={12} sm={6} md={4} lg={3}>
              <Paper elevation={3} style={{ height: '100%', padding: '16px', borderRadius: '8px' }}>
                {medicine.amountUsed ? (
                  <>
                    <Typography variant="h6" style={{ marginBottom: '8px' }}>
                      {medicine.name}
                    </Typography>
                    <Typography variant="body1" style={{ marginBottom: '8px' }}>
                      <strong>Type:</strong> {medicine.type}
                    </Typography>
                    <Typography variant="body1" style={{ marginBottom: '8px' }}>
                      <strong>Expiration Date:</strong> {medicine.expiration_date}
                    </Typography>
                    <Typography variant="body1" style={{ marginBottom: '8px' }}>
                      <strong>Amount:</strong> {medicine.amount}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Cost:</strong> {medicine.cost}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Family member:</strong> {medicine.familyMemberName}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Amount left :</strong> {medicine.amount - medicine.amountUsed}
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="h6" style={{ marginBottom: '8px' }}>
                      {medicine.name}
                    </Typography>
                    <Typography variant="body1" style={{ marginBottom: '8px' }}>
                      <strong>Type:</strong> {medicine.type}
                    </Typography>
                    <Typography variant="body1" style={{ marginBottom: '8px' }}>
                      <strong>Expiration Date:</strong> {medicine.expiration_date}
                    </Typography>
                    <Typography variant="body1" style={{ marginBottom: '8px' }}>
                      <strong>Amount:</strong> {medicine.amount}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Cost:</strong> {medicine.cost}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Family member:</strong> {medicine.familyMemberName}
                    </Typography>
                  </>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
});

export default Medicine;
