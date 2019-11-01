const express = require('express');
const app = express();
const mongoose = require('mongoose');
const url = "mongodb://127.0.0.1:27017/crud-app-db";
const bodyParser = require('body-parser');

const ResultMessage = require('./message.js');
const People = require('./people.js');
const Person = require('./person.js');

app.use(bodyParser.json());

mongoose.connect(url);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
 
db.once('open', function() {
  console.log("Connection Successful!");
});

var PersonSchema = mongoose.Schema({
    name: String,
    age: String,
    phoneNumber: String
});

var person = mongoose.model('Person', PersonSchema, 'people');

app.post('/people', function(req, res) {
    person.findOne({phoneNumber: req.body.phoneNumber}, function(err, thisPerson) {
        if(err) {
            return res.status(500).send(new ResultMessage('An error has occurred'));
        }

        if(thisPerson === null) {
            thisPerson = new person({name: req.body.name, age: req.body.age, phoneNumber: req.body.phoneNumber});

            thisPerson.save(function(err, person) {
                if(err) {
                    return res.status(500).send(new ResultMessage('Error trying to add person'));
                }
                return res.status(200).send(new ResultMessage('Person saved to collection'));
            });
        }
        else {
            return res.status(400).send(new ResultMessage('Phone number already exists'));
        }
    });
});

app.get('/people', function(req, res) {
    person.find({}, '-_id -__v', function(err, person) {
        if(err) {
            return res.status(500).send(err);
        }

        let people = new People(person);

        return res.status(200).send(people);
    });
});

app.get('/people/:phoneNumber', function(req, res) {
    person.findOne({phoneNumber : req.params.phoneNumber}, '-_id -__v', function(err, person) {
        if(err) {
            return res.status(500).send(new ResultMessage(err));
        }

        if(person === null) {
            return res.status(404).send(new ResultMessage('User not found'));
        }

        let newPerson = new Person(person);

        return res.status(200).send(newPerson);
    });
});

app.delete('/people', function(req, res) {
    person.deleteMany({}, function(err, person) {
        if(err) {
            return res.status(500).send(new ResultMessage(err));
        }
        return res.status(200).send(new ResultMessage("All people have been removed"));
    });
});

app.delete('/people/:phoneNumber', function(req, res) {
    person.findOne({phoneNumber: req.params.phoneNumber}, function(err, person) {
        if(err) {
            return res.status(500).send(new ResultMessage('An error has occurred'));
        }
        
        if(person !== null) {
            person.deleteOne({phoneNumber: req.params.phoneNumber}, function(err, person) {
                if(err) {
                    return res.status(500).send(new ResultMessage(err));
                }
                return res.status(200).send(new ResultMessage('Person removed'));
            });
        }
        else {
            return res.status(404).send(new ResultMessage('Person not found'));
        }
    });
});

app.put('/people/:phoneNumber', function(req, res) {
    person.findOne({phoneNumber: req.params.phoneNumber}, function(err, person) {
        if(err) {
            return res.status(500).send(new ResultMessage('An error has occurred'));
        }
       
        if(person !== null) {
            person.name = req.body.name;
            person.age = req.body.age;
            person.phoneNumber = req.body.phoneNumber;
                
            person.save(function(err, person) {
                if(err) {
                    return res.status(400).send(new ResultMessage('Error updating person'));
                }
                return res.status(200).send(new ResultMessage('Person updated'));
            });
        }
        else {
           return res.status(404).send(new ResultMessage('User not found'));
        }
    });
});

const server = app.listen(process.env.PORT || 5000, function () {
    console.log('Listening on port %d', server.address().port);
});

