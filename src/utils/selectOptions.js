export const seasonsOptions = { '2025': '2025' };
export const dataOptions    = {
  races:   'Carreras',
  drivers: 'Pilotos',
  teams:   'Equipos'
};

export const raceOptions = {
  australia:        'Australia',
  china:            'China',
  japan:            'Japón',
  bahrain:          'Baréin',
  saudi_arabia:     'Arabia Saudí',
  miami:            'Miami',
  imola:            'Imola',
  monaco:           'Mónaco',
  spain:            'España',
  canada:           'Canadá',
  austria:          'Austria',
  great_britain:    'Gran Bretaña',
  belgium:          'Bélgica',
  hungary:          'Hungría',
  netherlands:      'Paises Bajos',
  monza:            'Monza',
  azerbaijan:       'Azerbayán',
  singapore:        'Singapur',
  cota:             'COTA',
  mexico:           'México',
  brazil:           'Brasil',
  las_vegas:        'Las Vegas',
  qatar:            'Catar',
  abu_dhabi:        'Abu Dhabi'
};

export const raceIds = {
  australia:        'gp_2025_Melbourne',
  china:            'gp_2025_Shanghai',
  japan:            'gp_2025_Suzuka',
  bahrain:          'gp_2025_Sakhir',
  saudi_arabia:     'gp_2025_Jeddah',
  miami:            'gp_2025_Miami',
  imola:            'gp_2025_Imola',
  monaco:           'gp_2025_Monaco',
  spain:            'gp_2025_Barcelona',
  canada:           'gp_2025_Montréal',
  austria:          'gp_2025_Spielberg',
  great_britain:    'gp_2025_Silverstone',
  belgium:          'gp_2025_Spa-Francorchamps',
  hungary:          'gp_2025_Budapest',
  netherlands:      'gp_2025_Zandvoort',
  monza:            'gp_2025_Monza',
  azerbaijan:       'gp_2025_Baku',
  singapore:        'gp_2025_Marina Bay',
  cota:             'gp_2025_Austin',
  mexico:           'gp_2025_Mexico City',
  brazil:           'gp_2025_São Paulo',
  las_vegas:        'gp_2025_Las Vegas',
  qatar:            'gp_2025_Lusail',
  abu_dhabi:        'gp_2025_Yas Island'
};

export function getGPId(option) { return raceIds[option] } 

export const driverOptions = {
  albon:            'Albon, Alexander',
  alonso:           'Alonso, Fernando',
  antonelli:        'Antonelli, Kimi',
  bearman:          'Bearman, Oliver',
  bortoleto:        'Bortoleto, Gabriel',
  colapinto:        'Colapinto, Franco',
  doohan:           'Doohan, Jack',
  gasly:            'Gasly, Pierre',
  hadjar:           'Hadjar, Isack',
  hamilton:         'Hamilton, Lewis',
  hulkenberg:       'Hulkenberg, Nico',
  lawson:           'Lawson, Liam',
  leclerc:          'Leclerc, Charles',
  norris:           'Norris, Lando',
  ocon:             'Ocon, Esteban',
  piastri:          'Piastri, Oscar',
  russell:          'Russell, George',
  sainz:            'Sainz, Carlos',
  stroll:           'Stroll, Lance',
  tsunoda:          'Tsunoda, Yuki',
  max_verstappen:   'Verstappen, Max'
};

export const teamOptions = {
  alpine:             'Alpine Renault',
  team_alpine:        'Alpine Renault',
  aston_martin:       'Aston Martin Aramco Mercedes',
  team_aston_martin:  'Aston Martin Aramco Mercedes',
  ferrari:            'Ferrari',
  team_ferrari:       'Ferrari',
  haas:               'Haas Ferrari',
  team_haas:          'Haas Ferrari',
  kick_sauber:        'Kick Sauber Ferrari',
  team_kick_sauber:   'Kick Sauber Ferrari',
  mclaren:            'McLaren Mercedes',
  team_mclaren:       'McLaren Mercedes',
  mercedes:           'Mercedes',
  team_mercedes:      'Mercedes',
  racing_bulls:       'Racing Bulls Honda RBPT',
  team_racing_bulls:  'Racing Bulls Honda RBPT',
  red_bull:           'Red Bull Racing Honda RBPT',
  redbull:            'Red Bull Racing Honda RBPT',
  team_redbull:       'Red Bull Racing Honda RBPT',
  williams:           'Williams Mercedes',
  team_williams:      'Williams Mercedes'
};

const allOptions = {
  ...raceOptions,
  ...driverOptions,
  ...teamOptions
};

export function getOption(option) { return allOptions[option] || null; }

