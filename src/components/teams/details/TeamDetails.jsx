import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
const apiUrl = import.meta.env.VITE_BACKEND_URL;

function TeamDetails() {
    const { id } = useParams()
    const [team, setTeam] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const res = await fetch(`${apiUrl}api/teams/id/${id}`)
                if (!res.ok) throw new Error('Equipo no encontrado')
                const data = await res.json()
                setTeam(data)
            } catch (err) {
                console.error(err)
                setError('Error al cargar la información del equipo')
            } finally {
                setLoading(false)
            }
        }

        fetchTeams()
    }, [id])

    if (loading) return <p className="text-center">Cargando equipo...</p>
    if (error) return <p className="text-danger text-center">{error}</p>
    if (!team) return null

    return (
        <div className="container mt-5 fw-light">
            <div className="card shadow p-5">
                <div className="d-flex align-items-center mb-5 justify-content-between">
                    <img src={team.logo} alt={team.name} style={{ height: '80px' }} />
                    <h1 className="m-0">{team.fullname}</h1>
                </div>

                <div className="row mb-4">
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-5">
                                <p>Base:</p>
                                <p>Chasis:</p>
                                <p>Unidad de potencia:</p>
                                <p>Jefe de equipo:</p>
                                <p>Director técnico:</p>
                            </div>

                            <div className="col-7">
                                <p className="text-secondary">{team.base}</p>
                                <p className="text-secondary">{team.chassis}</p>
                                <p className="text-secondary">{team.power_unit}</p>
                                <p className="text-secondary">{team.chiefs.team}</p>
                                <p className="text-secondary">{team.chiefs.technical.join(', ')}</p>
                            </div>

                            <div className="col-5">
                                <p>Campeonatos:</p>
                                <p>Primera participación:</p>
                                <p>Mejor posición en carrera:</p>
                                <p>Poles:</p>
                                <p>Vueltas rápidas:</p>
                                <p>Puntos actuales:</p>
                            </div>

                            <div className="col-7">
                                <p className='text-secondary'>{team.stats.world_championships}</p>
                                <p className='text-secondary'>{new Date(team.stats.first_entry).toLocaleDateString()}</p>
                                <p className='text-secondary'>{team.stats.highest_race_finish}</p>
                                <p className='text-secondary'>{team.stats.pole_positions}</p>
                                <p className='text-secondary'>{team.stats.fastest_laps}</p>
                                <p className='text-secondary'>{team.points}</p>
                            </div>
                        </div>




                    </div>

                    <div className="col-md-6">
                        <div className="d-flex flex-direction-row flex-wrap justify-content-between">
                            {team.drivers.map((driver, index) => (
                                <div key={index} className="card" style={{ height:'auto', width: '250px', cursor: 'pointer' }}>
                                <Link to={`/drivers/${driver.id}`} className="text-decoration-none text-dark">
                                    <img
                                        src={driver.profileImage}
                                        alt={`${driver.firstName} ${driver.lastName}`}
                                        className="img-fluid"
                                        style={{ backgroundColor: team.team_color, width:'100%', height:'auto' }}
                                    />
                                    <div className="text-center mt-3">
                                        <strong>{driver.firstName} {driver.lastName}</strong>
                                        <p className="text-secondary" style={{ fontSize: '0.9em' }}>{driver.nationality}</p>
                                    </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


                <h3 className="mb-3">Imágenes del equipo</h3>
                <div className='d-flex align-content-stretch flex-wrap gap-5 justify-content-between'>
                    {team.team_images?.general?.map((img, index) => (
                        <img key={index} src={img} alt={`imagen ${index + 1}`} style={{ width: 'auto', height: '300px' }} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TeamDetails
