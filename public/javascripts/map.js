class Map {
  constructor(containerDomElement) {
    this.containerDomElement = containerDomElement;
    this.googleMap = null;
    this.markers = [];
  }
  
  init() {
    const latSaved = document.getElementById("latitude");
    const lngSaved = document.getElementById("longitude");
    
    this.googleMap = new google.maps.Map(this.containerDomElement, {
      zoom: 5,
      center: {
        lat: latSaved,
        lng: lngSaved
      }
    });
  }
  

  addMarker(lat, lng, id) {
    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: this.googleMap,
      id: id
    });

    this.markers.push(marker);
  }

  clearMarkers() {
    this.markers.forEach(m => m.setMap(null));
    this.markers = [];
  }

  onClick(cb) {
    this.googleMap.addListener('click', cb);
  }

 

  showAllMarkers() {
    this.markers.forEach(marker => marker.setMap(this.googleMap));
  }

  //  addSearch(searchBoxId) {  //added
  //   const input = document.getElementById(searchBoxId);
  
  //   const searchBox = new google.maps.places.SearchBox(input);
  
  //   this.googleMap.addListener("bounds_changed", () => {
  //     searchBox.setBounds(this.googleMap.getBounds())
  //   })
  
  //   searchBox.addListener("places_changed", () => {
  //     this.clearMarkers();
  
  //     const places = searchBox.getPlaces();
  
  //     if (places.length === 0) return;
  
  //     places.forEach(place => {
  //       this.addMarker(place.geometry.location.lat(), place.geometry.location.lng());
  
  //       this.googleMap.setCenter(place.geometry.location);
  
  //       //means we are on create users page!
  //       if (document.getElementById("auth-index")) {
  //         const lat = place.geometry.location.lat();
  //         const lng = place.geometry.location.lng();
  //         document.getElementById('latitude').value = lat.toFixed(3);
  //         document.getElementById('longitude').value = lng.toFixed(3);
  //       }
  //     })
  //   });
  
  // }
}