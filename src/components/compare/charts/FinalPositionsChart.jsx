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

export function FinalPositionsChart({ driver1Results, driver2Results, driver1, driver2 }) {
  const allRaces = [...driver1Results, ...driver2Results]
    .map(r => ({ date: r.date, raceName: r.raceName }))
    .reduce((acc, curr) => {
      if (!acc.find(r => r.date === curr.date)) acc.push(curr);
      return acc;
    }, [])
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const getFinalPositionsByDate = (results) => {
    const positionsByDate = {};
    results.forEach(r => positionsByDate[r.date] = r.finalPosition ?? null);
    return allRaces.map(r => positionsByDate[r.date] ?? null);
  };

  const data = {
    labels: allRaces.map(r => r.raceName),
    datasets: [
      {
        label: `${driver1?.name.first} ${driver1?.name.last}`,
        data: getFinalPositionsByDate(driver1Results),
        borderColor: getTeamColorByTeamOption(driver1.team),
        backgroundColor: 'yellow',
        tension: 0,
        pointRadius: 4,
      },
      {
        label: `${driver2?.name.first} ${driver2?.name.last}`,
        data: getFinalPositionsByDate(driver2Results),
        borderColor: getTeamColorByTeamOption(driver2.team),
        backgroundColor: 'purple',
        tension: 0,
        pointRadius: 4,
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
        title: { display: true, text: 'Posición Final' },
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
      <h3 className="text-center mb-3">Posiciones Finales en cada GP</h3>
      <Line data={data} options={options} />
    </div>
  );
}
