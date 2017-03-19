/// Functions of map
///
/// ***on checkout event listener click - saves user co-ordinates into mongodb
/// 
/// ***on wander click span to location entered into autocomplete - find entered 
///
/// ***user can see the cluster of maps of all the locations stored in mongodb
///
///
var map = null;
var currentLocation = null;

function geocodeAddress( geocoder, map){

  var address = $('#location').val();
  geocoder.geocode({'address': address}, function(results, status){

    if(status === 'OK'){

      console.log("im here");
      map.setCenter(results[0].geometry.location);

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
  console.log("Im here!");
  map.setZoom(4);

  var marker = new google.maps.Marker({
    position: {lat: latLng.latitude, lng: latLng.longitude},
    map: map,
    animation: google.maps.Animation.DROP,
    title: 'You are here!'
  });
 
  var geocoder = new google.maps.Geocoder();

  $('#checkout').click(function(e){
    e.preventDefault();
    geocodeAddress(geocoder, map);
    console.log(latLng);
    console.log("we are here?????");


    $.ajax({
        url: "/location",
        method: "POST",
        data: latLng,
      })
      .fail(function() {
            console.log("error getting coordinates");
      })
      .done(function( data ) {
                console.log("coordinates saved", data);
      });
    })  

}    

function getLocation(){
  navigator.geolocation.getCurrentPosition(success, error, option);
}

var wander = function(wander){

  var geocoder = new google.maps.Geocoder();
  var address = $('#location').value;
  if (address == '') {
    window.alert('Please enter an area or address.');
  }else {
    geocoder.geocode({address: address},
      function(results, status) {
        if(status == google.maps.GeocoderStatus.OK) {
          map.setCenter(results[0].geometry.location);
          map.setZoom(15);
          } else {
            window.alert('We could not find the location you specified, try again.');
          }   
        })
  };

  $('#wander').click(function(e){
    e.preventDefault();
    wander();
  });

// function initMap() {

//         map = new google.maps.Map(document.getElementById('map'), {
//           zoom: 4,
//         });

//         console.log("initMap()");
//         getLocation();

//         // var labels = "ABCDE";

//         // var markers = locations.map(function(location, i) {
//         // return new google.maps.Marker({
//         // position: location,
//         // label: labels[i % labels.length]
//         //   });
//         // });

        
//         // var markerCluster = new MarkerClusterer(map, markers,
//         //     {imagePath: './images/m'});
//         // var locations = [
//         // {lat: -31.563910, lng: 147.154312},
//         // {lat: -33.718234, lng: 150.363181},
//         // {lat: -33.727111, lng: 150.371124},
//         // {lat: -33.848588, lng: 151.209834},
//         // {lat: -33.851702, lng: 151.216968},
//         // ]
//   };

// $(function() {
//     console.log("jQuery document ready");
// });

