import { useState } from 'react';
import xlsx from 'xlsx';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function FileUploadForm() {
  const [dataFile, setDataFile] = useState([]);

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
        setDataFile(json);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(dataFile);
      }}
      id='sheet-submit'
    >
      <TextField type="file" name="picture" onChange={readUploadFile} />
      <Button type="submit" className='menu-button'>Submit</Button>
    </form>
  );
}
