const express = require('express'); //Line 1
const app = express(); //Line 2
const port = process.env.PORT || 3001; //Line 3
const materials = require('./materials.json');
const path = require('path');

let root = path.join(__dirname, '../client/build');

app.use(express.static(path.resolve(__dirname, '../client/build')));

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// create a GET route
app.get('/express_backend', (req, res) => {
  //Line 9
  res.send(materials); //Line 10
}); //Line 11

app.get('*', (req, res) => {
  res.sendFile('index.html', { root });
});
