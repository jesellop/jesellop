
function initMap() {
  const domElement = document.getElementById("map");

  if (!domElement) { return; }

  window.map = new Map(domElement);
  window.map.init();
  //window.map.addSearch("pac-input"); //added

  if (navigator.geolocation)  {
    centerMapOnBrowser();
  }

  
  if ((document.getElementById("form-item") || (document.getElementById("form-item-edit")))) {  //here here
    window.map.onClick((event) => {
    
      window.map.clearMarkers();
      
      addMarkerAndUpateForm(event.latLng.lat(), event.latLng.lng());
      
    })

  
  } else if (document.getElementById("item-det")) {
    addItemMarkers();
  }
}

function addItemMarkers() {
  window.map.googleMap.setCenter({
    lat: introduce-lat , //introduce the right variables here!!!
    lng: introduce-lng
  });
}

function centerMapOnBrowser() {
  navigator.geolocation.getCurrentPosition((position) => {

    // Cambiad los valores de posicion en la vista!!
    const lat = document.getElementById('latitude').value 
    const lng = document.getElementById('longitude').value
    
    window.map.googleMap.setCenter({
      lat: Number(lat) || position.coords.latitude,
      lng: Number(lng) || position.coords.longitude
    });

    window.map.googleMap.setZoom(18);

    
    if ((document.getElementById("item-details")) || (document.getElementById("form-item-edit"))) {
      addMarkerAndUpateForm(Number(lat) || position.coords.latitude, Number(lng) || position.coords.longitude);
    }
  });
}

function addMarkerAndUpateForm(lat, lng) {
  window.map.addMarker(lat, lng);

  document.getElementById('latitude').value = lat;
  document.getElementById('longitude').value = lng;
}


//added down


