import { useEffect, useState } from 'react';
import { translateSession } from '../../../../utils/translations';
import { formatDate, convertToLocalTime, formatTime } from '../../../../utils/dateFormating';
import { getDriverNameById } from '../../../../utils/getters';

function GPTimetable({ race }) {
  const [sessionResultsWithNames, setSessionResultsWithNames] = useState([]);
  const [top5ResultsWithNames, setTop5ResultsWithNames] = useState([]);

  useEffect(() => {
    const fetchNames = async () => {
      if (!race || !race.finished) return;

      const nameCache = {};
      const resolveDriverName = async (id) => {
        if (!id) return '—';
        return nameCache[id] ??= await getDriverNameById(id);
      };

      const sessionsWithNames = await Promise.all(
        race.sessions.map(async (session) => {
          const raw = session.session_result || {};

          // Extraemos directamente los tres primeros del objeto
          const firstObj  = raw.first;
          const secondObj = raw.second;
          const thirdObj  = raw.third;

          const first  = await resolveDriverName(firstObj?.driver);
          const second = await resolveDriverName(secondObj?.driver);
          const third  = await resolveDriverName(thirdObj?.driver);

          return {
            date: session.date,
            name: session.name,
            first,
            second,
            third,
          };
        })
      );

      const top5 = race.race_results
        .filter(r => parseInt(r.position?.$numberInt ?? r.position, 10) <= 5);
      const resultsWithNames = await Promise.all(
        top5.map(async (res) => ({
          ...res,
          driverName: await resolveDriverName(res.driver)
        }))
      );

      setSessionResultsWithNames(sessionsWithNames);
      setTop5ResultsWithNames(resultsWithNames);
    };

    fetchNames();
  }, [race]);


  if (!race || !race.sessions) {
    return <div className='text-center'>Cargando...</div>;
  }

  return (
    <>
      {race.finished && (
        <div className='container mt-5'>
          <h1 className='text-center'>{race.name}</h1>
          <h2>Resultados de la Carrera</h2>

          <table className='table table-bordered table-hover mt-2 text-center'>
            <thead className='table-dark'>
              <tr>
                <th className='fw-light'>Posición</th>
                <th className='fw-light'>Piloto</th>
                <th className='fw-light'>Tiempo Total</th>
              </tr>
            </thead>
            <tbody>
              {top5ResultsWithNames.map((result, idx) => (
                <tr key={idx}>
                  <td>{result.position}</td>
                  <td>{result.driverName}</td>
                  <td>{result.time || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2 className='mt-5'>Resultados por Sesión</h2>
          <table className='table table-bordered table-hover mt-1 text-center'>
            <thead className='table-dark'>
              <tr>
                <th className='fw-light'>Fecha</th>
                <th className='fw-light'>Sesión</th>
                <th className='fw-light text-warning'>1º</th>
                <th className='fw-light text-secondary'>2º</th>
                <th className='fw-light text-danger-emphasis'>3º</th>
              </tr>
            </thead>
            <tbody>
              {sessionResultsWithNames.map((session, index) => (
                <tr key={index}>
                  <td>{formatDate(session.date)}</td>
                  <td>{translateSession(session.name)}</td>
                  <td>{session.first}</td>
                  <td>{session.second}</td>
                  <td>{session.third}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!race.finished && (
        <div className='container mt-5'>
          <h2>{race.name}</h2>
          <table className='table table-bordered table-hover mt-1 text-center'>
            <thead className='table-dark'>
              <tr>
                <th className='fw-light'>Fecha</th>
                <th className='fw-light'>Sesión</th>
                <th className='fw-light'>Horario España</th>
                <th className='fw-light'>Hora Local</th>
              </tr>
            </thead>
            <tbody>
              {race.sessions.map((session, index) => (
                <tr key={index}>
                  <td>{formatDate(session.date)}</td>
                  <td>{translateSession(session.name)}</td>
                  <td>{convertToLocalTime(session.date, session.start_time, session.end_time, race.timeZone)}</td>
                  <td>{formatTime(session.start_time, session.end_time)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <span className='fs-6 text-primary'>* Los resultados de cada sesión estarán 2 horas después de la carrera</span>
        </div>
      )}
    </>
  );
}

export default GPTimetable;
