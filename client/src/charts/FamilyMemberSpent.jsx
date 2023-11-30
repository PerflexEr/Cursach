import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const MedicinesChart = () => {

  const { familyMembers, medicines } = useContext(Context);

  useEffect(() => {
    familyMembers.fetchFamilyMembers();
    medicines.fetchMedicines();
  }, [familyMembers, medicines]);

  const datasets = familyMembers._familyMembers.map((member) => {
    const membersMedicines = medicines._medicines.filter(medicine => {
      return medicine.FamilyMemberId === member.FamilyMemberId;
    });
    const totalSpent  = membersMedicines.reduce((total , medicine) => {
      return total + medicine.cost;
    }, 0);

    return {
      label: member.name,
      backgroundColor: "#000080",
      data: [1000]
    };
  });

  const data = {
    labels: ['Spent'],
    datasets,
  };

  const options = {
    legend: {
      display: true,
      position: 'top',
      labels: {
        fontColor: "#000080",
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  return (
    <Bar data={data} options={options} />
  );
};

export default MedicinesChart;
