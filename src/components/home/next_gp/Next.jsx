import { React, useEffect, useState } from 'react';
import { useCuentaRegresiva } from './CuentaRegresiva';
import { getNextSession, getEventDays, getMonthName, getCircuitMap } from '../../../utils/utils';
import { Link } from 'react-router-dom';

function Next({gps}) {
    const [map, setMap] = useState('');
    const gp = gps.find(gp => getNextSession(gp.sessions));
    const nextSession = gp ? getNextSession(gp.sessions) : null;
    switch(nextSession.name){
      case "Practice 1": nextSession.name = "Entrenamientos 1"; break; 
      case "Practice 2": nextSession.name = "Entrenamientos 2"; break; 
      case "Practice 3": nextSession.name = "Entrenamientos 3"; break; 
      case "Qualifying": nextSession.name = "Clasificación"; break; 
      case "Race": nextSession.name = "Carrera"; break; 
      case "Sprint Qualifying": nextSession.name = "Clasificación Sprint"; break; 
      case "Sprint": nextSession.name = "Carrera Sprint"; break; 
    }
    const fullDate = `${nextSession.date}T${nextSession.start_time}`;

    useEffect(() => {
      if (gp && gp.circuit) {
          const fetchMap = async () => {
              const circuitMap = await getCircuitMap(gp.circuit);
              setMap(circuitMap);
          };

          fetchMap();
      }
    }, [gp]);

    if (!gp || !nextSession) {
      return (
        <div className="container-fluid bg-dark text-white text-center p-5">
          <h4>Sin próximos eventos</h4>
          <p>No hay próximos Grandes Premios en el calendario.</p>
        </div>
      );
    }

    const timeZoneCircuito = gp.timeZone;
    const { days, hours, minutes, seconds, totalHours, finalizado } = useCuentaRegresiva(fullDate, timeZoneCircuito);
    
    const [startDay, endDay] = getEventDays(gp.sessions);
    const month = getMonthName(gp.sessions[0]?.date);
  
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
      setIsHovered(true);
    }

    const handleMouseLeave = () => {
      setIsHovered(false);
    }

    const linkStyle = {
      color: isHovered? "red" : "white",
    }

    return (
      <div className="container-fluid bg-dark text-white">
        <div className="container d-flex justify-content-evenly align-items-center p-3">
          <div className="row justify-content-center align-items-center w-50">
            <div className="d-flex flex-column col-6 align-items-center justify-content-center">
              <div className="d-flex flex-direction-column gap-2">
                <span>{startDay}</span>-<span>{endDay}</span>
                <span>{month}</span>
              </div>
              {map && <img src={map} alt="GP MAP" width="130" />}
            </div>
  
            <div className="col-6 text-center d-flex align-items-center justify-content-center pt-2">
              <Link 
                to={`/circuits/${gp.circuit}`}
                className="text-decoration-none"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={linkStyle}
              >
                <h4>{gp.name} 2025</h4>
              </Link>
            </div>
          </div>
  
          <div className="d-flex flex-column justify-content-center w-25">
            <h4 className="text-center pt-3">{nextSession.name}</h4>
            <hr />
            {finalizado ? (
              <div className="text-center fw-bold text-danger">
                ¡{nextSession.name} ha comenzado!
              </div>
            ) : (
              <div className="text-center d-flex gap-4 justify-content-center align-items-center">
                {totalHours >= 24 && (
                  <div className="px-4 border-end d-flex flex-column align-items-center gap-2">
                    <span>{days}</span>
                    <span>Días</span>
                  </div>
                )}
                <div
                  className={`px-4 ${
                    totalHours >= 24 ? 'border-start border-end' : 'border-end'
                  } d-flex flex-column align-items-center gap-2`}
                >
                  <span>{totalHours < 24 ? hours + days * 24 : hours}</span>
                  <span>Horas</span>
                </div>
                <div
                  className={`px-4 ${
                    totalHours >= 24 ? 'border-start' : ''
                  } d-flex flex-column align-items-center gap-2`}
                >
                  <span>{minutes}</span>
                  <span>Minutos</span>
                </div>
                {totalHours < 24 && (
                  <div className="px-4 border-start d-flex flex-column align-items-center gap-2">
                    <span>{seconds}</span>
                    <span>Segundos</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
}
  

export default Next;
