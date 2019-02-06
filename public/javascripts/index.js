function initMap() {
  const domElement = document.getElementById("map");

  if (!domElement) { return; }

  window.map = new Map(domElement);
  window.map.init();

  if (navigator.geolocation && document.getElementById("form-item"))  {
    centerMapOnBrowser();
  }

  
  if (document.getElementById("form-item" || "form-item-edit")) {  //here here
    window.map.onClick((event) => {
      // window.map.Circle({
      //   strokeColor: '#FF0000',
      //   strokeOpacity: 0.8,
      //   strokeWeight: 2,
      //   fillColor: '#FF0000',
      //   fillOpacity: 0.35,
      // map: map})
      window.map.clearMarkers();
      
      addMarkerAndUpateForm(event.latLng.lat(), event.latLng.lng());
      
    })

  
  } else if (document.getElementById("item-details")) {
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
    window.map.googleMap.setCenter({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    });

    window.map.googleMap.setZoom(18);

    
    if (document.getElementById("form-item-edit")) {
      addMarkerAndUpateForm(position.coords.latitude, position.coords.longitude);
    }
  });
}

function addMarkerAndUpateForm(lat, lng) {
  window.map.addMarker(lat, lng);

  document.getElementById('latitude').value = lat;
  document.getElementById('longitude').value = lng;
}



