import { useState } from 'react';
import axios from 'axios';

export default function EditMaterial({ updateHandler, materialArray }) {
  const [expanded, setExpanded] = useState(false);
  const [matName, setMatName] = useState('');
  const [newMatName, setNewMatName] = useState('');
  const [newMatPrice, setNewMatPrice] = useState('');
  const [newMatQtyUom, setNewMatQtyUom] = useState('');

  const toggleExpanded = () => {
    expanded ? setExpanded(false) : setExpanded(true);
  };

  const matNameFieldHandler = (e) => {
    setMatName(e.target.value);
  };

  const newMatNameFieldHandler = (e) => {
    setNewMatName(e.target.value);
  };

  const newMatPriceFieldHandler = (e) => {
    setNewMatPrice(e.target.value);
  };

  const newMatQtyUomFieldHandler = (e) => {
    setNewMatQtyUom(e.target.value);
  };

  const deleteMat = (e) => {
    e.preventDefault();
    console.log(matName);
    axios('/edit_material', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      params: {
        name: matName,
        new_name: newMatName,
        unit_cost: newMatPrice,
        qty_uom: newMatQtyUom
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
        {expanded ? 'Collapse' : 'Edit Material Entry'}
      </button>
      {expanded && (
        <form id="delete-material-form" onSubmit={deleteMat}>
          <label for="materials">Choose a material to edit:</label>
          <select
            name="materials"
            id="materials"
            onChange={matNameFieldHandler}
            required
          >
            {materials}
          </select>
          <lable for="mat-name">New Material Name</lable>
          <input
            id="mat-name"
            type="text"
            placeholder="Material Name"
            value={newMatName}
            onChange={(e) => {
              newMatNameFieldHandler(e);
            }}
            required
          />
          <lable for="mat-price">New Material Price</lable>
          <input
            id="mat-price"
            type="text"
            placeholder="Material Cost"
            value={newMatPrice}
            onChange={(e) => {
              newMatPriceFieldHandler(e);
            }}
            required
          />
          <lable for="qty-uom">New Quantity Unit-of-Measurement</lable>
          <input
            id="qty-uom"
            type="text"
            placeholder="Quantity Unit of Measurement"
            value={newMatQtyUom}
            onChange={(e) => {
              newMatQtyUomFieldHandler(e);
            }}
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </>
  );
}
