var Sunglasses = require('../models/sunglasses');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/27017/');

// router.post('/homepage', function(req, res, next){
// console.log ("seeding data")

  var save = function(err, Product) {
    if (err){
      console.log(err);
    }
      console.log(Product)
  };

	var product = new Sunglasses();
    	product.name        = "Tokyo";
      product.description = "You think water moves fast? You should see ice. It moves like it has a mind. Like it knows it killed the world once and got a taste for murder. After the avalanche, it took us a week to climb out. Now, I don't know exactly when we turned on each other, but I know that seven of us did.";
      product.price       = '$32';
      product.image       = '../images/product1.jpg';
    	product.save();

  var product1 = new Sunglasses();
    	product1.name        = "Hong Kong";
      product1.description = "You think water moves fast? You should see ice. It moves like it has a mind. Like it knows it killed the world once and got a taste for murder. After the avalanche, it took us a week to climb out. Now, I don't know exactly when we turned on each other, but I know that seven of us did.";
      product1.price       = '$33';
      product1.image       = '../images/product2.jpg';
    	product1.save();

  var product2 = new Sunglasses();
    	product2.name        = "London";
      product2.description = "You think water moves fast? You should see ice. It moves like it has a mind. Like it knows it killed the world once and got a taste for murder. After the avalanche, it took us a week to climb out. Now, I don't know exactly when we turned on each other, but I know that seven of us did.";
      product2.price       = '$35';
      product2.image       = '../images/product3.jpg';
    	product2.save();
  
  var product3 = new Sunglasses();
  	  product3.name        = "Helsinki";
      product3.description = "You think water moves fast? You should see ice. It moves like it has a mind. Like it knows it killed the world once and got a taste for murder. After the avalanche, it took us a week to climb out. Now, I don't know exactly when we turned on each other, but I know that seven of us did.";
      product3.price       = '$35';
      product3.image       = '../images/product4.jpg';
    	product3.save();

  var product4 = new Sunglasses();
    	product4.name        = "Paris";
      product4.description = "You think water moves fast? You should see ice. It moves like it has a mind. Like it knows it killed the world once and got a taste for murder. After the avalanche, it took us a week to climb out. Now, I don't know exactly when we turned on each other, but I know that seven of us did.";
      product4.price       = '$33';
      product4.image       = '../images/product5.jpg';
    	product4.save();

  var product5 = new Sunglasses();
    	product5.name        = "Berlin";
      product5.description = "You think water moves fast? You should see ice. It moves like it has a mind. Like it knows it killed the world once and got a taste for murder. After the avalanche, it took us a week to climb out. Now, I don't know exactly when we turned on each other, but I know that seven of us did.";
      product5.price       = '$28';
      product5.image       = '../images/product6.jpg';
    	product5.save();
   
  var product6 = new Sunglasses();
    	product6.name        = "Cape Town";
      product6.description = "You think water moves fast? You should see ice. It moves like it has a mind. Like it knows it killed the world once and got a taste for murder. After the avalanche, it took us a week to climb out. Now, I don't know exactly when we turned on each other, but I know that seven of us did.";
      product6.price       = '$28';
      product6.image       = '../images/product7.jpg';
    	product6.save();

  var product7 = new Sunglasses();
      product7.name        = "LA";
      product7.description = "You think water moves fast? You should see ice. It moves like it has a mind. Like it knows it killed the world once and got a taste for murder. After the avalanche, it took us a week to climb out. Now, I don't know exactly when we turned on each other, but I know that seven of us did.";
      product7.price       = '$32';
      product7.image       = '../images/product8.jpg';
      product7.save();

  var product8 = new Sunglasses();
      product8.name        = "Tibet";
      product8.description = "You think water moves fast? You should see ice. It moves like it has a mind. Like it knows it killed the world once and got a taste for murder. After the avalanche, it took us a week to climb out. Now, I don't know exactly when we turned on each other, but I know that seven of us did.";
      product8.price       = '$33';
      product8.image       = '../images/product9.jpg';
      product8.save();

  var product9 = new Sunglasses();
      product9.name        = "San Fran";
      product9.description = "You think water moves fast? You should see ice. It moves like it has a mind. Like it knows it killed the world once and got a taste for murder. After the avalanche, it took us a week to climb out. Now, I don't know exactly when we turned on each other, but I know that seven of us did.";
      product9.price       = '$35';
      product9.image       = '../images/product10.jpg';
      product9.save();
  
  var product10 = new Sunglasses();
      product10.name        = "Masstrict";
      product10.description = "You think water moves fast? You should see ice. It moves like it has a mind. Like it knows it killed the world once and got a taste for murder. After the avalanche, it took us a week to climb out. Now, I don't know exactly when we turned on each other, but I know that seven of us did.";
      product10.price       = '$35';
      product10.image       = '../images/product11.jpg';
      product10.save();

  var product11 = new Sunglasses();
      product11.name        = "Hanoi";
      product11.description = "You think water moves fast? You should see ice. It moves like it has a mind. Like it knows it killed the world once and got a taste for murder. After the avalanche, it took us a week to climb out. Now, I don't know exactly when we turned on each other, but I know that seven of us did.";
      product11.price       = '$33';
      product11.image       = '../images/product12.jpg';
      product11.save();

  var product12 = new Sunglasses();
      product12.name        = "Osaka";
      product12.description = "You think water moves fast? You should see ice. It moves like it has a mind. Like it knows it killed the world once and got a taste for murder. After the avalanche, it took us a week to climb out. Now, I don't know exactly when we turned on each other, but I know that seven of us did.";
      product12.price       = '$28';
      product12.image       = '../images/product13.jpg';
      product12.save();
   
  var product13 = new Sunglasses();
      product13.name        = "Indiana";
      product13.description = "You think water moves fast? You should see ice. It moves like it has a mind. Like it knows it killed the world once and got a taste for murder. After the avalanche, it took us a week to climb out. Now, I don't know exactly when we turned on each other, but I know that seven of us did.";
      product13.price       = '$28';
      product13.image       = '../images/product14.jpg';
      product13.save();

  var product14 = new Sunglasses();
      product14.name        = "Nassau";
      product14.description = "You think water moves fast? You should see ice. It moves like it has a mind. Like it knows it killed the world once and got a taste for murder. After the avalanche, it took us a week to climb out. Now, I don't know exactly when we turned on each other, but I know that seven of us did.";
      product14.price       = '$32';
      product14.image       = '../images/product15.jpg';
      product14.save();