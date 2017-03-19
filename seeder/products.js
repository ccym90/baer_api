var Sunglasses = require('../models/sunglasses');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/27017/');

// router.post('/homepage', function(req, res, next){
// console.log ("seeding data")

	var product = new Sunglasses();
    	product.name        = "Tokyo";
    	product.description = "Clear/Gold frame, with blue chrome mirror lenses";
      	product.price       = '$32';
      	product.image       = '../images/product1.jpg';
    	product.save(function(err, Product){
      		if(err){
        		console.log(err);
      		}
        	console.log(Product);
    	});

    var product1 = new Sunglasses();
    	product1.name        = "Hong Kong";
    	product1.description = "Reflective Lense";
      	product1.price       = '$33';
      	product1.image       = '../images/product2.jpg';
    	product1.save(function(err, Product){
      		if(err){
        		console.log(err);
      		}
        	console.log(Product);
    	});

   	var product2 = new Sunglasses();
    	product2.name        = "London";
    	product2.description = "Slim lightweight Design";
      	product2.price       = '$35';
      	product2.image       = '../images/product3.jpg';
    	product2.save(function(err, Product){
      		if(err){
        		console.log(err);
      		}
        	console.log(Product);
    	});
   	var product3 = new Sunglasses();
    	product3.name        = "Helsinki";
    	product3.description = "Slim lightweight Design";
      	product3.price       = '$35';
      	product3.image       = '../images/product3.jpg';
    	product3.save(function(err, Product){
      		if(err){
        		console.log(err);
      		}
        	console.log(Product);
    	});

    var product4 = new Sunglasses();
    	product4.name        = "Paris";
    	product4.description = "Slim lightweight Design";
      	product4.price       = '$33';
      	product4.image       = '../images/product2.jpg';
    	product4.save(function(err, Product){
      		if(err){
        		console.log(err);
      		}
        	console.log(Product);
    	});

   	var product5 = new Sunglasses();
    	product5.name        = "Berlin";
    	product5.description = "Slim lightweight Design";
      	product5.price       = '$35';
      	product5.image       = '../images/product3.jpg';
    	product5.save(function(err, Product){
      		if(err){
        		console.log(err);
      		}
        	console.log(Product);
    	});
   	var product6 = new Sunglasses();
    	product6.name        = "Cape Town";
    	product6.description = "Slim lightweight Design";
      	product6.price       = '$35';
      	product6.image       = '../images/product3.jpg';
    	product6.save(function(err, Product){
      		if(err){
        		console.log(err);
      		}
        	console.log(Product);
    	});