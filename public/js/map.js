
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
};


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

  // var marker = new google.maps.Marker({
  //   position: {lat: latLng.latitude, lng: latLng.longitude},
  //   map: map,
  //   animation: google.maps.Animation.DROP,
  //   title: 'You are here!'
  // });
 
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
    });   
};    


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
        });
    };
};

function initMap() {

        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
        });

        console.log("initMap()");
        getLocation();

        var geocoder = new google.maps.Geocoder();


    $.ajax({
        url: "/postlocation",
        method: "GET"
      })
      .fail(function() {
            console.log("error getting coordinates");
      })
      .done(function( data ) {
            console.log("coordinates saved ajax worked", data);
              
            



              for (i in data) {
                  geocoder.geocode({'location': data[i]}, function(results, status){
                    if(status === google.maps.GeocoderStatus.OK){
                      if(results[0]) {
                        var marker = new google.maps.Marker({
                          map: map,
                          position: results[0].geometry.location
                        });
                      };
                    };
                  });
                }
              });
            };

$(function() {
    console.log("jQuery document ready");
});

// var map = null;
// var currentLocation = null;

// function geocodeAddress( geocoder, map){

//   var address = $('#location').val();
//   geocoder.geocode({'address': address}, function(results, status){

//     if(status === 'OK'){

//       console.log("im here");
//       map.setCenter(results[0].geometry.location);

//     }else{
//       console.log(status);
//     }
//   });
// };


// var option= {
//   enableHighAccuracy: true,
//   time: 5000,
//   maximumAge: 0
// };


// function error(err){
//   console.log("err", err);
// };


// function success(pos){
//   var latLng = pos.coords;
//   currentLocation = latLng;

//   map.setCenter({lat: latLng.latitude, lng: latLng.longitude});
//   console.log("Im here!");
//   map.setZoom(4);

 
//  var geocoder = new google.maps.Geocoder();

//   $('#checkout').click(function(e){
//     e.preventDefault();
//     geocodeAddress(geocoder, map);
//     console.log(latLng);
//     console.log("we are here?????");

//         $.ajax({
//         url: "/location",
//         method: "POST",
//         data: latLng,
//       })
//       .fail(function() {
//             console.log("error getting coordinates");
//       })
//       .done(function( data ) {
//                 console.log("coordinates saved", data);
//       });
//     });   
// };    


// function getLocation(){
//   navigator.geolocation.getCurrentPosition(success, error, option);
// }


// var wander = function(wander){

//   var geocoder = new google.maps.Geocoder();
//   var address = $('#location').value;
//   if (address == '') {
//     window.alert('Please enter an area or address.');
//   }else {
//     geocoder.geocode({address: address},
//       function(results, status) {
//         if(status == google.maps.GeocoderStatus.OK) {
//           map.setCenter(results[0].geometry.location);
//           map.setZoom(15);
//           } else {
//             window.alert('We could not find the location you specified, try again.');
//           }   
//         });
//     };
// };

// function initMap() {

//         map = new google.maps.Map(document.getElementById('map'), {
//           zoom: 4,
//         });

//         console.log("initMap()");
//         getLocation();

//         var geocoder = new google.maps.Geocoder();


//     $.ajax({
//         url: "/postlocation",
//         method: "GET"
//       })
//       .fail(function() {
//             console.log("error getting coordinates");
//       })
//       .done(function( data ) {
//                 console.log("coordinates saved ajax worked", data);
//                 for (i in data) {
//                   geocoder.geocode({'location': data[i]}, function(results, status){
//                     if(status === google.maps.GeocoderStatus.OK){
//                       if(results[0]) {
//                         var marker = new google.maps.Marker({
//                           map: map,
//                           position: results[0].geometry.location
//                         });
//                       };
//                     };
//                   });
//                 }
//               });
//             };


// // function makeMarker = function(geocoder, map) {
// //   var marker = new google.maps.Marker({
// //     position: {lat: latLng.latitude, lng: latLng.longitude},
// //     map: map,
// //     animation: google.maps.Animation.DROP,
// //     title: 'You are here!'
// //   });

  
// }

// $(function() {
//     console.log("jQuery document ready");
// });