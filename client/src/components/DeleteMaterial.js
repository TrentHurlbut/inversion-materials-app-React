import { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';

export default function DeleteMaterials({ updateHandler, materialArray }) {
  const [expanded, setExpanded] = useState(false);
  const [matName, setMatName] = useState('');

  const toggleExpanded = () => {
    expanded ? setExpanded(false) : setExpanded(true);
  };

  const matNameFieldHandler = (e) => {
    setMatName(e.target.value);
  };

  const deleteMat = (e) => {
    e.preventDefault();
    console.log(matName);
    axios('/delete_material', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      params: {
        name: matName
      }
    })
      .then((res) => {
        updateHandler(res.data.materials);
        setExpanded(false);
      })
      .catch((err) => console.log(err));
  };

  let materials = [];

  for (let i = 0; i < materialArray.length; i++) {
    materials.push(
      <option value={materialArray[i].name} key={i}>
        {materialArray[i].name}
      </option>
    );
  }

  return (
    <>
      <Button onClick={toggleExpanded} className='menu-button'>
        {expanded ? 'Collapse' : 'Delete Material'}
      </Button>
      {expanded && (
        <form id="delete-material-form" onSubmit={deleteMat}>
          <label for="materials">Choose a material to delete:</label>
          <select
            name="materials"
            id="materials"
            onChange={matNameFieldHandler}
          >
            {materials}
          </select>
          <Button type="submit">Submit</Button>
        </form>
      )}
    </>
  );
}
