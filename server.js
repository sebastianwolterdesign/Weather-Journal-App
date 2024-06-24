projectData = {};

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use(express.static('website'));

const port = 8000;
const server = app.listen(port, () => {
    console.log(`running on localhost: ${port}`);
});

app.get('/all', (req, res) => {
    res.send(projectData);
});

app.post('/add', (req, res) => {
    projectData = {
        date: req.body.date,
        temp: req.body.temp,
        feel: req.body.feel,
    };
    res.send(projectData);
});