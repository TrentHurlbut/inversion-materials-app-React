import { useState } from 'react';

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
      <button onClick={toggleExpanded}>
        {expanded ? 'Hide Materials' : 'Show Materials'}
      </button>
      {expanded ? materials : null}
    </>
  );
}
