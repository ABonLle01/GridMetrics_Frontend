import { useEffect, useState } from 'react';
import axios from 'axios';
import { getOption, getTeamByDriver, getGPId, getDriverIdByDriver, getDriveIdByOption, getTeamIdByOption, translateState } from '../../../utils/selectOptions';
const apiUrl = import.meta.env.VITE_BACKEND_URL;

async function fetchData(dataType, option) {
  try {
    let url = "";
    if (dataType === "races") {
      url = option === "all"
        ? `${apiUrl}api/races/finished/`
        : `${apiUrl}api/races/finished/${getGPId(option)}`;
    } else if (dataType === "drivers") {
      url = option === "all"
        ? `${apiUrl}api/drivers/`
        : `${apiUrl}api/drivers/${getDriveIdByOption(option)}/results`;
    } else if (dataType === "teams") {
      url = option === "all"
        ? `${apiUrl}api/teams/`
        : `${apiUrl}api/teams/${getTeamIdByOption(option)}/results`;
    }

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function hasValidData(data) {
  if (!data) return false;
  if (Array.isArray(data)) return data.length > 0;
  if (data.results && Array.isArray(data.results)) return data.results.length > 0;
  return false;
}

function GeneralData({ dataType, option }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchData(dataType, option).then((fetchedData) => {
      if (hasValidData(fetchedData)) {
        setData(fetchedData);
      } else {
        console.warn("Datos vacíos o inválidos:", fetchedData);
        setData(null);
      }

      setLoading(false);
    });
  }, [dataType, option]);

  if (loading) return <div>Cargando datos...</div>;
  if (!data) return <div>No hay datos disponibles...</div>;

  const raceSession = data[0]?.sessions?.find(s => s.name === "Race")?.session_result;
  const hasRaceResults = raceSession && Object.keys(raceSession).length > 0;

  const raceRows = hasRaceResults
    ? Object.values(raceSession).map((result, index) => {
      const driverName = getOption(result.driver) || "N/A";
      const teamName = getTeamByDriver(result.driver) || "N/A";
      const number = getDriverIdByDriver(result.driver).number || "N/A";
      const teamColor = getDriverIdByDriver(result.driver).color || "#ffffff";
      const position = result.position?.Position || index + 1;
      const status = result.status;
      const time = result.time || "No Time";
      const points = result.points ?? 0;
      const displayTime = status === "Retired" ? "Retirado" : time;

      return (
        <tr key={result.driver || index}>
          <td>{position}</td>
          <td style={{ color: teamColor }}>{number}</td>
          <td>{driverName}</td>
          <td>{teamName}</td>
          <td>{displayTime}</td>
          <td>{points}</td>
        </tr>
      );
    })
    : [];

  return (
    <div className="container-fluid py-3">
      {dataType === "races" && option === "all" && (
        <div className="table-responsive">
          <table className="table table-hover table-bordered table-striped table-sm align-middle text-center">
            <thead className="table-dark">
              <tr>
                <th className="fw-light">Gran Premio</th>
                <th className="fw-light">Fecha</th>
                <th className="fw-light">Ganador</th>
                <th className="fw-light">Equipo</th>
                <th className="fw-light">Vueltas</th>
                <th className="fw-light">Tiempo</th>
              </tr>
            </thead>
            <tbody>
              {data.map((race) => {
                const winner = race.race_results.find(r => r.position === 1);
                return (
                  <tr key={race._id}>
                    <td>{race.name}</td>
                    <td>{formatDate(race.date)}</td>
                    <td>{getOption(winner?.driver) || "N/A"}</td>
                    <td>{getTeamByDriver(race.sessions?.[4]?.session_result?.first?.driver) || "N/A"}</td>
                    <td>{race.number_of_laps || "N/A"}</td>
                    <td>{winner?.time || "N/A"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {dataType === "races" && option !== "all" && (
        <div className="table-responsive">
          <table className="table table-hover table-bordered table-striped table-sm align-middle text-center">
            <thead className="table-dark">
              <tr>
                <th className="fw-light">Pos</th>
                <th className="fw-light">Nº</th>
                <th className="fw-light">Piloto</th>
                <th className="fw-light">Equipo</th>
                <th className="fw-light">Tiempo/Retirado</th>
                <th className="fw-light">Puntuación</th>
              </tr>
            </thead>
            <tbody>
              {hasRaceResults ? raceRows : (
                <tr>
                  <td colSpan="6">Sin datos</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {dataType === "drivers" && option === "all" && (
        <div className="table-responsive">
          <table className="table table-hover table-bordered table-striped table-sm align-middle text-center">
            <thead className="table-dark">
              <tr>
                <th className="fw-light">Posición</th>
                <th className="fw-light">Nombre</th>
                <th className="fw-light">Nacionalidad</th>
                <th className="fw-light">Equipo</th>
                <th className="fw-light">Puntuación</th>
              </tr>
            </thead>
            <tbody>
                {data
                .filter(driver => driver?.stats?.season_points !== undefined)
                .sort((a, b) => b.stats.season_points - a.stats.season_points)
                .map((driver, index) => (
                  <tr key={driver._id}>
                    <td>{index + 1}</td>
                    <td>{driver.name.first} {driver.name.last}</td>
                    <td>{driver.nationality.country}</td>
                    <td>{getOption(driver.team)}</td>
                    <td>{driver.stats.season_points}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {dataType === "drivers" && option !== "all" && (
        <div className="table-responsive">
          <table className="table table-hover table-bordered table-striped table-sm align-middle text-center">
            <thead className="table-dark">
              <tr>
                <th className="fw-light">Gran Premio</th>
                <th className="fw-light">Fecha</th>
                <th className="fw-light">Equipo</th>
                <th className="fw-light">Posición</th>
                <th className="fw-light">Puntos</th>
                <th className="fw-light">Estado</th>
              </tr>
            </thead>
            <tbody>
              {data.results ? (
                data.results.map(result => (
                  <tr key={result.raceId}>
                    <td>{result.raceName}</td>
                    <td>{formatDate(result.date)}</td>
                    <td>{getTeamByDriver(data.driverId_short)}</td>
                    <td>{result.position}</td>
                    <td>{result.points}</td>
                    <td>{translateState(result.status)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No hay resultados disponibles</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {dataType === "teams" && option === "all" && (
        <div className="table-responsive">
          <table className="table table-hover table-bordered table-striped table-sm align-middle text-center">
            <thead className="table-dark">
              <tr>
                <th className="fw-light">Posición</th>
                <th className="fw-light">Nombre</th>
                <th className="fw-light">Puntuación</th>
              </tr>
            </thead>
            <tbody>
                {data
                .sort((a, b) => b.points - a.points)
                .map((team, index) => (
                  <tr key={team._id}>
                    <td>{index + 1}</td>
                    <td>{getOption(team._id)}</td>
                    <td>{team.points}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {dataType === "teams" && option !== "all" && (
        <div className="table-responsive">
          <table className="table table-hover table-bordered table-striped table-sm align-middle text-center">
            <thead className="table-dark">
              <tr>
                <th className="fw-light">Gran Premio</th>
                <th className="fw-light">Fecha</th>
                <th className="fw-light">Puntuación</th>
              </tr>
            </thead>
            <tbody>
              {data.results ? (
                data.results.map((result) => (
                  <tr key={result.raceId}>
                    <td>{result.raceName}</td>
                    <td>{formatDate(result.date)}</td>
                    <td>{result.totalPoints}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No hay resultados disponibles</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}


    </div>
  );

}

export default GeneralData;
