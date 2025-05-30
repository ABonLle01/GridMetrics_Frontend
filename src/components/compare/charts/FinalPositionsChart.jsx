import { Line } from 'react-chartjs-2';

export function FinalPositionsChart({ driverResults, driverName }) {
  const labels = driverResults.map(r => r.raceName);

  const data = {
    labels,
    datasets: [
      {
        label: `${driverName} Posición Final`,
        data: driverResults.map(r => r.finalPosition ?? null),
        borderColor: '#FF5733',
        backgroundColor: 'rgba(255, 87, 51, 0.3)',
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
        title: { display: true, text: 'Posición Final' },
        reverse: true,
        beginAtZero: false,
        ticks: { stepSize: 1 },
      },
      x: {
        title: { display: true, text: 'Race' },
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
