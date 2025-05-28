import { useEffect, useState } from 'react';
import Select from './details/Select';
import { dataOptions, driverOptions, raceOptions, seasonsOptions, teamOptions } from '../../utils/selectOptions';
import Table from './details/Table';

function getUniqueTeamOptions(teamOptions) {
  const seenLabels = new Set();
  const uniqueOptions = {};

  for (const [key, label] of Object.entries(teamOptions)) {
    if (!seenLabels.has(label)) {
      uniqueOptions[key] = label;
      seenLabels.add(label);
    }
  }

  return uniqueOptions;
}


export default function Results() {
  const [season, setSeason]       = useState('2025');
  const [dataType, setDataType]   = useState('races');
  const [selection, setSelection] = useState('all');

  useEffect(() => { setSelection('all'); }, [dataType]);

  let thirdOptions = { all: 'Todas' };
  
  switch (dataType) {
    case 'races':   thirdOptions = { all: 'Todas', ...raceOptions };                        break;
    case 'drivers': thirdOptions = { all: 'Todos', ...driverOptions };                      break;
    case 'teams':   thirdOptions = { all: 'Todos', ...getUniqueTeamOptions(teamOptions) };  break;
  }

  return (
    <div className="container p-4">
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <Select label="Temporada" name="season" options={seasonsOptions} value={season} onChange={e => setSeason(e.target.value)} />
        </div>
        <div className="col-12 col-md-4">
          <Select label="Dato a mostrar" name="dataType" options={dataOptions} value={dataType} onChange={e => setDataType(e.target.value)} />
        </div>
        <div className="col-12 col-md-4">
          <Select label={ dataType === 'races' ? 'Carrera' : dataType === 'drivers' ? 'Piloto' : 'Equipo' } name="selection" options={thirdOptions} value={selection} onChange={e => setSelection(e.target.value)} />
        </div>
      </div>

      <Table season={season} dataType={dataType} selection={selection} />
    </div>

  );
}
