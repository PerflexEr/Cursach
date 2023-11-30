import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { Bar } from 'react-chartjs-2';

import Chart from 'chart.js/auto';
const MedicinesChart = observer(() => {
  const { familyMembers, medicines } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      await familyMembers.fetchFamilyMembers();
      await medicines.fetchMedicines();
    };

    fetchData();
  }, [familyMembers, medicines]);

  const generateChartData = () => {
    const datasets = familyMembers._familyMembers.map((member) => {
      const spent = medicines._medicines.reduce((total, medicine) => {
        if (medicine.FamilyMemberId === member.id) {
          total += +medicine.cost; 
        }
        return total;
      }, 0);

      return {
        label: member.name,
        data: [spent],
      };
    });

    return {
      labels: ['Spent'],
      datasets,
    };
  };


  const data = generateChartData();

  const options = {
    legend: {
      display: true,
      position: 'top',
      labels: {
        fontColor: "#000080",
      },
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
        },
      }],
    },
  };

  return (
    <Bar data={data} options={options} />
  );
});

export default MedicinesChart;
