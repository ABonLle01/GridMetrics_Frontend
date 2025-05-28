const apiUrl = import.meta.env.VITE_BACKEND_URL;

export function getNextSession(sessions) {
    const now = new Date();

    return sessions
    .map(session => ({
        ...session,
        fullDate: new Date(`${session.date}T${session.start_time}`),
    }))
    .filter(session => session.fullDate > now)
    .sort((a, b) => a.fullDate - b.fullDate)[0];
}

export function getEventDays(sessions) {
    const days = sessions.map(s => parseInt(s.date.split('-')[2]));
    return [Math.min(...days), Math.max(...days)];
}

export function getMonthName(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { month: 'long' }).toUpperCase();
}

export async function getCircuitMap(circuitId){
    let map = "";
    try{
        const response = await fetch(`${apiUrl}api/circuits/${circuitId}`);

        if (!response.ok) throw new Error(`Error: ${response.statusText}`);

        const circuitData = await response.json();
        map = circuitData.map.track.white;
    }catch (error){
        console.error('Error al obtener el circuito con id: '+circuitId, error);
    }

    return map;
}

export async function getRaceCardData() {
    try {
      const response = await fetch(`${apiUrl}api/races/`);
      if (!response.ok) throw new Error("Error al obtener las carreras");
  
      const racesData = await response.json();
  
      const raceCards = await Promise.all(
        racesData.map(async (race) => {
          try {
            const circuitRes = await fetch(`${apiUrl}api/circuits/${race.circuit}`);
            if (!circuitRes.ok) throw new Error("Error al obtener el circuito");
  
            const circuitData = await circuitRes.json();
  
            return {
              id: race._id,
              round: race.round,
              circuit: race.circuit,
              countryFlag: circuitData.country.flag,
              countryName: circuitData.country.name,
              gpName: circuitData.official_name,
              //gpDate: race.date,
              gpDate: new Date(race.date).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              }),
              
            };
          } catch (error) {
            console.error(`Error al obtener circuito de ${race.circuit}:`, error);
            return null;
          }
        })
      );
  
      return raceCards
        .filter((card) => card !== null)
        .sort((a, b) => a.round - b.round);
    } catch (error) {
      console.error("Error al obtener datos de carreras:", error);
      return [];
    }
}
  