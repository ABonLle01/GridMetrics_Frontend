import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { translateCountry } from '../../utils/translations'
const apiUrl = import.meta.env.VITE_BACKEND_URL;

function Cards() {
  const [races, setRaces] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const res = await fetch(`${apiUrl}api/races/schedule`)
        const data = await res.json()
        data.sort((a, b) => a.round - b.round);
        setRaces(data)
      } catch (err) {
        console.error(err)
        setError('Error al cargar las carreras')
      } finally {
        setLoading(false)
      }
    }

    fetchRaces()
  }, [])

  if (loading) return <p className="text-center">Cargando carreras...</p>
  if (error) return <p className="text-danger text-center">{error}</p>

  
  return (
    <div className="container mt-4">
      <div className="row">
        {races.map((race, index) => {
          return (
            <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <Link to={`/circuits/${race.circuit_info.id}`} className="text-decoration-none">
                <div className="card h-100 shadow-sm text-light fw-light">
                  <div className="card-body bg-light">
                    <div className="card-header bg-light d-flex justify-content-between">
                      <span className="badge bg-danger fw-light fs-6">
                        Ronda {race.round}
                      </span>

                      {race.finished && (
                        <span className="badge bg-secondary fw-light fs-6">
                          Terminado
                        </span>
                      )}
                    </div>

                    <img
                      src={race.circuit_info.map.track.black}
                      style={{ height: 'auto', width: '100%' }}
                      alt={`Mapa de ${race.name}`}
                    />

                    <h5 className="card-title fs-6">{race.name}</h5>
                    <div className="card-footer text-dark bg-light">
                      <strong className='text-black'>Fecha:</strong> {new Date(race.date).toLocaleDateString()}<br />
                      <div className='d-flex flex-direction-row justify-content-between align-items-start'>
                        <div>
                          <strong className='text-black'>País:</strong> {translateCountry(race.circuit_info.country.name)}
                        </div>
                        <img
                          src={race.circuit_info.country.flag}
                          alt={race.circuit_info.country.name}
                          style={{ width: '40px', borderRadius: '3px', border: '1px solid black' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Cards
