import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useState } from 'react';
import Map, { GeolocateControl, Marker } from 'react-map-gl';
import './MainMap.css';

const MainMap = ({ data, targetData }) => {
  const [radiusCenter, setRadiusCenter] = useState({
    latitude: 0,
    longitude: 0,
  });
  const radius = 100;
  return (
    <Map
      style={{ width: '100%', height: '90%' }}
      mapboxAccessToken='pk.eyJ1IjoibWlydGF1aGlkIiwiYSI6ImNsa3JhY2kycTJpZnkzcXA0c3hhN3drYjgifQ._WEdlgoVnMegvN5c84Xqtg'
      initialViewState={{
        longitude: -100,
        latitude: 40,
        zoom: 3.5,
      }}
      mapStyle='mapbox://styles/mapbox/streets-v11'>
      <GeolocateControl
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
      />
      {data.map((row, index) => {
        console.log(row);
        return (
          // Include row.dre in the marker to show the DRE number on the map for each zip code location (i.e. marker)
          <Marker
            key={index}
            latitude={row.lat}
            longitude={row.lng}
            offsetLeft={-20}
            offsetTop={-10}>
            <div className='marker'>
              <span className='markerText'>{row.dre}</span>
            </div>
          </Marker>
        );
      })}
      {targetData.map((row, index) => {
        return (
          <Marker
            key={index}
            latitude={row.lat}
            longitude={row.lng}
            offsetLeft={-20}
            offsetTop={-10}>
            <div className='targetMarker'>
              <span className='targetMarkerText'></span>
            </div>
            <div
              style={{
                position: 'absolute',
                width: 2 * radius,
                height: 2 * radius,
                borderRadius: '50%',
                border: '2px solid #0074D9',
                pointerEvents: 'none',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'rgba(0, 116, 217, 0.2)',
              }}
            />
          </Marker>
        );
      })}
    </Map>
  );
};

export default MainMap;
