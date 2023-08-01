import React, { useState } from 'react';
import readXlsxFile from 'read-excel-file';
import './Sidebar.css';

const Sidebar = ({
  mapData,
  setMapData,
  setLoading,
  targetMapData,
  setTargetMapData,
  rad,
  setRad,
}) => {
  const [data, setData] = useState([]);
  const [targetData, setTargetData] = useState([]);
  const [latAndLng, setLatAndLng] = useState([]);
  const [targetLatAndLng, setTargetLatAndLng] = useState([]);
  const [working, setWorking] = useState(false);

  const handleFileUpload = (e) => {
    setWorking(true);
    const file = e.target.files[0];
    readXlsxFile(file).then((rows) => {
      rows.shift();

      const newData = rows.map((row) => {
        return {
          zip: row[0],
          dre: row[1],
        };
      });

      const targetNewData = rows.map((row) => {
        return {
          zip: row[2],
        };
      });

      const filteredData = newData.filter((row) => {
        return row.zip !== null && row.dre !== null;
      });

      const targetFilteredData = targetNewData.filter((row) => {
        return row.zip !== null && row.zip !== undefined;
      });

      setData(filteredData);

      setTargetData(targetFilteredData);

      setWorking(false);
    });
  };

  const getLatAndLng = async () => {
    setLoading(true);
    const promises = data.map(async (row) => {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${row.zip}&key=AIzaSyCOGSsKzlKCe3BNTwbL2bjO1SYV4eU8H64`
      );

      const data = await response.json();

      return {
        zip: row.zip,
        dre: row.dre,
        lat: data.results[0]?.geometry.location.lat,
        lng: data.results[0]?.geometry.location.lng,
      };
    });

    const newData = await Promise.all(promises);

    // Filter out data that doesn't have lat and lng values (i.e. zip codes that don't exist)

    const filteredData = newData.filter((row) => {
      return row.lat !== undefined && row.lng !== undefined;
    });

    setLatAndLng(filteredData);

    setMapData(filteredData);

    const targetPromises = targetData.map(async (row) => {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${row.zip}&key=AIzaSyCOGSsKzlKCe3BNTwbL2bjO1SYV4eU8H64`
      );

      const data = await response.json();

      return {
        zip: row.zip,
        lat: data.results[0]?.geometry.location.lat,
        lng: data.results[0]?.geometry.location.lng,
      };
    });

    const newTargetData = await Promise.all(targetPromises);

    const filteredTargetData = newTargetData.filter((row) => {
      return row.lat !== undefined && row.lng !== undefined;
    });

    setTargetLatAndLng(filteredTargetData);

    setTargetMapData(filteredTargetData);

    setLoading(false);
  };

  return (
    <div className='sidebarContainer'>
      <div className='sidebarHeader'>
        <h1>Custom Map Generator</h1>
        <hr />
        <div className='inputWrapper'>
          <label htmlFor='input'>Upload Excel file</label>
          <input
            onChange={handleFileUpload}
            type='file'
            name='input'
            id='input'
          />
          <br />
          <br />
          <label htmlFor='inputNum'>Input radius (Miles)</label>
          <input
            value={rad}
            onChange={(e) => setRad(e.target.value)}
            type='number'
            name='inputNum'
            id='inputNum'
          />
        </div>
        <button onClick={getLatAndLng} disabled={working}>
          Generate Map
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
