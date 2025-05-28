const apiUrl = import.meta.env.VITE_BACKEND_URL;

export async function getDriverNameById(id){
    try{
        const url = `${apiUrl}api/drivers/id/driver_${id}`;
        const response = await fetch(url);   
        if (!response.ok) throw new Error("Error al obtener el piloto");
  
        const driver = await response.json();
        const name = `${driver.name.first} ${driver.name.last}`;
        return name;
    }catch(error){
        console.log("Error obteniendo pilotos: ", error);
        throw new Error("Error obteniendo la información de los pilotos")
    }
}