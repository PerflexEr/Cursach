import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Title, Tooltip, Legend);

const MedicinesChart = () => {





  
  const data = {
    labels: ['Unused', 'Already used', 'Expired'],
    datasets: [
      {
        data: [1,2,3],
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
        text: 'Example Pie Chart',
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default MedicinesChart;
