import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useEffect, useState } from 'react';
import Map, { GeolocateControl, Marker } from 'react-map-gl';
import './MainMap.css';

const MainMap = ({ data, targetData, rad }) => {
  const [radiusCenter, setRadiusCenter] = useState({
    latitude: 0,
    longitude: 0,
  });
  const radius = rad;

  const [nearbyMarkers, setNearbyMarkers] = useState([]);

  useEffect(() => {
    // Filter data to find lat-longs within 10 miles of target lat-longs
    const nearbyMarkers = targetData.map((target) => {
      const nearbyPoints = data.filter((row) => {
        const distance = calculateDistance(
          row.lat,
          row.lng,
          target.lat,
          target.lng
        );
        return distance <= rad;
      });
      return {
        target,
        nearbyPoints,
        color: getRandomColor(),
      };
    });
    setNearbyMarkers(nearbyMarkers);
  }, [data, targetData]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    // This function calculates the distance between two lat-long points in miles
    const R = 3958.8; // Earth's radius in miles
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };

  const getRandomColor = () => {
    // Generate a random color
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <Map
      style={{ width: '100%', height: '90%' }}
      mapboxAccessToken='pk.eyJ1IjoibWlydGF1aGlkIiwiYSI6ImNsa3JhY2kycTJpZnkzcXA0c3hhN3drYjgifQ._WEdlgoVnMegvN5c84Xqtg'
      initialViewState={{
        longitude: -99.69325,
        latitude: 32.61335,
        zoom: 5,
      }}
      mapStyle='mapbox://styles/mapbox/streets-v11'>
      <GeolocateControl
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
      />
      {data.map((row, index) => (
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
      ))}
      {nearbyMarkers.map((markerGroup, index) => (
        <React.Fragment key={`nearbyGroup_${index}`}>
          <Marker
            latitude={markerGroup.target.lat}
            longitude={markerGroup.target.lng}
            offsetLeft={-20}
            offsetTop={-10}>
            <div
              className='targetMarker'
              style={{ border: `3px solid ${markerGroup.color}` }}></div>
          </Marker>
          {markerGroup.nearbyPoints.map((row, innerIndex) => (
            <Marker
              key={`nearby_${index}_${innerIndex}`}
              latitude={row.lat}
              longitude={row.lng}
              offsetLeft={-20}
              offsetTop={-10}>
              <div
                style={{
                  position: 'absolute',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  border: `2px solid ${markerGroup.color}`,
                  pointerEvents: 'none',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            </Marker>
          ))}
        </React.Fragment>
      ))}
    </Map>
  );
};

export default MainMap;
