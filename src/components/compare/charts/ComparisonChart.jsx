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

const statLabels = ['Podios', 'GPs', 'Títulos Mundiales', 'Puntos Totales'];
const statKeys = ['podiums', 'gp_entered', 'world_championships', 'total_points'];

export const ComparisonChart = ({ driverData }) => {
  if (!driverData[0] || !driverData[1]) return null;

  const getChartData = (label, key) => ({
    labels: [label],
    datasets: [
      {
        label: `${driverData[0].name.first} ${driverData[0].name.last}`,
        data: [driverData[0].stats[key]],
        backgroundColor: getTeamColorByTeamOption(driverData[0].team),
      },
      {
        label: `${driverData[1].name.first} ${driverData[1].name.last}`,
        data: [driverData[1].stats[key]],
        backgroundColor: getTeamColorByTeamOption(driverData[1].team),
      },
    ],
  });

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="mt-5">
      <h3 className="text-center mb-4">Comparativa Estadística</h3>
      <div className="row">
        {statLabels.map((label, index) => (
          <div className="col-md-6 mb-4" key={label}>
            <h5 className="text-center">{label}</h5>
            <Bar data={getChartData(label, statKeys[index])} options={options} />
          </div>
        ))}
      </div>
    </div>
  );
};
