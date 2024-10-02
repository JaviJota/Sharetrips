import React, { useEffect, useState } from "react";
import "../../styles/jumbotron.css";


export const Jumbotron = () => {

  const [data, setData] = useState([
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1468183654773-77e2f0bb6bf9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1495562569060-2eec283d3391?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1437652633673-cc02b9c67a1b?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
  ])
  useEffect(() => {
   
    const carouselElement = document.getElementById('carouselExampleSlidesOnly');
    
    const carousel = new bootstrap.Carousel(carouselElement, {
      interval: 5000,
      pause: 'false',
    });

   
    return () => {
      carousel.dispose();
    };
  }, []);

  return (
    <div className="mb-4 jumbotron">
      <div>
        <div id="carouselExampleSlidesOnly" className="container-fluid  jumbo-slider slide p-0" data-bs-ride="carousel">
          <div className="carousel-inner ">
            {data.map((el, i) => <div key={el.id} className={`carousel-item jumbo-slider ${i === 0 ? 'active' : ''}`} >
              <img src={el.url} className="d-block w-100 jumbo-slider" alt="..." />
            </div>)}
          </div>
        </div>
        <h1 className="fw-bold ps-0">
          Tu próxima aventura
          <br />
          <span>comienza con las mejores rutas</span>
        </h1>
      </div>
    </div>
  );
};