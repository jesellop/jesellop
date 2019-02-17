var geocoder;
var map;


var userLat = document.getElementById("latitude-nav").value || 40.417
var userLng = document.getElementById("longitude-nav").value || -3.704

var marker;
var postal;
var city;

function initMap() {

  
  geocoder = new google.maps.Geocoder();

  var latlng = new google.maps.LatLng(userLat, userLng);

  var mapOptions = {
    zoom: 15,
    center: latlng
  };
  map = new google.maps.Map(document.getElementById("map-nav"), mapOptions);
  var marker = new google.maps.Marker({
    animation: google.maps.Animation.DROP,
    position: latlng,
    map: map
  });

}

function codeAddressS() {
  var marker = [];//no se como hacer que cuando meto el marcador por posición se borre el anterior
  var address = document.getElementById("address-nav").value;
  geocoder.geocode({ address: address }, function(results, status) {
    if (status == "OK") {
      postal = results[0].address_components[0].long_name;
      city = results[0].address_components[1].long_name;

      map.setCenter(results[0].geometry.location);

      var marker = new google.maps.Marker(
        {
        animation: google.maps.Animation.DROP,
        map: map,
        position: results[0].geometry.location
      }

      );

      var lat = results[0].geometry.location.lat().toFixed(3);
      var lng = results[0].geometry.location.lng().toFixed(3);

      document.getElementById("latitude-nav").value = lat;
      document.getElementById("longitude-nav").value = lng;
      document.getElementById("address-nav").value = postal + ", " + city;
      console.log(results[0].address_components);
    } else {
      alert("Geocode no ha funcionado correctamente: " + status);
    }
  });
}


function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}
