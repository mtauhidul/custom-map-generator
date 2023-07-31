import React, { useEffect, useState } from 'react';
import readXlsxFile from 'read-excel-file';
import './Sidebar.css';

const Sidebar = ({ mapData, setMapData }) => {
  const [data, setData] = useState([]);
  const [latAndLng, setLatAndLng] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    readXlsxFile(file).then((rows) => {
      rows.shift();

      const newData = rows.map((row) => {
        return {
          zip: row[7],
          dre: row[8],
        };
      });

      const filteredData = newData.filter((row) => {
        return row.zip !== null && row.dre !== null;
      });

      setData(filteredData);
    });
  };

  useEffect(() => {
    const getLatAndLng = async () => {
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
    };

    getLatAndLng();
  }, [data]);

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
        </div>
        <button>Generate Map</button>
      </div>
    </div>
  );
};

export default Sidebar;
