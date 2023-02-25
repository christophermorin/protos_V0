import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


function BarChart({ dataSet, title, color }) {

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Colors,
  );
  // ChartJS.defaults.borderColor = '#000';
  ChartJS.defaults.color = '#fff';
  const options = {
    indexAxis: 'x',
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          color: 'rgba(255,255,255,0.2)',
          lineWidth: 1,
        },
      },
      y: {
        grid: {
          color: 'rgba(255,255,255,0.2)',
          lineWidth: 1,
        },
      },
    },
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  const labels = dataSet.map((item) => item.title);

  const data = {
    labels,
    datasets: [
      {
        label: 'Times Completed',
        data: dataSet.map((item) => item.timesCompleted),
        backgroundColor: color,
      },
    ],
  };

  return (
    <Bar options={options} data={data} width={200} height={500} style={{ background: '#121212' }} />
  );
}

export default BarChart;
