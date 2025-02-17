// ITDomainsDoughnutChart.js
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend);

const ITDomainsDoughnutChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        // Mock data for percentage values from your description
        const data = [
          21.3198,
          11.67513,
          11.16751,
          10.15228,
          9.64467,
          5.076142,
          4.060914,
          4.060914,
          4.060914,
          3.553299,
          3.553299,
          3.553299,
          3.045685,
          2.538071,
          1.015228,
          1.015228,
          0.507614,
        ];

        const labels = [
          'Software Development',
          'FullStack Development',
          'IT Support',
          'Web Development',
          'Network Administration',
          'Cybersecurity',
          'DevOps',
          'Project Manager',
          'UI/UX Designer',
          'Data Science/Analyst',
          'Internet of Things',
          'Database Administration',
          'QA Tester',
          'Mobile Development',
          'Digital Marketing',
          'VR/XR & Game Development',
          'Artificial Intelligence',
        ];

        const backgroundColors = [
          'rgba(255, 99, 132, 0.8)',   // Red
          'rgba(255, 99, 71, 0.8)',    // Tomato
          'rgba(255, 105, 180, 0.8)',  // Hot Pink
          'rgba(255, 20, 147, 0.8)',   // Deep Pink
          'rgba(54, 162, 235, 0.8)',   // Blue
          'rgba(135, 206, 235, 0.8)',  // Sky Blue
          'rgba(0, 191, 255, 0.8)',    // Deep Sky Blue
          'rgba(75, 0, 130, 0.8)',     // Indigo
          'rgba(153, 102, 255, 0.8)',  // Purple
          'rgba(138, 43, 226, 0.8)',   // Blue Violet
          'rgba(75, 192, 192, 0.8)',   // Teal
          'rgba(0, 255, 127, 0.8)',    // Spring Green
          'rgba(50, 205, 50, 0.8)',    // Lime Green
          'rgba(255, 206, 86, 0.8)',   // Yellow
          'rgba(255, 159, 64, 0.8)',   // Orange
          'rgba(255, 140, 0, 0.8)',    // Dark Orange
          'rgba(199, 199, 199, 0.8)',  // Grey
        ];
          

        // Prepare chart data object
        const chartData = {
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: backgroundColors,
              borderWidth: 1,
            },
          ],
        };

        setChartData(chartData);
      } catch (error) {
        console.error('Error fetching or processing data:', error);
      }
    };

    fetchChartData();
  }, []);

  const chartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'right',
        align: 'start',
      },
      title: {
        display: false,
        // xPadding: 10,
        // text: 'IT Domains Distribution %',
        // font: {
        //   size: 20,
          
        // },
      },
      tooltips: {
        backgroundColor: '#f5f5f5',
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
    cutoutPercentage: 70,
    animation: {
      animateRotate: true,
      animateScale: true,
    },
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      {chartData ? <Doughnut data={chartData} options={chartOptions} /> : 'Loading...'}
    </div>
  );
};

export default ITDomainsDoughnutChart;
