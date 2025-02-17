// NewJobsChart.js
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import * as XLSX from 'xlsx';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const NewJobsChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchExcelData = async () => {
      try {
        const response = await fetch('https://docs.google.com/spreadsheets/d/1JO42v5pq3zgxPQyDeBJLeq2kCz-dNnGN/edit?gid=801276478#gid=801276478');
        const blob = await response.blob();
        const workbook = XLSX.read(await blob.arrayBuffer(), { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });

        const createGradient = (ctx, color1, color2) => {
          let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
          gradientStroke.addColorStop(1, color1);
          gradientStroke.addColorStop(0.4, color2);
          gradientStroke.addColorStop(0, 'rgba(119,52,169,0)'); // Purple color
          return gradientStroke;
        };

        // Extract labels and data from the Excel file
        const labels = jsonData.slice(2).map(row => row[1]); // Months
        const itJobs = jsonData.slice(2).map(row => row[2]); // IT Jobs
        const totalJobs = jsonData.slice(2).map(row => row[3]); // Total Jobs

        const chartData = {
            labels: ["March", "April", "May", "June",],
          datasets: [
            {
              label: 'IT Jobs',
              data: itJobs,
              fill: false,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: '#00d6b4',
              borderWidth: 2,
              tension: 0.1,
              
            },
            {
              label: 'Total Jobs',
              data: totalJobs,
              fill: false,
              backgroundColor: 'rgba(29, 123, 234, 0.2)',
              borderColor: 'rgba(29, 123, 234, 1)',
              borderWidth: 2,
              tension: 0.1,
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
      yAxes: {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(29,140,248,0.0)",
          zeroLineColor: "transparent",
        },
        ticks: {
          suggestedMin: 50,
          suggestedMax: 125,
          padding: 20,
          fontColor: "#9e9e9e",
        },
      },
      xAxes: {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: "rgba(0,242,195,0.1)",
          zeroLineColor: "transparent",
        },
        ticks: {

          padding: 20,
          fontColor: "#9e9e9e",
        },
      },
    },
  };

  return (
    <div style={{ height: '200px', width: '100%' }}> {/* Set the height of the chart container */}
      {chartData ? <Line data={chartData} options={chartOptions} /> : 'Loading...'}
    </div>
  );
};

export default NewJobsChart;
