import { ComparisonChart } from './charts/ComparisonChart.jsx'
import { AccumulatedPointsChart } from './charts/AccumulatedPointsChart.jsx';
import { QualifyingVsFinalChart } from './charts/QualifyingVsFinalChart.jsx';
import { FinalPositionsChart } from './charts/FinalPositionsChart.jsx';

import { useEffect, useState } from 'react';
import { getTeamIdByOption } from '../../utils/selectOptions';
const url = import.meta.env.VITE_BACKEND_URL;

function Compare() {
  const [teamData, setTeamData] = useState([null, null]);
  const [drivers, setDrivers] = useState([]);
  const [selectedDrivers, setSelectedDrivers] = useState([null, null]);
  const [driverData, setDriverData] = useState([null, null]);
  const [driverResults, setDriverResults] = useState([[], []]);

  const [showComparisonChart, setShowComparisonChart] = useState(true);
  const [showAccumulatedPointsChart, setShowAccumulatedPointsChart] = useState(true);
  const [showQualifyingVsFinalChart, setShowQualifyingVsFinalChart] = useState(true);
  const [showFinalPositionsChart, setShowFinalPositionsChart] = useState(true);


  useEffect(() => {
    fetch(`${url}api/drivers`)
      .then(res => res.json())
      .then(data => setDrivers(data));
  }, []);

  useEffect(() => {
    const [id1, id2] = selectedDrivers;
    if (id1 && id2) {
      Promise.all([
        fetch(`${url}api/drivers/id/${id1}`).then(res => res.json()),
        fetch(`${url}api/drivers/id/${id2}`).then(res => res.json())
      ]).then(([data1, data2]) => {
        const extendedData1 = {
          ...data1,
          stats: {
            ...data1.stats,
            average_points: data1.stats.total_points / data1.stats.gp_entered
          }
        };

        const extendedData2 = {
          ...data2,
          stats: {
            ...data2.stats,
            average_points: data2.stats.total_points / data2.stats.gp_entered
          }
        };

        setDriverData([extendedData1, extendedData2]);

        Promise.all([
          fetch(`${url}api/drivers/${id1}/results`).then(res => res.json()),
          fetch(`${url}api/drivers/${id2}/results`).then(res => res.json())
        ]).then(([results1, results2]) => {
          setDriverResults([results1.results, results2.results]); 
        });

        Promise.all([
          fetch(`${url}api/teams/${getTeamIdByOption(data1.team)}`).then(res => res.json()),
          fetch(`${url}api/teams/${getTeamIdByOption(data2.team)}`).then(res => res.json())
        ]).then(([team1, team2]) => {
          setTeamData([team1, team2]);
        });
      });
    }
  }, [selectedDrivers]);



  const handleSelect = (index, value) => {
    const newSelection = [...selectedDrivers];
    newSelection[index] = value;
    setSelectedDrivers(newSelection);
  };

  const getComparisonClass = (index, field) => {
    const [data1, data2] = driverData;
    if (!data1 || !data2) return '';

    const val1 = data1.stats[field];
    const val2 = data2.stats[field];

    if (val1 === val2) return 'fs-6';

    const isGreater = index === 0 ? val1 > val2 : val2 > val1;
    return isGreater ? 'text-success fs-6' : 'text-danger fs-6';
  };


  const renderCompareCard = (data, teamInfo, index) => {
    if (!data) return null;

    return (
      <div className="col-12 col-md-6 col-lg-5 mb-4">
        <div className="card h-100 text-center shadow-sm">
          <img src={data.profile_image} alt={data.name.first} className="card-img-top mx-auto mt-3" style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '40%' }} />
          <div className="card-body">
            <div className='d-flex justify-content-center align-items-center gap-3'>
              <h5 className="card-title my-1">{data.name.first} {data.name.last}</h5>
              <img src={data.nationality.flag_image} alt={data.nationality.country} className="" style={{ width: '36px', height: 'auto', objectFit: 'cover', borderRadius: '3px', border: '1px solid rgba(102, 102, 102, 0.4)' }} />
            </div>
            <h6 className="card-subtitle mb-2 text-muted">{teamInfo || 'Equipo desconocido'}</h6>
            <ul className="list-group list-group-flush text-start mt-3">
              <li className="list-group-item d-flex justify-content-between"><span className='fs-6'>Nacionalidad:</span> {data.nationality.country}</li>
              <li className="list-group-item d-flex justify-content-between"><span className='fs-6'>Número:</span> {data.car_number}</li>
              <li className="list-group-item d-flex justify-content-between"> <span className='fs-6'>Podios:</span> <span className={getComparisonClass(index, 'podiums')}>{data.stats.podiums}</span> </li>
              <li className="list-group-item d-flex justify-content-between"> <span className='fs-6'>GPs:</span> <span className={getComparisonClass(index, 'gp_entered')}>{data.stats.gp_entered}</span> </li> 
              <li className="list-group-item d-flex justify-content-between"> <span className='fs-6'>Títulos mundiales:</span> <span className={getComparisonClass(index, 'world_championships')}>{data.stats.world_championships}</span> </li> 
              <li className="list-group-item d-flex justify-content-between"> <span className='fs-6'>Puntos totales:</span> <span className={getComparisonClass(index, 'total_points')}>{data.stats.total_points}</span> </li>
              <li className="list-group-item d-flex justify-content-between"> <span className='fs-6'>Puntos esta temporada:</span> <span className={getComparisonClass(index, 'season_points')}>{data.stats.season_points}</span> </li>
              <li className="list-group-item d-flex justify-content-between"> <span className='fs-6'>Media de puntos por carrera:</span> <span className={getComparisonClass(index, 'average_points')}>{parseFloat((data.stats.total_points / data.stats.gp_entered).toFixed(3))}</span> </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };



  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Comparar Pilotos</h1>
      
      <div className="row justify-content-center mb-4">
        {[0, 1].map(i => (
          <div key={i} className="col-12 col-md-5 mb-3">
            <select value={selectedDrivers[i] || ''} onChange={(e) => handleSelect(i, e.target.value)} className="form-select" >
              <option value="">Selecciona un piloto</option>
              {drivers.map(driver => (
                <option key={driver._id} value={driver._id}>
                  {driver.name.first} {driver.name.last}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div className="row justify-content-center">
        {renderCompareCard(driverData[0], teamData[0], 0)}
        {renderCompareCard(driverData[1], teamData[1], 1)}
      </div>



      {driverResults[0] && driverResults[1] && driverData[0] && driverData[1] && (
        <>
          <div className="mb-4 d-flex flex-wrap gap-2 justify-content-center">
            <button
              className={`btn ${showComparisonChart ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setShowComparisonChart(prev => !prev)}
            >
              {showComparisonChart ? 'Ocultar' : 'Mostrar'} comparación general
            </button>

            <button
              className={`btn ${showAccumulatedPointsChart ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setShowAccumulatedPointsChart(prev => !prev)}
            >
              {showAccumulatedPointsChart ? 'Ocultar' : 'Mostrar'} puntos acumulados
            </button>

            <button
              className={`btn ${showQualifyingVsFinalChart ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setShowQualifyingVsFinalChart(prev => !prev)}
            >
              {showQualifyingVsFinalChart ? 'Ocultar' : 'Mostrar'} clasificación vs carrera
            </button>

            <button
              className={`btn ${showFinalPositionsChart ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setShowFinalPositionsChart(prev => !prev)}
            >
              {showFinalPositionsChart ? 'Ocultar' : 'Mostrar'} posiciones carrera
            </button>
          </div>


          {showComparisonChart && <ComparisonChart driverData={driverData} />}

          {showAccumulatedPointsChart && (
            <AccumulatedPointsChart
              driver1Results={driverResults[0]}
              driver2Results={driverResults[1]}
              driver1={driverData[0]}
              driver2={driverData[1]}
            />
          )}

          {showQualifyingVsFinalChart && (
            <QualifyingVsFinalChart
              driver1Results={driverResults[0]}
              driver2Results={driverResults[1]}
              driver1={driverData[0]}
              driver2={driverData[1]}
            />
          )}

          {showFinalPositionsChart && (
            <FinalPositionsChart
              driver1Results={driverResults[0]}
              driver2Results={driverResults[1]}
              driver1={driverData[0]}
              driver2={driverData[1]}
            />
          )}
        </>
      )}



    </div>
  );
}

export default Compare;
