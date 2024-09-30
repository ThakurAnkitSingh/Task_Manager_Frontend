import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const TaskChart = ({ taskCounts }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Destroy the previous chart instance if it exists
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const data = {
    labels: ['Todo', 'In Progress', 'Completed'],
    datasets: [
      {
        data: [taskCounts.todo, taskCounts.inProgress, taskCounts.completed],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ height: '300px', width: '300px' }}>
      <Pie 
        data={data} 
        options={options} 
        ref={(element) => {
          if (element) {
            chartRef.current = element.chartInstance;
          }
        }}
      />
    </div>
  );
};

export default TaskChart;