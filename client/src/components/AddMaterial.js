import axios from 'axios';
import { useState } from 'react';

export default function AddMaterial({ updateHandler }) {
  const [expanded, setExpanded] = useState(false);
  const [matName, setMatName] = useState('');
  const [matPrice, setMatPrice] = useState(0);
  const [matQtyUom, setMatQtyUom] = useState('');

  const toggleExpanded = () => {
    expanded ? setExpanded(false) : setExpanded(true);
  };

  const addMat = (e) => {
    e.preventDefault();
    console.log(matName);
    console.log(matPrice);
    console.log(matQtyUom);
    axios('/add_material', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      params: {
        name: matName,
        unit_cost: matPrice,
        qty_uom: matQtyUom
      }
    })
      .then((res) => updateHandler(res.data.materials))
      .catch((err) => console.log(err));
  };

  const matNameFieldHandler = (e) => {
    setMatName(e.target.value);
  };

  const matPriceFieldHandler = (e) => {
    setMatPrice(e.target.value);
  };

  const matQtyUomFieldHandler = (e) => {
    setMatQtyUom(e.target.value);
  };

  return (
    <>
      <button onClick={toggleExpanded}>
        {expanded ? 'Collapse' : 'Add Material'}
      </button>
      {expanded ? (
        <form id="material-form" onSubmit={addMat}>
          <input
            id="mat-name"
            type="text"
            placeholder="Material Name"
            value={matName}
            onChange={(e) => {
              matNameFieldHandler(e);
            }}
            required
          />
          <input
            id="mat-price"
            type="text"
            placeholder="Material Cost"
            value={matPrice}
            onChange={(e) => {
              matPriceFieldHandler(e);
            }}
            required
          />
          <input
            id="qty_uom"
            type="text"
            placeholder="Quantity Unit of Measurement"
            value={matQtyUom}
            onChange={(e) => {
              matQtyUomFieldHandler(e);
            }}
          />
          <button id="send-mat" type="submit">
            Submit Material
          </button>
        </form>
      ) : null}
    </>
  );
}
