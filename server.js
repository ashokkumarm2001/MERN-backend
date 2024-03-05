const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors')
const PORT = 3500
require('./models/db');
const Students = require('./models/students');

app.use(require('helmet')())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({origin:'https://minimalisticmerncrud.netlify.app/', credentials:true}));

app.get('/', async (req, res) => {
    try {
      const students = await Students.find({});
      res.send({ students })
      res.send("Hello world")
    } catch(err) {
      res.status(400).send({ error: err });
    }
  });

app.post('/post', async (req, res) => {
    try {
        const newStudent = await Students.create({ name: req.body.name, email: req.body.email, enrollnumber: req.body.enrollnumber });
        // console.log(req.body.name, req.body.email, req.body.enrollnumber);
        res.send({ newStudent });
    } catch (err) {
        res.status(400).send({ error: err });
    }
});

app.get('/:id', async (req, res) => {
    try {
      const student = await Students.findById(req.params.id);
      res.send({ student });
    } catch (err) {
      res.status(404).send({ message: 'Student not found!' });
    }
  });

app.put('/put/:id', async (req, res) => {
    try {
      const updatedStudent = await Students.findByIdAndUpdate(req.params.id, req.body);
       res.send({ message: 'The student was updated' });
    } catch(err) {
      res.status(400).send({ error: err });
    }
  });

app.delete('/delete/:id', async (req, res) => {
    try {
      const removeStudent = await Students.findByIdAndRemove(req.params.id);
       res.send({ message: 'The student was removed' });
    } catch(err) {
      res.status(400).send({ error: err });
    }
  });


app.listen(PORT, () => console.log(`App running on port ${PORT}`)  );
