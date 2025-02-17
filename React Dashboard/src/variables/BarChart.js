// BarChart.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import * as XLSX from 'xlsx';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const [chartData, setChartData] = useState(null);

  const createGradient = (ctx, color1, color2) => {
    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
    gradientStroke.addColorStop(1, color1);
    gradientStroke.addColorStop(0.4, color2);
    gradientStroke.addColorStop(0, 'rgba(119,52,169,0)'); // Purple color
    return gradientStroke;
  };

  useEffect(() => {
    const fetchExcelData = async () => {
      try {
        const response = await fetch('https://docs.google.com/spreadsheets/d/11YIGakqk_9iuW-SRct5M0j8gxHSdMaG6/edit?usp=sharing&ouid=104190786316269719824&rtpof=true&sd=true');
        const blob = await response.blob();
        const workbook = XLSX.read(await blob.arrayBuffer(), { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });

        // Extract labels and data from the Excel file
        let labels = jsonData[1]; // Assuming first row is labels
        let data = jsonData[2]; // Assuming second row is data

        labels = labels.slice(1);// Skip the first element
        data = data.slice(1); // Skip the first element
 
        const chartData = {
          labels: labels,
          datasets: [
            {
              
              data: data,
              fill: true,
              backgroundColor: [
                'rgba(4, 200, 121, 0.2)',
                'rgba(255, 178, 1, 0.2)',
                'rgba(156, 44, 255, 0.2)',
                'rgba(39, 66, 214, 0.2)',
                'rgba(39, 150, 214, 0.2)',
                'rgba(232, 56, 61, 0.2)',

                'rgba(134, 102, 251, 0.2)',
                'rgba(88, 229, 77, 0.2)',
                'rgba(40, 121, 230, 0.2)',
                'rgba(0, 192, 192, 0.2)',
                'rgba(243, 241, 66, 0.2)',
                
              ],
              borderColor: [
                'rgba(4, 200, 121, 1)',
                'rgba(255, 178, 1, 1)',
                'rgba(156, 44, 255, 1)',
                'rgba(39, 66, 214, 1)',
                'rgba(39, 150, 214, 1)',
                'rgba(232, 56, 61, 1)',

                'rgba(134, 102, 251, 1)',
                'rgba(88, 229, 77, 1)',
                'rgba(40, 121, 230, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(243, 241, 66, 1)',
                
              ],
              borderWidth: 2,
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
            display: false,
          },
          title: {
              display:false,
          },
          tooltips: {
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
      yAxes: [
        {
          gridLines: {
            drawBorder: false,
            color: 'rgba(225,78,202,0.1)',
            zeroLineColor: 'transparent',
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 120,
            padding: 20,
            fontColor: '#9e9e9e',
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            drawBorder: false,
            color: 'rgba(225,78,202,0.1)',
            zeroLineColor: 'transparent',
          },
          ticks: {
            padding: 20,
            fontColor: '#9e9e9e',
          },
        },
      ],
    },
  };

  return (
    <div style={{ height: '200px'}}>
      {chartData ? <Bar data={chartData} options={chartOptions} /> : 'Loading...'}
    </div>
  );
};
export default BarChart;
