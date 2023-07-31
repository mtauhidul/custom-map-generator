import React from 'react';
import DummyMapImg from '../assets/map.jpg';
import MainMap from './MainMap';
import './Map.css';

const Map = ({ data }) => {
  return (
    <div className='mapContainer'>
      {data.length === 0 ? (
        <img src={DummyMapImg} alt='dummy map' />
      ) : (
        <MainMap data={data} />
      )}
    </div>
  );
};

export default Map;
