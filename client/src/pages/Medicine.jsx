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
  }, [medicines, filter]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const medicineInBalance = illnes._illneses.map((illnes) => ({
    medicineId: illnes.MedicineId,
    amountLeft: illnes.amount_of_pills,
  }));

  let matchingMedicine;

  const filteredMedicines = medicines._medicinesWithIdAndNameAndExpDate.filter((medicine) => {
    if (filter === 'expired') {
      return new Date(medicine.expDate) < new Date();
    }

    if (filter === 'Already used') {
      matchingMedicine = medicineInBalance.find((balance) => balance.medicineId === medicine.id);

      if (matchingMedicine) {
        return {
          ...matchingMedicine,
          amountLeft: matchingMedicine.amountLeft,
        };
      }

      return false;
    }

    return true;
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
                {medicine.amountLeft ? (
                  <Typography variant="body1">
                    <strong>Amount Left:</strong> {medicine.amountLeft}
                  </Typography>
                ) : null}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
});

export default Medicine;
