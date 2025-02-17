// LocationsChart.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import * as XLSX from 'xlsx';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const LocationsChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchExcelData = async () => {
      try {
        const response = await fetch('https://docs.google.com/spreadsheets/d/1asF6UrkB27VY_hUUQ6YVKOlfUVwvUO3S/edit?gid=801276478#gid=801276478');
        const blob = await response.blob();
        const workbook = XLSX.read(await blob.arrayBuffer(), { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });

        // Assuming first row is labels and second row is data
        const labels = jsonData[1].slice(1); // Exclude 'Other' if not needed
        const data = jsonData[2].slice(1); // Exclude 'Other' if not needed

        const chartData = {
          labels: labels,
          datasets: [
            {
              data: data,
              fill: true,
              backgroundColor: [
                'rgba(4, 200, 121, 0.2)',
                'rgba(4, 200, 121, 0.2)',
                'rgba(4, 200, 121, 0.2)',
                'rgba(4, 200, 121, 0.2)',
                'rgba(4, 200, 121, 0.2)',
                'rgba(4, 200, 121, 0.2)',
                'rgba(4, 200, 121, 0.2)',
                'rgba(4, 200, 121, 0.2)',
                'rgba(70, 70, 70, 0.2)',
              ],
              borderColor: [
                '#00d6b4',
                '#00d6b4',
                '#00d6b4',
                '#00d6b4',
                '#00d6b4',
                '#00d6b4',
                '#00d6b4',
                '#00d6b4',
                'rgba(70, 70, 70, 1)',
              ],
              borderWidth: 2,
            },
          ],
        };

        setChartData(chartData);
      } catch (error) {
        console.error('Error fetching the Excel data:', error);
      }
    };

    fetchExcelData();
  }, []);

  const chartOptions = {
    indexAxis: 'y',
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
    <div style={{ height: '500px' }}>
      {chartData ? <Bar data={chartData} options={chartOptions} /> : 'Loading...'}
    </div>
  );
};

export default LocationsChart;
