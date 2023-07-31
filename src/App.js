import React, { useState } from 'react';
import './App.css';
import Map from './components/Map';
import Sidebar from './components/Sidebar';

const App = () => {
  const [data, setData] = useState([]);
  const [targetData, setTargetData] = useState([]);
  const [loading, setLoading] = useState(false);
  return (
    <div className='mainContainer'>
      <Sidebar
        mapData={data}
        setMapData={setData}
        targetMapData={targetData}
        setTargetMapData={setTargetData}
        setLoading={setLoading}
      />
      <Map data={data} targetData={targetData} loading={loading} />
    </div>
  );
};

export default App;
