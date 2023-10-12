import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useEffect, useState } from 'react';
import Map, { GeolocateControl, Marker } from 'react-map-gl';
import 'react-tooltip/dist/react-tooltip.css';
import './MainMap.css';

const MainMap = ({ data, targetData, rad }) => {
  const [nearbyMarkers, setNearbyMarkers] = useState([]);
  const [tooltipContent, setTooltipContent] = useState(0);
  const [targetTooltipContent, setTargetTooltipContent] = useState(0);

  useEffect(() => {
    const calculateNearbyMarkers = () => {
      const nearbyMarkers = targetData.map((target) => {
        const nearbyPoints = data.filter((row) =>
          isWithinRadius(row, target, rad)
        );
        return {
          target,
          nearbyPoints,
          color: getRandomColor(),
        };
      });
      setNearbyMarkers(nearbyMarkers);
    };

    calculateNearbyMarkers();
  }, [data, targetData, rad]);

  const isWithinRadius = (point1, point2, radius) => {
    const distance = calculateDistance(
      point1.lat,
      point1.lng,
      point2.lat,
      point2.lng
    );
    return distance <= radius;
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 3958.8;
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
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const renderDataMarkers = () => {
    return data.map((row, index) => (
      <Marker
        key={index}
        latitude={row.lat}
        longitude={row.lng}
        offsetLeft={-20}
        offsetTop={-10}>
        <div
          data-tooltip-id='map-tooltip'
          data-tooltip-content={tooltipContent}
          onMouseEnter={() => {
            setTooltipContent(row.zip);
          }}>
          <div className='marker'>
            <span className='markerText'>{row.dre}</span>
          </div>
        </div>
      </Marker>
    ));
  };

  const renderTargetMarkers = () => {
    return nearbyMarkers.map((markerGroup, index) => (
      <React.Fragment key={`nearbyGroup_${index}`}>
        <Marker
          latitude={markerGroup.target.lat}
          longitude={markerGroup.target.lng}
          offsetLeft={-20}
          offsetTop={-10}>
          <div
            data-tooltip-id='map-tooltip'
            data-tooltip-content={targetTooltipContent}
            onMouseEnter={() => {
              setTargetTooltipContent(markerGroup.target.zip);
            }}
            style={{
              border: `4px solid ${markerGroup.color}`,
              borderRadius: '50%',
            }}>
            <div className='targetMarker'></div>
          </div>
        </Marker>
        {renderNearbyPoints(markerGroup)}
      </React.Fragment>
    ));
  };

  const renderNearbyPoints = (markerGroup) => {
    return markerGroup.nearbyPoints.map((row, innerIndex) => (
      <Marker
        key={`nearby_${innerIndex}`}
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
    ));
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
      {renderDataMarkers()}
      {renderTargetMarkers()}
    </Map>
  );
};

export default MainMap;
