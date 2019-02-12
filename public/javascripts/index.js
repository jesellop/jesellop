var geocoder;
var map;


var userLat = document.getElementById("latitude").value || 40.417
var userLng = document.getElementById("longitude").value || -3.704

var marker;
var postal;
var city;

function initMap() {
  // Create the map.
  geocoder = new google.maps.Geocoder();

  var latlng = new google.maps.LatLng(userLat, userLng);

  var mapOptions = {
    zoom: 15,
    center: latlng
  };
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  var marker = new google.maps.Marker({
    animation: google.maps.Animation.DROP,
    position: latlng,
    map: map
  });
 
}

function codeAddress() {
  var marker = [];//no se como hacer que cuando meto el marcador por posición se borre el anterior
  var address = document.getElementById("address").value;
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

      document.getElementById("latitude").value = lat;
      document.getElementById("longitude").value = lng;
      document.getElementById("address").value = postal + ", " + city;
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

// $(".card-category").click(function() {
//   const categoryId = this.dataset.category;

//   $(this).toggleClass("selected");

//   if ($(this).hasClass("selected")) {
//     const newInput = $(document.createElement("input"))
//       .attr("name", "hobbies")
//       .attr("value", categoryId)
//       .attr("id", `category-${categoryId}`)
//       .css("display", "none");

//     $(".edit-user-form").append(newInput);
//   } else {
//     $(`#category-${categoryId}`).remove();
//   }
// });


// $(".category").click(function() {
  
//   const categoryId = this.dataset.category;
//   console.log(`categoria escogida ${categoryId}`)

//   $(".category").addClass("disabled");
//   $(this).toggleClass("selected");

//   $("#category-filter").val(categoryId);
//   //console.log(`valor del input ${categoryId}`)

//   $(".search-btn").click();
// });








// function initMap() {
//   const domElement = document.getElementById("map");


//   if (!domElement) { return; }

//   window.map = new Map(domElement);
//   window.map.init();

//   if (navigator.geolocation)  {
//     centerMapOnBrowser();
//   }


//   if ((document.getElementById("form-item") || (document.getElementById("form-item-edit")))) {  //here here
    
//     window.map.onClick((event) => {
    
//       window.map.clearMarkers();
      
//       addMarkerAndUpateForm(event.latLng.lat(), event.latLng.lng());
      
      
//     })

  
//   } else if (document.getElementById("item-det")) {
//     addItemMarkers();
//   }
// }

// function addItemMarkers() {
//   window.map.googleMap.setCenter({
//     lat: introduce-lat , //introduce the right variables here!!!
//     lng: introduce-lng
//   });
// }

// function centerMapOnBrowser() {
//   navigator.geolocation.getCurrentPosition((position) => {

    // // // Cambiad los valores de posicion en la vista!!
    // var userLat = document.getElementById('latitude').value 
    // var userLng = document.getElementById('longitude').value
    
    // window.map.googleMap.setCenter({
    //   userLat: Number(userLat) || position.coords.latitude,
    //   userLng: Number(userLng) || position.coords.longitude
    // });

    // window.map.googleMap.setZoom(18);

    
    // if ((document.getElementById("form-item")) || (document.getElementById("form-item-edit"))) {
    //   addMarkerAndUpateForm(Number(userLat) || position.coords.latitude, Number(userLng) || position.coords.longitude);
    // }
//   });
// }



// function geocodeLatLng(geocoder, map, infowindow) {
//   var input = document.getElementById('latlng').value;
//   var latlngStr = input.split(',', 2);
//   var latlng = {
//     lat: parseFloat(latlngStr[0]),
//     lng: parseFloat(latlngStr[1])
//   };
//   geocoder.geocode({
//     'location': latlng
//   }, function(results, status) {
//     if (status === google.maps.GeocoderStatus.OK) {
//       if (results[1]) {
//         map.setZoom(11);
//         var marker = new google.maps.Marker({
//           position: latlng,
//           map: map
//         });
//         infowindow.setContent(results[1].formatted_address);
//         infowindow.open(map, marker);
//       } else {
//         window.alert('No hay resultados');
//       }
//     } else {
//       window.alert('Geocoder failed due to: ' + status);
//     }
//   });
// }
