import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Title, Tooltip, Legend);

const MedicinesChart = observer(() => {

  const { medicines, illnes } = useContext(Context);


  useEffect(() => {
    medicines.fetchMedicines();
    illnes.fetchIllneses()
  }, [medicines , illnes]);


  let unusedMedicines = 0
  let usedMedicines = 0
  let expiredMedicines = 0

  medicines._medicinesWithIdAndNameAndExpDate.map((medicine) => {
    if (new Date(medicine.expDate) <= new Date()) {
     expiredMedicines++;
    }
  })

  const medicineInBalance = illnes._illneses.map((illnes) => ({
    medicineId: illnes.MedicineId,
    amountUsed: illnes.amount_of_pills,
  }));

  let matchingMedicine;

  medicines._medicinesWithIdAndNameAndExpDate.map((medicine) => {
      matchingMedicine = medicineInBalance.find((balance) => balance.medicineId === medicine.id);
      if (matchingMedicine) {
        usedMedicines++;
      }
  });

  unusedMedicines = medicines._medicinesWithIdAndNameAndExpDate.length - (usedMedicines + expiredMedicines)


  const data = {
  labels: ['Unused', 'Already used', 'Expired'],
  datasets: [
    {
      data: [unusedMedicines, usedMedicines, expiredMedicines],
      backgroundColor: [
        'rgba(75, 192, 192, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(255, 99, 132, 0.5)',
      ],
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
    },
  };

  return <Pie data={data} options={options} />;
});

export default MedicinesChart;
