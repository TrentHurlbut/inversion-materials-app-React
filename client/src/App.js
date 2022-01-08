import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import ShowMaterials from './components/ShowMaterials';
import AddMaterial from './components/AddMaterial';
import DeleteMaterials from './components/DeleteMaterial';

function App() {
  const [data, setData] = useState([]);

  // const callBackendAPI = async () => {
  //   const response = await fetch('/express_backend');
  //   const body = await response.json();

  //   if (response.status !== 200) {
  //     throw Error(body.message);
  //   }
  //   return body;
  // };

  useEffect(() => {
    axios
      .get('/express_backend')
      .then((res) => {
        console.log(res.data.materials);
        setData(res.data.materials);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);
  // fetching the GET route from the Express server which matches the GET route from server.js

  const updateHandler = (info) => {
    setData(info);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Inversion Design Build Cost Estimator</h1>
      </header>
      <ShowMaterials materialArray={data} />
      <AddMaterial updateHandler={updateHandler} />
      <DeleteMaterials updateHandler={updateHandler} materialArray={data} />
    </div>
  );
}

export default App;
