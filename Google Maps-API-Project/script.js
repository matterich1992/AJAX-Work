var map;
      // Create a new blank array for all the listing markers.
      var markers = [];
      function initMap() {
        // Constructor creates a new map - only center and zoom are required.
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 37.77493, lng:-122.419416},
          zoom: 13,
          mapTypeControl: false
        });
        // These are the real estate listings that will be shown to the user.
        // Normally we'd have these in a database instead.
        var locations = [
          {title: "Golden-Gate Park", location: {lat: 37.76904, lng:-122.483519}},
          {title: "The Fillmore", location: {lat:37.787966,lng:-122.433681}},
          {title: "Sightglass", location: {lat:37.776981,lng:-122.408571}},
          {title:"MOMA", location: {lat:37.785718,lng:-122.401051}}
          ];
        var largeInfowindow = new google.maps.InfoWindow();
        // The following group uses the location array to create an array of markers on initialize.
        for (var i = 0; i < locations.length; i++) {
          // Get the position from the location array.
          var position = locations[i].location;
          var title = locations[i].title;
          // Create a marker per location, and put into markers array.
           var marker = new google.maps.Marker({
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            id: i
          });
          // Push the marker to our array of markers.
          markers.push(marker);
          // Create an onclick event to open an infowindow at each marker.
          marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
          });
        }
        document.getElementById('show-listings').addEventListener('click', showListings); //Created 'showListings function to Show Markers'

        document.getElementById('hide-listings').addEventListener('click', hideListings); // Created 'hideListings function to HideButtons'
      }
      // This function populates the infowindow when the marker is clicked. We'll only allow
      // one infowindow which will open at the marker that is clicked, and populate based
      // on that markers position.
      function populateInfoWindow(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div>' + marker.title + '</div>');
          infowindow.open(map, marker);
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
          });
        }
      }
      // This function will loop through the markers array and display them all.
      function showListings() {
        var bounds = new google.maps.LatLngBounds();
        // Extend the boundaries of the map for each marker and display the marker
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
          bounds.extend(markers[i].position);
        }
        map.fitBounds(bounds);
      }
      // This function will loop through the listings and hide them all.
      function hideListings() {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
      }



/*var goldenGate = {lat: 37.76904, lng:-122.483519}; //Location object

  var marker = new google.maps.Marker({ //Creating a marker for goldengate park
    position: goldenGate,
    map: map,
    title: "Golden Gate Park"
  });

  var infoWindow = new google.maps.InfoWindow({
    content: "Golden Gate Park. A great place to visit in SF if you're around the area!"
  });

    marker.addListener('click',function(){
      infoWindow.open(map,marker);
  });
}*/
