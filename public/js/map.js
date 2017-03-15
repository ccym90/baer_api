var map = null;
var currentLocation = null;


function geocodeAddress( geocoder, map){

  var address = $('#location').val();
  geocoder.geocode({'address': address}, function(results, status){

    if(status === 'OK'){

      map.setCenter(results[0].geometry.location);

      var marker = new google.maps.Marker({
        position: results[0].geometry.location,
        map: map,
        animation: google.maps.Animation.DROP
      });

    }else{
      console.log(status);
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
}

function success(pos){
  var latLng = pos.coords;
  currentLocation = latLng;

  map.setCenter({lat: latLng.latitude, lng: latLng.longitude});
  map.setZoom(3);

  var marker = new google.maps.Marker({
    position: {lat: latLng.latitude, lng: latLng.longitude},
    map: map,
    animation: google.maps.Animation.DROP
  });

  var geocoder = new google.maps.Geocoder();

  $('#geocode').click(function(e){
    e.preventDefault();
    geocodeAddress(geocoder, map);
  });
  console.log(latLng);
}

function getLocation(){
  navigator.geolocation.getCurrentPosition(success, error, option);
}

function initMap() {

      var uluru = {lat: -25.363, lng: 131.044};
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 3,
          center: uluru
        });

        console.log("initMap()");
        getLocation();
};



$( document ).ready(function() {
    console.log( "ready!" );

    $("#checkout").on('click', function(e){
        console.log(currentLocation);
    });
});



