import { useState, useEffect } from 'react'

import Next from './next_gp/Next'
import Intro from './intro/Intro'
import CarouselSection from './carousel/CarouselSection'
import Standings from './standings/Standings'

const apiUrl = import.meta.env.VITE_BACKEND_URL;

function home() {
    const [gps, setGps] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      const fetchRaces = async () => {
        try {
          const res = await fetch(`${apiUrl}api/races/upcoming`);
          const data = await res.json();
          setGps(data);
        } catch (error) {
          console.error('Error al obtener las carreras:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchRaces();
    }, []);
  
    if (loading) return <p>Cargando carreras...</p>;

    return (
        <>
        <Next gps={gps} />
        <Intro></Intro>
        <CarouselSection></CarouselSection>
        <Standings></Standings>
        </>
    )
}

export default home