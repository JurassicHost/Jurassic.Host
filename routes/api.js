var express = require('express');
var router = express.Router();

var Person = require('../models/person.js');

router.route('/products')

    .post(function(req, res) {

        var person = new Person();

        person.first_name = req.body.first_name;
        person.last_name = req.body.last_name;
        person.email = req.body.email;
        person.password = req.body.password;

        Person.findOne({email: person.email}, function(err, document) {
            if(err)
                res.status(500).send(err);

            if(document != null){
              res.status(404).jsonp({ message: 'failure' });
            }
            else {
              // save the person and check for errors
              person.save(function(err) {
                  if (err)
                      res.status(500).send(err);

                  res.status(200).jsonp({ message: 'success' });
              });
            }
        });

    });

router.route('/products')

    .get(function(req, res) {

        Person.findOne({email: req.query.email, password: req.query.password}, function(err, document) {
            if(err){
                res.status(500).send(err);
            }
            else if(document == null){
                res.status(404).send(null);
            }
            else{
                res.status(200).send(document);
            }
        });


    });

module.exports = router;