const driverTeams = {
  albon:            'Williams Mercedes',
  alonso:           'Aston Martin Aramco Mercedes',
  antonelli:        'Mercedes',
  bearman:          'Haas Ferrari',
  bortoleto:        'Kick Sauber Ferrari',
  colapinto:        'Alpine Renault',
  doohan:           'Alpine Renault',
  gasly:            'Alpine Renault',
  hadjar:           'Racing Bulls Honda RBPT',
  hamilton:         'Ferrari',
  hülkenberg:       'Kick Sauber Ferrari',
  hulkenberg:       'Kick Sauber Ferrari',
  lawson:           'Racing Bulls Honda RBPT',
  leclerc:          'Ferrari',
  norris:           'McLaren Mercedes',
  ocon:             'Haas Ferrari',
  piastri:          'McLaren Mercedes',
  russell:          'Mercedes',
  sainz:            'Williams Mercedes',
  stroll:           'Aston Martin Aramco Mercedes',
  tsunoda:          'Red Bull Racing Honda RBPT',
  max_verstappen:   'Red Bull Racing Honda RBPT'
}

export function getTeamByDriver(driver){ return driverTeams[driver] || null }

const driverNumber = {
  albon:            {number: "23",  color: "#64C4FF"},
  alonso:           {number: "14",  color: "#229971"},
  antonelli:        {number: "12",  color: "#27F4D2"},
  bearman:          {number: "87",  color: "#B6BABD"},
  bortoleto:        {number: "5",   color: "#52E252"},
  colapinto:        {number: "43",  color: "#0093CC"},
  doohan:           {number: "7",   color: "#0093CC"},
  gasly:            {number: "10",  color: "#0093CC"},
  hadjar:           {number: "6",   color: "#6692FF"},
  hamilton:         {number: "44",  color: "#E80020"},
  hulkenberg:       {number: "27",  color: "#52E252"},
  lawson:           {number: "30",  color: "#6692FF"},
  leclerc:          {number: "16",  color: "#E80020"},
  norris:           {number: "4",   color: "#FF8000"},
  ocon:             {number: "31",  color: "#B6BABD"},
  piastri:          {number: "81",  color: "#FF8000"},
  russell:          {number: "63",  color: "#27F4D2"},
  sainz:            {number: "55",  color: "#64C4FF"},
  stroll:           {number: "18",  color: "#229971"},
  tsunoda:          {number: "22",  color: "#3671C6"},
  max_verstappen:   {number: "1",   color: "#3671C6"}
}

export function getDriverIdByDriver(driver){ return driverNumber[driver] || null }

const driverId = {
  albon:            'driver_albon',
  alonso:           'driver_alonso',
  antonelli:        'driver_antonelli',
  bearman:          'driver_bearman',
  bortoleto:        'driver_bortoleto',
  colapinto:        'driver_colapinto',
  doohan:           'driver_doohan',
  gasly:            'driver_gasly',
  hadjar:           'driver_hadjar',
  hamilton:         'driver_hamilton',
  hulkenberg:       'driver_hulkenberg',
  lawson:           'driver_lawson',
  leclerc:          'driver_leclerc',
  norris:           'driver_norris',
  ocon:             'driver_ocon',
  piastri:          'driver_piastri',
  russell:          'driver_russell',
  sainz:            'driver_sainz',
  stroll:           'driver_stroll',
  tsunoda:          'driver_tsunoda',
  max_verstappen:   'driver_max_verstappen'
};

export function getDriveIdByOption(option){ return driverId[option] || null }

const teamId = {
  alpine:       'team_alpine',
  aston_martin: 'team_aston_martin',
  ferrari:      'team_ferrari',
  haas:         'team_haas',
  kick_sauber:  'team_kick_sauber',
  mclaren:      'team_mclaren',
  mercedes:     'team_mercedes',
  racing_bulls: 'team_racing_bulls',
  red_bull:     'team_redbull',
  redbull:      'team_redbull',
  williams:     'team_williams',
};

export function getTeamIdByOption(option){ return teamId[option] || null }

const states = {
  "Retired": "Retirado",
  "Finished": "Completado",
  "Lapped": "Doblado",
  "Disqualified": "Descalificado"
}

export function translateState(state){ return states[state] || null }

const teamColor = {
  alpine:       '#0093CC',
  aston_martin: '#229971',
  ferrari:      '#E80020',
  haas:         '#B6BABD',
  kick_sauber:  '#52E252',
  mclaren:      '#FF8000',
  mercedes:     '#27F4D2',
  racing_bulls: '#6692FF',
  red_bull:     '#3671C6',
  redbull:      '#3671C6',
  williams:     '#64C4FF',
}

export function getTeamColorByTeamOption(option){ return teamColor[option] || null }