import { useState } from 'react';
import Button from '@mui/material/Button';

export default function ShowMaterials({ materialArray }) {
  const [expanded, setExpanded] = useState(false);

  let materials = [];

  for (let i = 0; i < materialArray.length; i++) {
    materials.push(
      <p key={i}>
        {materialArray[i].name}, Unit Cost: {materialArray[i].unit_cost}
      </p>
    );
  }

  const toggleExpanded = () => {
    expanded ? setExpanded(false) : setExpanded(true);
  };

  return (
    <>
      <Button onClick={toggleExpanded} className='menu-button'>
        {expanded ? 'Hide Materials' : 'Show Materials'}
      </Button>
      {expanded ? materials : null}
    </>
  );
}
