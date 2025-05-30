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

export function QualifyingVsFinalChart({ driverResults, driverName }) {
  const labels = driverResults.map(r => r.raceName);

  const data = {
    labels,
    datasets: [
      {
        label: 'Posición Clasificación',
        data: driverResults.map(r => r.qualifyingPosition ?? null),
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.3)',
        tension: 0,
      },
      {
        label: 'Posición Final',
        data: driverResults.map(r => r.finalPosition ?? null),
        borderColor: 'green',
        backgroundColor: 'rgba(0, 255, 0, 0.3)',
        tension: 0,
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
      <h4 className="text-center mb-3">{driverName}</h4>
      <Line data={data} options={options} />
    </div>
  );
}
