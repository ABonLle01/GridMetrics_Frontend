import React from 'react';
import { translateCountry } from '../../../../utils/translations';

function GPCircuit({ circuit }) {
  const firstGPYear = new Date(circuit.first_gp).getFullYear();

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">{circuit.official_name}</h2>

      <div className="d-flex flex-column gap-4 mb-5">
        <div className="d-flex align-items-center gap-3">
          <img src={circuit.country.flag} alt="country flag" width={80} className="rounded border border-dark" />
          <h3 className="mb-0">{circuit.name}</h3>
        </div>

        <div className="d-flex flex-column flex-md-row gap-5 align-items-start">
          <img 
            src={circuit.map.circuit} 
            alt="circuit image" 
            width={600} 
            className="img-fluid rounded shadow"
            style={{ objectFit: "cover" }}
          />

          <div className="d-flex flex-column gap-3 row w-100">
            <div className="row">
              <div className="d-flex flex-column mt-2 col">
                <label className="text-muted">Primer Gran Premio</label>
                <span>{firstGPYear}</span>
              </div>
              <div className="d-flex flex-column mt-2 col">
                <label className="text-muted">Número de Vueltas</label>
                <span>{circuit.number_of_laps}</span>
              </div>
            </div>

            <div className="row">
              <div className="d-flex flex-column mt-2 col">
                <label className="text-muted">Longitud del Circuito</label>
                <span>{circuit.length} km</span>
              </div>
              <div className="d-flex flex-column mt-2 col">
                <label className="text-muted">Distancia de Carrera</label>
                <span>{circuit.race_distance} km</span>
              </div>
            </div>

            <div className="row">
              <div className="d-flex flex-column mt-2 col">
                <label className="text-muted">Vuelta más rápida</label>
                <span>
                  {circuit.lap_record.time}
                  <small> ({circuit.lap_record.year})</small>
                </span>
              </div>
            </div>
          </div>
        </div>
        <a href="#" rel="noopener noreferrer">Estadísticas del circuito</a>

      </div>

      <section>
        <h2 className="text-center mb-4">{translateCountry(circuit.country.name)}</h2>

        <div className="row gy-4">
          <div className="col-12">
            <h4>¿Cuándo se construyó el circuito?</h4>
            <p className='text-secondary'>{circuit.questions[1]}</p>
          </div>
          <div className="col-12">
            <h4>¿Cuándo fue su primer Gran Premio?</h4>
            <p className='text-secondary'>{circuit.questions[2]}</p>
          </div>
          <div className="col-12">
            <h4>¿Cómo es el circuito?</h4>
            <p className='text-secondary'>{circuit.questions[3]}</p>
          </div>
          <div className="col-12">
            <h4>¿Por qué ir al circuito?</h4>
            <p className='text-secondary'>{circuit.questions[4]}</p>
          </div>
          <div className="col-12">
            <h4>¿Cuál es el mejor lugar para verlo?</h4>
            <p className='text-secondary'>{circuit.questions[5]}</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default GPCircuit;
