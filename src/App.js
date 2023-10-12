import React, { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import './App.css';
import Map from './components/Map';
import Sidebar from './components/Sidebar';

const App = () => {
  const [data, setData] = useState([]);
  const [targetData, setTargetData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rad, setRad] = useState(10);
  return (
    <div className='mainContainer'>
      <Sidebar
        mapData={data}
        setMapData={setData}
        targetMapData={targetData}
        setTargetMapData={setTargetData}
        setLoading={setLoading}
        setRad={setRad}
        rad={rad}
      />
      <Map data={data} targetData={targetData} loading={loading} rad={rad} />
      <Tooltip id='map-tooltip' />
    </div>
  );
};

export default App;
