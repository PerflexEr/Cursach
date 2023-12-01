import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { Bar } from 'react-chartjs-2';


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
    const datasets = familyMembers._familyMembers.reduce((acc, member) => {
      const spent = medicines._medicines.reduce((total, medicine) => {
        if (medicine.FamilyMemberId === member.id) {
          total += +medicine.cost; 
        }
        return total;
      }, 0);

      if (spent > 0) {
        acc.push({
          label: member.name,
          data: [spent],
        });
      }
      return acc;
    }, []); 

    return {
      labels: ['Spent'],
      datasets,
    };
  };




  const data = generateChartData();

  const options = {
    responsive: true,
    legend: {
      display: true,
      position: 'top',
      labels: {
        fontColor: "#000080",
      },
    },
    
  };

  return (
    <Bar data={data} options={options} />
  );
});

export default MedicinesChart;
