// ExperienceLevelChart.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ExperienceLevelChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchExperienceLevelData = async () => {
      // Mock data, replace with actual data fetching logic
      const labels = ['Entry-level', 'Mid-level', 'Senior-level'];
      const data = [150, 200, 100];

      const chartData = {
        labels: labels,
        datasets: [
          {
            data: data,
            fill: true,
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 2,
          },
        ],
      };

      setChartData(chartData);
    };

    fetchExperienceLevelData();
  }, []);

  const chartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#333333',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: 'nearest',
        intersect: 0,
        position: 'nearest',
      },
    },
    responsive: true,
    scales: {
      y: {
        grid: {
          drawBorder: false,
          color: 'rgba(225,78,202,0.1)',
          zeroLineColor: 'transparent',
        },
        ticks: {
          padding: 20,
          color: '#9e9e9e',
        },
      },
      x: {
        grid: {
          drawBorder: false,
          color: 'rgba(225,78,202,0.1)',
          zeroLineColor: 'transparent',
        },
        ticks: {
          padding: 20,
          color: '#9e9e9e',
        },
      },
    },
  };

  return (
    <div style={{ height: '200px' }}>
      {chartData ? <Bar data={chartData} options={chartOptions} /> : 'Loading...'}
    </div>
  );
};

export default ExperienceLevelChart;
