const express	 = require('express');
const mongodb	 = require('mongodb');
const mongoose 	 = require('mongoose');
const bodyParser = require('body-parser');
const path 		 = require('path');	
const ObjectID	 = require('mongodb').ObjectID;

//init express

const app = express();

var router = express.Router();
var methodOverride = require("method-override");

//midlewares
app.use(express.static('view'));
app.use(express.urlencoded({extended : true}));
app.use(express.json());

// app.use(
// 	bodyParser.urlencoded({extended : true}));

app.use(methodOverride("X-HTTP-Method-Override"));
app.use(methodOverride("_method"));  

//routers
app.get('/', (req, res) => {
	res.send('We are on home page!!!');
})




//mongoDB

let db = 'testCrud_5';
let collection = 'collection';
let url = 'mongodb://localhost:27017/db'

let client = new mongodb.MongoClient(url, {useNewUrlParser : true});


//get data
app.get('/showData', (req, res) => {
	client.connect(err => {
		if(err) {
			console.log(err);
		}
		else {
			client.db(db).collection(collection).find({}).toArray((err, result) => {
				if(err) throw err
					else {
						// ObjectID(db._id);
						res.json(result);
					}
			})
		}
	})
});

//post data
app.post('/postData', (req, res) => {
	client.connect(err => {
		if(err) {
			console.log(err);
		}
		else {
			let formData = {
				"car": req.body.car,
				"model": req.body.model,
			}

			client.db(db).collection(collection).insertOne(formData, (err, result ) => {
				if(err) {
					throw err
				}
				else {
					res.json('Successfully inserted: ' + result);
				}
			})
		}
	})
});


//update
app.put('/update/:id', (req, res) => {
	const carID = ObjectID(req.params.id);
	const userInput = req.body;
	client.connect(err => {
		if(err) {
			console.log(err);
		}
		else {
			client.db(db).collection(collection).updateOne({_id : carID}, {$set : {car: userInput.car, model : userInput.model}}, {returnOriginal : false}, (err, result) => {
				if(err) {
					console.log(err);
			}
			else {
				res.json(result);
			}
		});
		}
	})
});


//delete
app.delete('/delete/:id', (req, res) => {
	const carID = ObjectID(req.params.id);
	client.connect(err => {
		if(err) {
			console.log(err);
		}
		else {
			client.db(db).collection(collection).findOneAndDelete({_id : carID}, (err, result) => {
				if(err) {
					console.log(err);
			}
			else {
				res.json(result);
			}
		});
		}
	})
});









//app listenign

let port = 3000;

app.listen(port, () => {
	console.log(`App listening on port: ${port}`);
});