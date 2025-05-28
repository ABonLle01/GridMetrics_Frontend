import React from 'react'

import { imageURLs } from '../../../data/images'

const image = imageURLs.intro;

function Intro() {
  return (

    <div className="container-fluid bg-light">
        <div className='container d-flex justify-content-center align-items-center p-3 gap-5'>
            <div>
                <h3 className='text-dark'>Nuevos Rookies y la Última Batalla Antes del Cambio de Reglamento</h3>
                <p className='text-justify text-dark'>
                    La temporada de Fórmula 1 de 2025 promete ser una de las más emocionantes de los últimos años. 
                    Con nuevos pilotos rookies que llegan con grandes expectativas y una energía fresca al campeonato, 
                    los aficionados podrán disfrutar de una competencia más reñida que nunca. <br/><br/> 
                    Además, este será el último año antes de una serie de cambios en el reglamento, lo que añade un toque especial y una incertidumbre 
                    sobre cómo se desarrollarán las carreras. Los equipos y pilotos están conscientes de la importancia de esta temporada, 
                    ya que todo lo que suceda en 2025 podría tener un impacto duradero en el futuro de la F1. <br/><br/> 
                    La lucha por el título, junto con la incorporación de talentos emergentes, hacen de este año una cita imprescindible para los amantes de la velocidad y 
                    la innovación en el automovilismo.
                </p>
            </div>
            <img src={image} alt="Placeholder Image" width={600} />
        </div>

    </div>

  )
}

export default Intro