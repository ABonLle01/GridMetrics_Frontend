import { getTeamColorByTeamOption } from '../../../utils/selectOptions';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export function AccumulatedPointsChart({ driver1Results, driver2Results, driver1, driver2 }) {
  const allRaces = [...driver1Results, ...driver2Results]
    .map(r => ({ date: r.date, raceName: r.raceName }))
    .reduce((acc, curr) => {
      if (!acc.find(r => r.date === curr.date)) acc.push(curr);
      return acc;
    }, [])
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const getAccumulatedPoints = (results) => {
    let sum = 0;
    const pointsByDate = {};
    results.forEach(r => pointsByDate[r.date] = r.points);
    return allRaces.map(race => {
      sum += pointsByDate[race.date] || 0;
      return sum;
    });
  };

  const accDriver1 = getAccumulatedPoints(driver1Results);
  const accDriver2 = getAccumulatedPoints(driver2Results);

  // Preparar datos para Chart.js
  const data = {
    labels: allRaces.map(r => r.raceName),
    datasets: [
      {
        label: `${driver1?.name.first} ${driver1?.name.last}`,
        data: accDriver1,
        borderColor: `${getTeamColorByTeamOption(driver1.team)}`,
        backgroundColor: 'yellow',
        fill: false,
        tension: 0,
        pointRadius: 5,
      },
      {
        label: `${driver2?.name.first} ${driver2?.name.last}`,
        data: accDriver2,
        borderColor: `${getTeamColorByTeamOption(driver2.team)}`,
        backgroundColor: 'purple',
        fill: false,
        tension: 0,
        pointRadius: 5,
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
      x: {
        title: {
          display: true,
          text: 'Carrera',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Puntos Acumulados',
        },
        beginAtZero: true,
      },
    },
  };

    return (
        <div className="mt-5">
          <h3 className="text-center mb-3">Rendimiento acumulado de puntos en la temporada</h3>
          <Line data={data} options={options} />
        </div>
    );
}
