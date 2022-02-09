import { useState } from 'react';
import xlsx from 'xlsx';

export default function FileUploadForm() {
  const [dataFile, setDataFile] = useState({});

  const onSubmit = (data) => {
    console.log(data);
  };

  const dataFileHandler = (e) => {
    e.preventDefault();
    setDataFile(e.target.files);
  };

  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        console.log(json);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={console.log(dataFile)}>
      <input type="file" name="picture" onChange={readUploadFile} />
      <button>Submit</button>
    </form>
  );
}
