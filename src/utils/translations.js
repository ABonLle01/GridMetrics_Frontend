const countryTranslations = {
    "Italy": "Italia",
    "Spain": "España",
    "France": "Francia",
    "United Kingdom": "Reino Unido",
    "Germany": "Alemania",
    "Belgium": "Bélgica",
    "Austria": "Austria",
    "Netherlands": "Países Bajos",
    "Monaco": "Mónaco",
    "Canada": "Canadá",
    "Australia": "Australia",
    "Japan": "Japón",
    "United States": "Estados Unidos",
    "Mexico": "México",
    "Brazil": "Brasil",
    "Saudi Arabia": "Arabia Saudita",
    "Qatar": "Catar",
    "Singapore": "Singapur",
    "Hungary": "Hungría",
    "Bahrain": "Baréin",
    "Azerbaijan": "Azerbaiyán",
    "United Arab Emirates": "Emiratos Árabes Unidos"
  };

export function translateCountry(country) {
    return countryTranslations[country] || country;
}

const sessionTranslations = {
  "Practice 1": "Entrenamientos 1",
  "Practice 2": "Entrenamientos 2",
  "Practice 3": "Entrenamientos 3",
  "Sprint Qualifying": "Clasificación Sprint",
  "Qualifying": "Clasificación",
  "Sprint": "Carrera Sprint",
  "Race": "Carrera"
}

export function translateSession(session) {
  return sessionTranslations[session] || session;
}