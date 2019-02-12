// class Map {
//   constructor(containerDomElement) {
//     this.containerDomElement = containerDomElement;
//     this.googleMap = null;
//     this.markers = [];
//     this.geocoder = null;
//   }
  
//   init() {
//     const latSaved = document.getElementById("latitude");
//     const lngSaved = document.getElementById("longitude");

    
//     this.googleMap = new google.maps.Map(this.containerDomElement, {
//       zoom: 5,
//       center: {
//         lat: latSaved,
//         lng: lngSaved
//       }
//     });
//   }
 

  // addMarker(lat, lng, id) {
  //   const marker = new google.maps.Marker({
  //     position: { lat, lng },
  //     map: this.googleMap,
  //     animation: google.maps.Animation.DROP,
  //     id: id
  //   });

  //   this.markers.push(marker);
  // }

//   clearMarkers() {
//     this.markers.forEach(m => m.setMap(null));
//     this.markers = [];
//   }

//   onClick(cb) {
//     this.googleMap.addListener('click', cb);
//   }

 

//   showAllMarkers() {
//     this.markers.forEach(marker => marker.setMap(this.googleMap));
//   }
// }