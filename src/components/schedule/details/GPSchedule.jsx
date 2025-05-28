import { useState, useEffect } from 'react'
import Next from '../../home/next_gp/Next'
import { useParams } from 'react-router-dom';
import GPTimetable from './selected/GPTimetable';
import GPCircuit from './selected/GPCircuit';
const apiUrl = import.meta.env.VITE_BACKEND_URL;

const getDataFromUrl = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data ? data : null;
  } catch (error) {
    console.log("Error obteniendo datos: ", error);
    return null;
  }
}

function GPSchedule() {
  const [gps, setGps] = useState([]);
  const [circuit, setCircuit] = useState([]);
  const [race, setRace] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const raceData = await getDataFromUrl(`${apiUrl}api/races/circuit/${id}`);
        setRace(raceData[0]);

        const racesData = await getDataFromUrl(`${apiUrl}api/races/upcoming`);
        setGps(racesData);

        const circuitData = await getDataFromUrl(`${apiUrl}api/circuits/${id}`);
        setCircuit(circuitData);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, [id]);
  
  const [activeTab, setActiveTab] = useState('horario');    

  return (
    <>
      {gps.length>0 && <Next gps={gps}/>}

      <ul className="d-flex justify-content-center align-items-center gap-5 w-100 list-group list-group-horizontal border-top border-bottom">
        <li 
          className={`text-end list-group-item border-0 ${activeTab === 'horario' ? 'text-danger' : ''}`}
          onClick={() => setActiveTab('horario')}
          style={{ cursor: 'pointer' }}
        >
          Horario
        </li>

        <li className="list-group-item border-0 p-0 d-flex align-items-center">
          <div style={{
            borderLeft: "2px solid lightgray",
            height: "3rem"
          }}></div>
        </li>

        <li 
          className={`text-start list-group-item border-0 ${activeTab === 'circuito' ? 'text-danger' : ''}`}
          onClick={() => setActiveTab('circuito')}
          style={{ cursor: 'pointer' }}
        >
          Circuito
        </li>
      </ul>

      {activeTab === 'horario' && (
        <GPTimetable race = {race}></GPTimetable>
      )}
      
      {activeTab === 'circuito' && (
        <GPCircuit circuit = {circuit}></GPCircuit>
      )}
    </>
  )
}

export default GPSchedule