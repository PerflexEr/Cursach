import React from 'react';
import MedicinesChart from '../charts/MedicinesChartChart';
import FamilyAgeGroups from '../charts/FamilyAgeGroupsChart';
import FamilyMemberSpent from '../charts/FamilyMemberSpentChart';
import FamilyIllnesHistoryChart from '../charts/FamilyIllnesHistoryChart';

import { observer } from 'mobx-react-lite';

import { Container } from '@mui/material';

const Statistics = observer(() => {
  return (
    <Container>
      <div style={{ height: '400px' }}> 
        <MedicinesChart />
        <FamilyAgeGroups/>
        <FamilyMemberSpent/>
        <FamilyIllnesHistoryChart/>
      </div>
    </Container>
  );
});

export default Statistics;
