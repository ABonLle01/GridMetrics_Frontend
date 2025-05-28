import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const apiUrl = import.meta.env.VITE_BACKEND_URL;

function DriverCards() {
  const [drivers, setDrivers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        
        const res = await fetch(`${apiUrl}api/drivers/enriched`)
        const data = await res.json()
        data.sort((a, b) => b.season_points - a.season_points)
        setDrivers(data)
      } catch (err) {
        console.error(err)
        setError('Error al cargar los pilotos')
      } finally {
        setLoading(false)
      }
    }

    fetchDrivers()
  }, [])

  if (loading) return <p className="text-center">Cargando pilotos...</p>
  if (error) return <p className="text-danger text-center">{error}</p>

  return (
    <div className="container mt-4">
      <div className="row">
        {drivers.map((driver, index) => (
          <div key={driver._id || index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <Link
              to={`/drivers/${driver._id}`}
              className="text-decoration-none"
            >
              <div className="card h-100 shadow-sm text-dark position-relative fw-light">
                <div className="card-body bg-light">

                  <div className="d-flex justify-content-between mb-2 card-header bg-light">
                    <span className="badge bg-dark fw-light">Pos. {index + 1}</span>
                    <span className="badge bg-secondary fw-light">Puntos: {driver.season_points}</span>
                  </div>

                  <img
                    src={driver.profile_image}
                    alt={`${driver.name.first} ${driver.name.last}`}
                    className="img-fluid mb-3"
                    style={{ objectFit: 'cover', height: 'auto', width: '100%' }}
                  />

                  <div className="d-flex justify-content-between card-footer align-items-center bg-light">
                    <span className="fs-5">{driver.name.first} {driver.name.last}</span>
                    <div className="text-end">
                      <span className="badge fw-light fs-5" style={{ backgroundColor: driver.team_data.team_color }}>{driver.car_number}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DriverCards
