
const express = require('express');
const app = express();
const port = 4000;

// Middleware to parse JSON
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, Express!');
  });

app.get('/about', (req, res) => {
  res.send('About page');
});

app.post('/data', (req, res) => {
  console.log(req.body);
  res.send('Data received');
});  

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
