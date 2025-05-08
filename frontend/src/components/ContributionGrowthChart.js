import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ContributionGrowthChart({ contributions }) {
  // Calculate monthly totals
  const monthlyTotals = {
    labels: [],
    data: [],
    colors: []
  };

  // Group contributions by month and chama
  const chamaTotals = {};
  const monthlyData = {};
  contributions.forEach(contribution => {
    const date = new Date(contribution.date);
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const monthYear = `${month} ${year}`;
    const amount = parseFloat(contribution.amount.replace(/[^0-9.-]+/g, ''));
    
    // Monthly totals
    if (!monthlyData[monthYear]) {
      monthlyData[monthYear] = 0;
    }
    monthlyData[monthYear] += amount;

    // Chama totals
    if (!chamaTotals[contribution.chama]) {
      chamaTotals[contribution.chama] = 0;
    }
    chamaTotals[contribution.chama] += amount;
  });

  // Sort months chronologically and create chart data
  Object.entries(monthlyData)
    .sort(([a], [b]) => new Date(a) - new Date(b))
    .forEach(([monthYear, total]) => {
      monthlyTotals.labels.push(monthYear);
      monthlyTotals.data.push(total);
      monthlyTotals.colors.push(`hsl(${Math.random() * 360}, 70%, 50%)`);
    });

  // Line chart options
  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Contribution Growth',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      datalabels: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return 'KSH ' + value.toLocaleString();
          }
        }
      }
    }
  };

  // Area chart options
  const areaOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Cumulative Contributions',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      datalabels: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return 'KSH ' + value.toLocaleString();
          }
        }
      }
    }
  };

  // Bar chart options
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Contribution Distribution',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
        formatter: (value) => {
          return 'KSH ' + value.toLocaleString();
        },
        color: 'white',
        font: {
          weight: 'bold'
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return 'KSH ' + value.toLocaleString();
          }
        }
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Line Chart - Growth Trend */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Contribution Growth Trend</h3>
        <div className="chart-container">
          <Line options={lineOptions} data={{
            labels: monthlyTotals.labels,
            datasets: [{
              label: 'Total Contributions',
              data: monthlyTotals.data,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
              fill: true,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
            }],
          }} />
        </div>
      </div>

      {/* Area Chart - Cumulative */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Cumulative Contributions</h3>
        <div className="chart-container">
          <Line options={areaOptions} data={{
            labels: monthlyTotals.labels,
            datasets: [{
              data: monthlyTotals.data,
              fill: true,
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              tension: 0.4
            }]
          }} />
        </div>
      </div>

      {/* Bar Chart - Monthly Distribution */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Monthly Contribution Distribution</h3>
        <div className="chart-container">
          <Bar options={barOptions} data={{
            labels: monthlyTotals.labels,
            datasets: [{
              label: 'Contributions',
              data: monthlyTotals.data,
              backgroundColor: monthlyTotals.colors,
              borderWidth: 1,
            }],
          }} />
        </div>
      </div>
    </div>
  );
}

export default ContributionGrowthChart;
