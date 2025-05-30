import { getTeamColorByTeamOption } from '../../../utils/selectOptions';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export const ComparisonChart = ({ driverData }) => {
  if (!driverData[0] || !driverData[1]) return null;

  const labels = ['Podios', 'GPs', 'Títulos', 'Puntos'];

  const data = {
    labels,
    datasets: [
      {
        label: `${driverData[0].name.first} ${driverData[0].name.last}`,
        data: [
          driverData[0].stats.podiums,
          driverData[0].stats.gp_entered,
          driverData[0].stats.world_championships,
          driverData[0].stats.total_points,
        ],
        backgroundColor: `${getTeamColorByTeamOption(driverData[0].team)}`,
      },
      {
        label: `${driverData[1].name.first} ${driverData[1].name.last}`,
        data: [
          driverData[1].stats.podiums,
          driverData[1].stats.gp_entered,
          driverData[1].stats.world_championships,
          driverData[1].stats.total_points,
        ],
        backgroundColor: `${getTeamColorByTeamOption(driverData[1].team)}`,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  return (
    <div className="mt-5">
      <h3 className="text-center mb-3">Comparativa Estadística</h3>
      <Bar data={data} options={options} />
    </div>
  );
};
