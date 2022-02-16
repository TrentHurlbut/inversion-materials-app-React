import axios from 'axios';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

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
      .then((res) => {
        updateHandler(res.data.materials);
        setExpanded(false);
      })
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
      <Button onClick={toggleExpanded} className='menu-button'>
        {expanded ? 'Collapse' : 'Add Material'}
      </Button>
      {expanded ? (
        <form id="material-form" onSubmit={addMat}>
          <TextField
            id="mat-name"
            type="text"
            placeholder="Material Name"
            value={matName}
            onChange={(e) => {
              matNameFieldHandler(e);
            }}
            required
          />
          <label for="mat-price">Unit Cost</label>
          <TextField
            id="mat-price"
            type="text"
            placeholder="Material Cost"
            value={matPrice}
            onChange={(e) => {
              matPriceFieldHandler(e);
            }}
            required
          />
          <TextField
            id="qty_uom"
            type="text"
            placeholder="Quantity Unit of Measurement"
            value={matQtyUom}
            onChange={(e) => {
              matQtyUomFieldHandler(e);
            }}
          />
          <Button id="send-mat" type="submit">
            Submit Material
          </Button>
        </form>
      ) : null}
    </>
  );
}
