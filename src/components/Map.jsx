import React from 'react';
import { Circles } from 'react-loader-spinner';
import DummyMapImg from '../assets/map.jpg';
import MainMap from './MainMap';
import './Map.css';

const Map = ({ data, targetData, loading }) => {
  return (
    <div className='mapContainer'>
      {data.length > 0 ? (
        <MainMap data={data} targetData={targetData} />
      ) : (
        <div>
          {loading ? (
            <Circles
              height='80'
              width='80'
              color='#4fa94d'
              ariaLabel='circles-loading'
              wrapperStyle={{}}
              wrapperClass=''
              visible={true}
            />
          ) : (
            <img src={DummyMapImg} alt='dummy map' />
          )}
        </div>
      )}
    </div>
  );
};

export default Map;
