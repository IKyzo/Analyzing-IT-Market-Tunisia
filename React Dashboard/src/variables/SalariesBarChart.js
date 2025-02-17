// SalariesBarChart.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import * as XLSX from 'xlsx';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalariesBarChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchExcelData = async () => {
      try {
        const response = await fetch('https://docs.google.com/spreadsheets/d/1q6dmB6wNzTWPtyhvFRf9jc13hGWtD8Pr/edit?gid=801276478#gid=801276478');
        const blob = await response.blob();
        const workbook = XLSX.read(await blob.arrayBuffer(), { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });

        // Extract labels and data from the Excel file
        const labels = jsonData[1].slice(1); // Job titles
        const minSalaries = jsonData[2].slice(1); // Minimum salaries
        const maxSalaries = jsonData[3].slice(1); // Maximum salaries

        // Create datasets for min and max salaries
        const chartData = {
          labels: labels,
          datasets: [
            {
              label: 'Min Salary (TND)',
              data: minSalaries,
              backgroundColor: 'rgba(251, 63, 66, 0.2)',
              borderColor: 'rgba(251, 63, 66, 1)',
              borderWidth: 1,
            },
            {
              label: 'Max Salary (TND)',
              data: maxSalaries,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: '#00d6b4',
              borderWidth: 1,
            },
          ],
        };

        setChartData(chartData); 
      } catch (error) {
        console.error('Error fetching or parsing Excel file:', error);
      }
    };

    fetchExcelData();
  }, []);

  const chartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
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
        beginAtZero: true,
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
    <div style={{ height: '250px', width: '100%' }}>
      {chartData ? <Bar data={chartData} options={chartOptions} /> : 'Loading...'}
    </div>
  );
};

export default SalariesBarChart;
