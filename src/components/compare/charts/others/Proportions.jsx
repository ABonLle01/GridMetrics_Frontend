import { getTeamColorByTeamOption } from '../../../../utils/selectOptions';
import { Doughnut } from 'react-chartjs-2';
import { ArcElement } from 'chart.js';

import {  Chart as ChartJS } from 'chart.js';

ChartJS.register(ArcElement);

function Proportions({ driverData }) {
    const doughnutOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'bottom' },
        },
    };

    const getPercentageData = (value, total, label, color) => ({
        labels: ['Esta Temporada', 'Temporadas Anteriores'],
        datasets: [
            {
                label,
                data: [value, total-value],
                backgroundColor: [color, '#e0e0e0'],
            },
        ],
    });

    const [driver1, driver2] = driverData;
    const seasonPctData1 = getPercentageData(
        driver1.stats.season_points,
        driver1.stats.total_points,
        `${driver1.name.first} ${driver1.name.last}`,
        getTeamColorByTeamOption(driver1.team)
    );

    const seasonPctData2 = getPercentageData(
        driver2.stats.season_points,
        driver2.stats.total_points,
        `${driver2.name.first} ${driver2.name.last}`,
        getTeamColorByTeamOption(driver2.team)
    );

    return (
        <div className="mt-5">
            <div className="row mt-4">
                <h3 className="text-center">% Puntos Temporada / Puntos Totales</h3>
                <div className="col-md-6 mb-4">
                    <h5 className='text-center w-100'>{driver1.name.first} {driver1.name.last}</h5>
                    <Doughnut data={seasonPctData1} options={doughnutOptions} />
                </div>
                <div className="col-md-6 mb-4">
                    <h5 className="text-center">{driver2.name.first} {driver2.name.last}</h5>
                    <Doughnut data={seasonPctData2} options={doughnutOptions} />
                </div>
            </div>
        </div>
    );
}


export default Proportions