import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { getRaceCardData } from "../../../utils/utils";
import { translateCountry } from "../../../utils/translations";

const CarouselSection = () => {
  const [races, setRaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const cards = await getRaceCardData();
      setRaces(cards);
      setLoading(false);
    };
    fetchData();
  }, []);
  

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    adaptiveHeight: false,
    
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loading) {
    return <div className="text-center">Cargando...</div>;
  }
  
  return (
    <div className="container my-5">
      <h1 className="text-center fw-bold">Calendario F1 2025</h1>
      <div className="">
        <Slider {...settings}>
          {races.map((gp, index) => (
            <div key={index} className="slide-item">
              <div className="card d-flex flex-column mx-2" style={{ height: '450px' }}>
                <img src={gp.countryFlag} alt={`Bandera de ${gp.countryName}`} className="card-img-top" />
                <div className="card-body text-center bg-light d-flex flex-column justify-content-between">
                  <h4>{translateCountry(gp.countryName)}</h4>
                  <h6 className="text-center fs-6">{gp.gpName}</h6>
                  <div className="text-center">
                    <span>{gp.gpDate}</span>
                  </div>
                  <Link
                    to={`/circuits/${gp.circuit}`}
                    className="text-decoration-none"
                  >
                    <span className="btn btn-primary mt-2">Ver Gran Premio</span>
                  </Link>
                  
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CarouselSection;