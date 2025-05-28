import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const apiUrl = import.meta.env.VITE_BACKEND_URL;

function TeamCards() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await fetch(`${apiUrl}api/teams/all/enriched`)
        const data = await res.json()
        data.sort((a, b) => b.points - a.points);
        setTeams(data)
      } catch (err) {
        console.error(err)
        setError('Error al cargar los pilotos')
      } finally {
        setLoading(false)
      }
    }

    fetchTeams()
  }, [])

  if (loading) return <p className="text-center">Cargando equipos...</p>
  if (error) return <p className="text-danger text-center">{error}</p>

  return (
    <div className="container mt-4">
      <div className="row">
        {teams.map((team, index) => (
          <div key={team._id || index} className="col-12 col-md-6 mb-4">
            <Link
              to={`/teams/${team._id}`}
              className="text-decoration-none"
            >
              <div className="card h-100 shadow-sm text-dark fw-light">
                <div className="card-header d-flex justify-content-between align-items-center" style={{ backgroundColor: team.team_color }}>
                  <img src={team.logo} alt={team.name} style={{ height: '40px' }} />
                  <span className="badge bg-dark fw-light">Puntos: {team.points}</span>
                </div>

                <div className="card-body bg-light">
                  <h4 className="card-title">{team.fullname}</h4>

                  <div className="d-flex justify-content-around">
                    {team.drivers.map((driver, i) => (
                      <div key={i} className="text-center">
                        <img
                          src={driver.profileImage}
                          alt={`${driver.firstName} ${driver.lastName}`}
                          style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '45%' }}
                        />
                        <p className="mt-1">{driver.firstName} {driver.lastName}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {team.team_images?.car && (
                  <img
                    src={team.team_images.car}
                    alt="Car"
                    className="card-img-bottom"
                    style={{ objectFit: 'cover', height: 'auto', width: '100%' }}
                  />
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamCards