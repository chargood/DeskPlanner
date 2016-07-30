// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('../DeskPlannerClient'));

var port = process.env.PORT || 8080;        // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/deskplanner'); // connect to our database

var CoreSchema = require('./models/coreschema');


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Request Made '+req.method);
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', function(req, res) {
    res.json({ message: 'This is the deskplanner api' });   
});

// more routes for our API will happen here

	router.route('/person')
	
	.post(function(req, res) {
        
		var person = new CoreSchema.Person(req.body)
        
        person.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Person created!' });
        });
        
    })
	
	.get(function(req, res) {
        CoreSchema.Person.find(function(err, persons) {
            if (err)
                res.send(err);

            res.json(persons);
        });
    });
	
	router.route('/person/:person_id')
	
	.get(function(req, res) {
        CoreSchema.Person.findById(req.params.person_id, function(err, person) {
            if (err)
                res.send(err);
            res.json(person);
        });
    })
	
	.put(function(req, res) {

        CoreSchema.Person.findById(req.params.person_id, function(err, person) {

            if (err)
                res.send(err);

            person = new CoreSchema.Person(req.body)

            person.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Person updated!' });
            });

        });
    })
	
	.delete(function(req, res) {
        Person.remove({
            _id: req.params.person_id
        }, function(err, person) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });
	
	///////
	
	router.route('/desk')
	
	.post(function(req, res) {
        
		var desk = new CoreSchema.Desk(req.body)
        
        desk.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Desk created!' });
        });
        
    })
	
	.get(function(req, res) {
        CoreSchema.Desk.find(function(err, desks) {
            if (err)
                res.send(err);

            res.json(desks);
        });
    });
	
	router.route('/desk/:desk_id')
	
	.get(function(req, res) {
        CoreSchema.Desk.findById(req.params.desk_id, function(err, desk) {
            if (err)
                res.send(err);
            res.json(desk);
        });
    })
	
	.put(function(req, res) {

        CoreSchema.Desk.findById(req.params.desk_id, function(err, desk) {

            if (err)
                res.send(err);

            desk = new CoreSchema.Desk(req.body)

            desk.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Desk updated!' });
            });

        });
    })
	
	.delete(function(req, res) {
        Desk.remove({
            _id: req.params.desk_id
        }, function(err, desk) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });
	
	///////
	
	router.route('/deskmap')
	
	.post(function(req, res) {
        
		var deskmap = new CoreSchema.DeskMap(req.body)
        
        deskmap.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'DeskMap created!' });
        });
        
    })
	
	.get(function(req, res) {
        CoreSchema.DeskMap.find(function(err, deskmaps) {
            if (err)
                res.send(err);

            res.json(deskmaps);
        });
    });
	
	router.route('/deskmap/:deskmap_id')
	
	.get(function(req, res) {
        CoreSchema.DeskMap.findById(req.params.deskmap_id, function(err, deskmap) {
            if (err)
                res.send(err);
            res.json(deskmap);
        });
    })
	
	.put(function(req, res) {

        CoreSchema.DeskMap.findById(req.params.deskmap_id, function(err, deskmap) {

            if (err)
                res.send(err);

            deskmap = new CoreSchema.DeskMap(req.body)

            deskmap.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'DeskMap updated!' });
            });

        });
    })
	
	.delete(function(req, res) {
        DeskMap.remove({
            _id: req.params.deskmap_id
        }, function(err, deskmap) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });
	
	///////
	
	router.route('/booking')
	
	.post(function(req, res) {
        
		var booking = new CoreSchema.Booking(req.body)
        
        booking.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Booking created!' });
        });
        
    })
	
	.get(function(req, res) {
        CoreSchema.Booking.find(function(err, bookings) {
            if (err)
                res.send(err);

            res.json(bookings);
        });
    });
	
	router.route('/booking/:booking_id')
	
	.get(function(req, res) {
        CoreSchema.Booking.findById(req.params.booking_id, function(err, booking) {
            if (err)
                res.send(err);
            res.json(booking);
        });
    })
	
	.put(function(req, res) {

        CoreSchema.Booking.findById(req.params.booking_id, function(err, booking) {

            if (err)
                res.send(err);

            booking = new CoreSchema.Booking(req.body)

            booking.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Booking updated!' });
            });

        });
    })
	
	.delete(function(req, res) {
        Booking.remove({
            _id: req.params.booking_id
        }, function(err, booking) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });
	
	


// REGISTER OUR ROUTES -------------------------------
app.use('/deskplanner', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Serving on port ' + port);