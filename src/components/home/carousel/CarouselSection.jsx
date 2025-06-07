import './CarouselSection.css';
import { useEffect, useState } from "react";
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
    slidesToShow: 4,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 6750,
    adaptiveHeight: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 668,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  if (loading) {
    return (
      <div className="container my-5">
        <h1 className="text-center fw-bold">Calendario F1 2025</h1>
        <div className="d-flex justify-content-center align-items-center" style={{ height: "450px" }} >
          <div className="spinner-border text-danger" role="status"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h1 className="text-center fw-bold mb-4">Calendario F1 2025</h1>
      <Slider {...settings}>
        {races.map((gp) => (
          <div key={gp.circuit} className="px-2">
            <div className="card d-flex flex-column mx-2" style={{ height: "400px" }} >
              <img src={gp.countryFlag} alt={`Bandera de ${gp.countryName}`} className="card-img-top" style={{ objectFit: "cover", height: "auto" }} />
              <div className="card-body d-flex flex-column bg-light text-center">
                <h4 className="mb-2">{translateCountry(gp.countryName)}</h4>
                <h6 className="fs-6 mb-3">{gp.gpName}</h6>
                <div className="mb-3">{gp.gpDate}</div>
                <Link to={`/circuits/${gp.circuit}`} className="btn btn-primary mt-auto" > Ver Gran Premio </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselSection;
