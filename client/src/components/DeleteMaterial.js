import { useState } from 'react';
import axios from 'axios';

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
      .then((res) => updateHandler(res.data.materials))
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
      <button onClick={toggleExpanded}>
        {expanded ? 'Collapse' : 'Delete Material'}
      </button>
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
          <button type="submit">Submit</button>
        </form>
      )}
    </>
  );
}
