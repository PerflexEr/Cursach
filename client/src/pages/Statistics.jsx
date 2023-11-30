import React from 'react';
import MedicinesChart from '../charts/MedicinesChart';
import { Container } from '@mui/material';
const Statistics = () => {
  return (
    <Container>
      <div style={{ height: '400px' }}> 
        <MedicinesChart />
      </div>
    </Container>
  );
};

export default Statistics;
