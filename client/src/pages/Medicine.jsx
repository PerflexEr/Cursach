import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography, Grid, Container, Paper } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import MedicineFilter from '../components/MedicineFilter';

const Medicine = observer(() => {
  const { medicines, illnes } = useContext(Context);
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    medicines.fetchMedicines();
    illnes.fetchIllneses()
  }, [medicines, filter , illnes]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const medicineInBalance = illnes._illneses.map((illnes) => ({
    medicineId: illnes.MedicineId,
    amountUsed: illnes.amount_of_pills,
  }));

  let matchingMedicine

  const filteredMedicines = medicines._medicinesWithIdAndNameAndExpDate.map((medicine) => {
  let amountUsed = 0;
  if (filter === 'Already used') {
    matchingMedicine = medicineInBalance.find((balance) => balance.medicineId === medicine.id);
    if (matchingMedicine) {
      amountUsed = matchingMedicine.amountUsed;
    }
  }

  if (filter === 'expired' && new Date(medicine.expDate) >= new Date()) {
    return null;
  }

  return {
    ...medicine,
    amountUsed,
  };
}).filter(medicine => {
  if (filter === 'Already used') {
    return medicine.amountUsed > 0;
  }
  return Boolean(medicine);
});

  
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
                      <strong>Expiration Date:</strong> {medicine.expDate}
                    </Typography>
                    <Typography variant="body1" style={{ marginBottom: '8px' }}>
                      <strong>Amount:</strong> {medicine.amount}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Cost:</strong> {medicine.cost}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Amount Left:</strong> {medicine.amountUsed}
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
                      <strong>Expiration Date:</strong> {medicine.expDate}
                    </Typography>
                    <Typography variant="body1" style={{ marginBottom: '8px' }}>
                      <strong>Amount:</strong> {medicine.amount}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Cost:</strong> {medicine.cost}
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
