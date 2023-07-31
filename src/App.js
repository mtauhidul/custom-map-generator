import React, { useState } from 'react';
import './App.css';
import Map from './components/Map';
import Sidebar from './components/Sidebar';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  return (
    <div className='mainContainer'>
      <Sidebar mapData={data} setMapData={setData} setLoading={setLoading} />
      <Map data={data} loading={loading} />
    </div>
  );
};

export default App;
