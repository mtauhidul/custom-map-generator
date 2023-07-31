import React, { useState } from 'react';
import './App.css';
import Map from './components/Map';
import Sidebar from './components/Sidebar';

const App = () => {
  const [data, setData] = useState([]);
  return (
    <div className='mainContainer'>
      <Sidebar mapData={data} setMapData={setData} />
      <Map data={data} />
    </div>
  );
};

export default App;
