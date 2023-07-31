import 'mapbox-gl/dist/mapbox-gl.css';
import React from 'react';
import Map, { GeolocateControl, Marker } from 'react-map-gl';
import './MainMap.css';

const MainMap = ({ data }) => {
  console.log(data);
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
    </Map>
  );
};

export default MainMap;
