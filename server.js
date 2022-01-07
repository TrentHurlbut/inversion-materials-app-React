const express = require('express'); //Line 1
const app = express(); //Line 2
const port = process.env.PORT || 3001; //Line 3
const materials = require('./materials.json');
const path = require('path');
const fs = require('fs');

let root = path.join(__dirname, 'client', 'build');

app.use(express.static(root));

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// create a GET route
app.get('/express_backend', (req, res) => {
  //Line 9
  res.send(materials); //Line 10
}); //Line 11

app.get('*', (req, res) => {
  res.sendFile(path.resolve('index.html', { root }));
});

app.post('/add_material', async (req, res) => {
  let data = fs.readFileSync('materials.json');
  let dataObj = JSON.parse(data);
  req.query.id = dataObj.materials[dataObj.materials.length - 1].id + 1;
  dataObj.materials.push(req.query);
  let stringData = JSON.stringify(dataObj);

  fs.writeFile('materials.json', stringData, 'utf-8', (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('File written successfully!');
    }
  });

  await res.send(dataObj);
});
