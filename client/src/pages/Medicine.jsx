import React, { useContext, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Grid, Container } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
const Medicine = observer(() => {

    const { medicines } = useContext(Context);
    console.log(medicines._medicinesWithIdAndNameAndExpDate);
    useEffect(() => {
      medicines.fetchMedicines();
    }, [medicines]);

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
        {medicines._medicinesWithIdAndNameAndExpDate.map((medicine) => (
          <Grid item key={medicine.id} xs={12} sm={6} md={4} lg={3}>
            <Card style={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6">{medicine.name}</Typography>
                <Typography variant="body2">{medicine.type}</Typography>
                <Typography variant="body2">{medicine.expDate}</Typography>
                <Typography variant="body2">{medicine.cost}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
    </Container>
    );
});

export default Medicine;