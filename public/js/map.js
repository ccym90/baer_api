var map = null;

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

    map.addListener('click', function(e) {
    placeMarkerAndPanTo(e.latLng, map);
    
  });

}


// $(function() {
//   console.log("jQuery document ready");
// });
