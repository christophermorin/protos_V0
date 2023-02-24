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
  // ChartJS.defaults.elements.bar.borderWidth = ;
  const options = {
    indexAxis: 'x',
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: {
        grid: {
          color: 'rgba(255,0,0,1)',
        },
      },
      yAxes: {
        grid: {
          color: 'rgba(0,255,0,1)',
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
      colors: {
        enabled: true,
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
    <Bar options={options} data={data} width={200} height={500} />
  );
}

export default BarChart;
