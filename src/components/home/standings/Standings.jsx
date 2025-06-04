import  { useState, useEffect } from 'react'
import './Standings.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
const apiUrl = import.meta.env.VITE_BACKEND_URL;

function Standings() {
  const [activeTab, setActiveTab] = useState('drivers')
  const [drivers, setDrivers] = useState([])
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const generateKey = (prefix, index) => `${prefix}-${index}`

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const [driversRes, teamsRes] = await Promise.all([
          axios.get(`${apiUrl}api/drivers/summary`),
          axios.get(`${apiUrl}api/teams/all/summary`),
        ]) 

        setDrivers(driversRes.data)
        setTeams(teamsRes.data)
        setError(null)
      } catch (err) {
        console.error(err)
        setError('Error al cargar los datos.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const sortedDrivers = [...drivers].sort((a, b) => b.seasonPoints - a.seasonPoints)
  const podiumDrivers = sortedDrivers.slice(0, 3)
  const tableDrivers = sortedDrivers.slice(3, 10)
  console.log(podiumDrivers)

  const sortedTeams = [...teams].sort((a, b) => b.season_points - a.season_points)
  const podiumTeams = sortedTeams.slice(0, 3)
  const tableTeams = sortedTeams.slice(3, 10)

  const navigate = useNavigate();

  const renderDriversStandings = () => (
    <>
      <div className="d-flex flex-wrap justify-content-evenly w-100 gap-3">
        {podiumDrivers.map((driver, index) => (
          <Link key={generateKey('podium-driver', index)} to={`/drivers/${driver._id}`} className="text-decoration-none text-dark" style={{ textDecoration: 'none', minWidth: '180px' }} >
            <div className="d-flex flex-column gap-2 align-items-center">
              <img src={driver.profileImage} alt={driver.fullName} width={180} className={`podium-${index + 1}`} />
              <div className="d-flex w-100 justify-content-between px-3">
                <span className="fw-bold">{index + 1}.</span>
                <span>{driver.fullName}</span>
              </div>
              <div className="points-badge">{driver.seasonPoints} pts</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="container w-100 overflow-none">
        <table className="table table-hover w-100">
          <thead className="table-dark">
            <tr>
              <th className="fw-light">Pos</th>
              <th className="fw-light">Driver</th>
              <th className="fw-light">Team</th>
              <th className="fw-light">Points</th>
            </tr>
          </thead>
          <tbody>
            {tableDrivers.map((driver, index) => (
              <tr
                key={generateKey('driver-row', index)}
                className={`team-${driver.teamName} table-row-clickable`}
                onClick={() => navigate(`/drivers/${driver._id}`)}
                style={{ cursor: 'pointer' }}
              >
                <td>{index + 4}</td>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <img src={driver.flagImage} alt={driver.fullName} width={20} className="country-flag" />
                    {driver.fullName}
                  </div>
                </td>
                <td>{driver.teamName}</td>
                <td>{driver.seasonPoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

const renderTeamsStandings = () => (
  <>
    <div className="d-flex flex-wrap justify-content-evenly w-100 gap-3">
      {podiumTeams.map((team, index) => (
        <Link key={generateKey('podium-team', index)} to={`/teams/${team.id}`} className="text-decoration-none text-dark" style={{ textDecoration: 'none', minWidth: '180px' }} >
          <div className="d-flex flex-column gap-2 align-items-center">
            <img src={team.logo} alt={team.name} width={180} className={`podium-${index + 1}`} />
            <div className="d-flex w-100 justify-content-between px-3">
              <span className="fw-bold">{index + 1}.</span>
              <span>{team.name}</span>
            </div>
            <div className="points-badge">{team.season_points} pts</div>
          </div>
        </Link>
      ))}
    </div>

    <div className="container w-100 overflow-none mt-4">
      <table className="table table-hover w-100">
        <thead className="table-dark">
          <tr>
            <th className="fw-light">Pos</th>
            <th className="fw-light">Team</th>
            <th className="fw-light">Points</th>
          </tr>
        </thead>
        <tbody>
          {tableTeams.map((team, index) => (
            <tr
              key={generateKey('team-row', index)}
              onClick={() => navigate(`/teams/${team.id}`)}
              style={{ cursor: 'pointer' }}
              className="table-row-clickable"
            >
              <td>{index + 4}</td>
              <td>
                <div className="d-flex align-items-center justify-content-evenly">
                  <img src={team.logo} alt={team.name} className="img-fluid team-logo" style={{ maxWidth: '130px' }} />
                  <span>{team.name}</span>
                </div>
              </td>
              <td>{team.season_points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  </>
);


  const getActiveContent = () => {
    if (loading) return <p className='text-center'>Cargando...</p>
    if (error) return <p>{error}</p>

    switch (activeTab) {
      case 'drivers': return renderDriversStandings()
      case 'teams': return renderTeamsStandings()
      default: return renderDriversStandings()
    }
  }

  return (
<div className="container-fluid bg-light">
  <div className="container d-flex justify-content-center flex-column align-items-center p-3 gap-5">
    
    {/* Botones tabs responsivos */}
    <div className="d-flex flex-column flex-md-row justify-content-center align-items-center w-100 gap-3">
      <button 
        type="button" 
        className={`btn w-100 w-md-auto ${activeTab === 'drivers' ? 'btn-danger' : 'btn-outline-danger'}`}
        onClick={() => setActiveTab('drivers')}
      >
        Campeonato de Pilotos
      </button>
      <button 
        type="button" 
        className={`btn w-100 w-md-auto ${activeTab === 'teams' ? 'btn-danger' : 'btn-outline-danger'}`}
        onClick={() => setActiveTab('teams')}
      >
        Campeonato de Equipos
      </button>
    </div>

    {/* Contenido dinámico responsivo */}
    <div className="container d-flex justify-content-center flex-column align-items-center gap-3">
      {getActiveContent()}
    </div>

  </div>
</div>

  )
}

export default Standings
