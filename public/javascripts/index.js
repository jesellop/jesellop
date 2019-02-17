var geocoder;
var map;


var userLat = document.getElementById("latitude").value || 40.417
var userLng = document.getElementById("longitude").value || -3.704

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


// $(".heart-nonclicked").click(function(event) {
 
//   const heartBtn = event.target;
//   $(heartBtn).toggleClass("clicked-heart") 

  
//   if ($(favIcon).hasClass("clicked-heart")) {
//    axios.post(`/user/{{ item.id }}???/favourite`)
    
//   }
//  ​
//  });


document.getElementById("heart-nonclicked").onsubmit = function() {
  
  document.getElementById("heart-nonclicked").toggleClass("heart-clicked")
 
  if (document.getElementById("to do").hasClass("heart-clicked")) {
   axios.post(`user/${id}/favourite`, body)
     .then(response => {
         console.log('post done, response is: ',response );
     })
     .catch(error => {
         console.log('error: ', error);  
     })
 } 
}




// $(".fav-btn").click(function(event) {
  
//   const favIcon = event.target;
//   /* console.log("entroo", this)
//   console.log("entroo", favIcon)
//   //debugger;
//   const articleId = favIcon.dataset.value;
//   console.log("y value", articleId) */
  
//   $(favIcon).toggleClass("fav-selected")
//   //linkFav.firstChild.addClass("selected");
//   const articleId = favIcon.dataset.value;
//   if ($(favIcon).hasClass("fav-selected")) {
    
//     console.log("y ahora en el if")
    
//     axios.post(`/articles/${articleId}/addToFav`)
//       .then(() => console.log("ok"))
//       .catch(err => console.log(err))
//   } else {
//     axios.post(`/articles/${articleId}/removeFromFav`)
//     .then(() => console.log("ok"))
//     .catch(err => console.log(err))
//   }

// });

