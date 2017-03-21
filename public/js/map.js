
/// Functions of map
///
/// ***on checkout event listener click - saves user co-ordinates into mongodb
/// 
/// ***on wander click span to location entered into autocomplete - find entered 
///
/// ***user can see the cluster of maps of all the locations stored in mongodb
///
///

var map;
var currentLocation;
var mc; 
var marker;
var markers = [];

function geocodeAddress( geocoder, map){

	var address = $('#location').val();
	geocoder.geocode({'address': address}, function(results, status){
	
	if (status === 'OK') {
		
		map.setCenter(results[0].geometry.location);

	} else {
		console.log("didnt work", status)
	} 
	});
}


var option= {
	enableHighAccuracy: true,
	time: 5000,
	maximumAge: 0
};


function error(err){
	console.log("err", err);
};


function success(pos){
	var latLng = pos.coords;
	currentLocation = latLng;

	map.setCenter({lat: latLng.latitude, lng: latLng.longitude});
	console.log("Im here!");
	map.setZoom(4);

	var marker = new google.maps.Marker({
	  position: {lat: latLng.latitude, lng: latLng.longitude},
	  map: map,
	  animation: google.maps.Animation.DROP,
	  title: 'You are here!'
	})
 
	var geocoder = new google.maps.Geocoder();
	$('#go').click(function(e){
		e.preventDefault();
		geocodeAddress(geocoder, map);

	});

	$('#checkout').click(function(e){
		e.preventDefault();
		alert("Thank you for your purchase!");
		payment();
		geocodeAddress(geocoder, map);
		console.log(latLng);

		$.ajax({
		url: "/location",
		method: "POST",
		data: latLng,
		})
		.fail(function() {
				console.log("error getting coordinates");
			})
		.done(function( data ) {
				console.log("coordinates saved in mongo", data);
			});
		});   
};    

function getLocation(){
	navigator.geolocation.getCurrentPosition(success, error, option);
}

function initMap() {

	map = new google.maps.Map(document.getElementById('map'),{
		center: new google.maps.LatLng(getLocation),
		mapTypeId: google.maps.MapTypeId.HYBRID
	});

	console.log("initMap()");
	getLocation();
	var geocoder = new google.maps.Geocoder();

	postPins();

	
};

var postPins = function() {

	$.ajax({
		url: "/postlocation",
		method: "GET"
	})
	.fail(function() {
				console.log("error getting coordinates");
	})
	.done(function( data ) {
		console.log("coordinates saved ajax worked", data);
		data.forEach(function(location, index){ //run for each loop through the data stored i.e. cordinates so dont need geocode
			var marker = new google.maps.Marker({
				map: map,
				position: location.coordinate //taking the location.coordinate position from database
			});
			markers.push(marker);
		});
		var options = {
	    imagePath: 'images/m'
	  };
		mc = new MarkerClusterer(map, markers, options);
	});	
} 

var payment = function() {
	swal({
	  title: "Please pay!",
	  text: "im going to take all youre money:",
	  type: "input",
	  showCancelButton: true,
	  closeOnConfirm: false,
	  inputPlaceholder: "Write something"
	}, function (inputValue) {
	  if (inputValue === false) return false;
	  if (inputValue === "") {
	    swal.showInputError("You need to write something!");
	    return false
	  }
	  swal("THanks!", "You wrote: " + inputValue, "success");
	});
	}

$(function() {
		console.log("jQuery document ready");
});
