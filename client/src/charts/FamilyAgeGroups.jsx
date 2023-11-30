import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Title, Tooltip, Legend);

const FamilyAgeGroups = observer(() => {

  const { familyMembers } = useContext(Context);

  useEffect(() => {
    familyMembers.fetchFamilyMembers();
  }, [familyMembers]);

  let under18 = 0
  let between18_60 = 0
  let older60 = 0

  familyMembers._familyMembers.map((member) => {
    if (member.age < 18) {
     under18++;
    }else if(member.age >= 18 && member.age <= 60){
      between18_60++
    }else{
      older60++
    }
  })
  

  const data = {
  labels: ['Under 18', 'Between 18 - 60', 'Older 60'],
  datasets: [
    {
      data: [under18, between18_60, older60],
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
        text: 'Family age groups',
      },
    },
  };

  return <Pie data={data} options={options} />;
});

export default FamilyAgeGroups;
