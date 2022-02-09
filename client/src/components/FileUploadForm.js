import { useState } from 'react';

export default function FileUploadForm() {
  const [dataFile, setDataFile] = useState({});

  const onSubmit = (data) => {
    console.log(data);
  };

  const dataFileHandler = (e) => {
    e.preventDefault();
    setDataFile(e.target.files);
  };

  return (
    <form onSubmit={console.log(dataFile)}>
      <input type="file" name="picture" onChange={dataFileHandler} />
      <button>Submit</button>
    </form>
  );
}
