import React from 'react';
import MedicinesChart from '../charts/MedicinesChart';
import FamilyAgeGroups from '../charts/FamilyAgeGroups';
import FamilyMemberSpent from '../charts/FamilyMemberSpent';
import { Container } from '@mui/material';
const Statistics = () => {
  return (
    <Container>
      <div style={{ height: '400px' }}> 
        <MedicinesChart />
        <FamilyAgeGroups/>
        <FamilyMemberSpent/>
      </div>
    </Container>
  );
};

export default Statistics;
