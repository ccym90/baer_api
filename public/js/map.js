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

}
  

    // $.ajax({
    //     url:"/homepage"
    //     method: "POST", 
    //     data: coordinates,    
    //     })
    //     .fail(function() {
    //         console.log("error getting coordinates");
    //     })
    //     .done(function( data ) {
    //             console.log( "coordinates saved" );
    //     });
    //     console.log('input', coordinates);

    // })
    

    /*
    *   AJAX WRAPPER
    */

    function getCoor(url, method, data, cb){

        var returnedData = {}
        var error = undefined;

        $.ajax({
            url: url,
            data: data,
            type: method, 
            dataType: "json"
        })

        .done(function(xhr, status, err){
            console.log("Error");
            console.log(err);
            console.log("Status", status);
            console.log("xhr", xhr);
            error = err;

        })
        .always(function(xhe, status){
            cb(error, returnedData);
        });
    }

    function getCoor(){

    };

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
}

$(function() {
    console.log("jQuery document ready");
});

