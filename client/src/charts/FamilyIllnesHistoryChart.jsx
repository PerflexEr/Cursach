import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';


import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(ArcElement, Title, Tooltip, Legend);

const MedicinesChart = observer(() => {

  const { medicines, illnes ,familyMembers } = useContext(Context);


  useEffect(() => {
    medicines.fetchMedicines();
    illnes.fetchIllneses()
  }, [medicines , illnes , familyMembers]);


  let illnessCounts = familyMembers._familyMembers.map(member => {
  const illnesses = illnes._illneses.filter(illness => illness.FamilyMemberId === member.id);
  return {
    name: member.name,
    illnessCount: illnesses.length
    };
  }).filter(member => member.illnessCount > 0);




  const data = {
  labels: illnessCounts.map(member => member.name),
  datasets: [
    {
      data: illnessCounts.map(member => member.illnessCount),

    },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Medicine Usage Chart',
      },
      colors: {
        forceOverride: true
      }
    },
  };

  return <Pie data={data} options={options} />;
});

export default MedicinesChart;
