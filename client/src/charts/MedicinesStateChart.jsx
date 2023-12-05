import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from 'chart.js/auto';
import { reaction } from 'mobx';

ChartJS.register(ArcElement, Title, Tooltip, Legend);

const MedicinesChart = observer(() => {

  const { medicines, illnes } = useContext(Context);

  useEffect(() => {
    medicines.fetchMedicines();
    illnes.fetchIllneses()
  }, [medicines , illnes]);

  useEffect(() => {
    const disposer = reaction(
      () => [medicines._medicinesWithIdAndNameAndExpDate, illnes._illneses],
      () => {
        // Здесь вы можете вызвать любую функцию, которая принудительно обновит ваш компонент
      }
    );

    return () => disposer();
  }, [medicines, illnes]);

  let unusedMedicines = 0
  let usedMedicines = 0
  let expiredMedicines = 0

  medicines._medicines.forEach((medicine) => {
    if (new Date(medicine.expDate) <= new Date()) {
     expiredMedicines++;
    }
  })

  const medicineInBalance = illnes._illneses.map((illnes) => ({
    medicineId: illnes.MedicineId,
    amountUsed: illnes.amount_of_pills,
  }));

  let matchingMedicine;

  medicines._medicines.forEach((medicine) => {
      matchingMedicine = medicineInBalance.find((balance) => balance.medicineId === medicine.id);
      if (matchingMedicine) {
        usedMedicines++;
      }
  });

  unusedMedicines = medicines._medicines.length - (usedMedicines + expiredMedicines)


  const data = {
  labels: ['Unused', 'Already used', 'Expired'],
  datasets: [
    {
      data: [unusedMedicines, usedMedicines, expiredMedicines],
      
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
