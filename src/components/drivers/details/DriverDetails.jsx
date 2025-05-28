import './DriverDetails.css'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
const apiUrl = import.meta.env.VITE_BACKEND_URL;

function DriverDetail() {
  const { id } = useParams()
  const [driver, setDriver] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [hover, setHover] = useState(false)
  const handleMouseEnter = () => setHover(true)
  const handleMouseLeave = () => setHover(false)

  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const res = await fetch(`${apiUrl}api/drivers/id/${id}`)
        if (!res.ok) throw new Error('Piloto no encontrado')
        const data = await res.json()
        setDriver(data)
      } catch (err) {
        console.error(err)
        setError('Error al cargar la información del piloto')
      } finally {
        setLoading(false)
      }
    }

    fetchDriver()
  }, [id])

  if (loading) return <p className="text-center">Cargando piloto...</p>
  if (error) return <p className="text-danger text-center">{error}</p>
  if (!driver) return null

  return (
    <div className="container mt-5 fw-light">
      <div className="card shadow p-5">
        <div className="row">
          <div className="col-md-4 text-center">
            <img
              src={driver.profile_image}
              alt={`${driver.name.first} ${driver.name.last}`}
              className="img-fluid rounded"
              style={{ height: 'auto', width: '100%', backgroundColor: driver.team_data.team_color }}
            />
            <div className="column">
              <div className='d-flex gap-3 align-items-center mt-4'>
                <span className='fs-2 text-secondary'>{driver.car_number}</span>
                <img
                  src={driver.nationality.flag_image}
                  alt={driver.nationality.country}
                  style={{ width: '60px', height: '40px', border: '1px solid #ccc', borderRadius: '5px' }}
                />
              </div>

              <div className='d-flex justify-content-start'>
                <h1>{driver.name.first} {driver.name.last}</h1>
              </div>
            </div>

          </div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-6">
                <p>Equipo:</p>
                <p>País:</p>
                <p>Podios:</p>
                <p>Puntos totales:</p>
                <p>Participaciones:</p>
              </div>
              <div className="col-6">
                <Link
                  to={`/teams/${driver.team_data._id}`}
                  className=" text-secondary"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <p
                    className="team-name"
                    style={{
                      color: hover ? driver.team_data.team_color : 'inherit',
                    }}
                  >
                    {driver.team_data.name}
                  </p>
                </Link>
                <p className='text-secondary'>{driver.nationality.country}</p>
                <p className='text-secondary'>{driver.stats.podiums}</p>
                <p className='text-secondary'>{driver.stats.total_points}</p>
                <p className='text-secondary'>{driver.stats.gp_entered}</p>
              </div>

              <div className="col-6">
                <p>Títulos Mundiales:</p>
                <p>Posición más alta (clasificación):</p>
                <p>Posición más alta (carrera):</p>
                <p>Fecha de Nacimiento:</p>
                <p>Lugar de Nacimiento:</p>
              </div>
              <div className="col-6">
                <p className='text-secondary'>{driver.stats.world_championships}</p>
                <p className='text-secondary'>{driver.stats.highest_grid_position}</p>
                <p className='text-secondary'>{driver.stats.highest_race_finish}</p>
                <p className='text-secondary'>{driver.birth.date}</p>
                <p className='text-secondary'>{driver.birth.place}</p>
              </div>
            </div>
          </div>

        </div>

        <hr />

        <div className='mt-3' style={{ textAlign: 'justify' }}>
          <h3>Biografía</h3>
          {driver.biography.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className='d-flex justify-content-between align-items-center flex-wrap gap-3 mt-4'>
          {Object.values(driver.images).map((img, index) => (
            <img key={index} src={img} alt={`foto del piloto ${index + 1}`} style={{ width: '350px', height: 'auto' }} />
          ))}
        </div>


      </div>
    </div>
  )
}

export default DriverDetail
