import { getTeamColorByTeamOption } from '../../../utils/selectOptions';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export function QualifyingVsFinalChart({ driver1Results, driver2Results, driver1, driver2 }) {
  const labels = driver1Results.map(r => r.raceName);

  const data = {
    labels,
    datasets: [
      {
        label: `${driver1?.name.first} ${driver1?.name.last} - Clasificación`,
        data: driver1Results.map(r => r.qualifyingPosition ?? null),
        borderColor: 'purple',
        backgroundColor: getTeamColorByTeamOption(driver1.team),
        tension: 0.3,
      },
      {
        label: `${driver1?.name.first} ${driver1?.name.last} - Final`,
        data: driver1Results.map(r => r.finalPosition ?? null),
        borderColor: 'violet',
        backgroundColor: getTeamColorByTeamOption(driver1.team),
        tension: 0.3,
      },
      {
        label: `${driver2?.name.first} ${driver2?.name.last} - Clasificación`,
        data: driver2Results.map(r => r.qualifyingPosition ?? null),
        borderColor: 'dark',
        backgroundColor: getTeamColorByTeamOption(driver2.team),
        tension: 0.3,
      },
      {
        label: `${driver2?.name.first} ${driver2?.name.last} - Final`,
        data: driver2Results.map(r => r.finalPosition ?? null),
        borderColor: 'gray',
        backgroundColor: getTeamColorByTeamOption(driver2.team),
        tension: 0.3,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: { mode: 'index', intersect: false },
    },
    interaction: {
      mode: 'nearest',
      intersect: false,
    },
    scales: {
      y: {
        title: { display: true, text: 'Posición' },
        reverse: true,
        beginAtZero: false,
        ticks: { stepSize: 1 },
      },
      x: {
        title: { display: true, text: 'Carrera' },
      }
    }
  };

  return (
    <div className="mb-5">
      <h3 className="text-center mb-3">Clasificación vs Posición Final</h3>
      <Line data={data} options={options} />
    </div>
  );
}

