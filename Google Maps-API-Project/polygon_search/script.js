var map;
var markers=[];
var polygon = null;

function initMap(){

var styles = [{"featureType":"administrative","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"water","stylers":[{"visibility":"simplified"}]},{"featureType":"transit","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"visibility":"off"}]},{"featureType":"road.local","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"water","stylers":[{"color":"#84afa3"},{"lightness":52}]},{"stylers":[{"saturation":-17},{"gamma":0.36}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#3f518c"}]}]

  map= new google.maps.Map(document.getElementById('map'),{
    center: {lat: 37.77493, lng:-122.419416},
    zoom: 13,
    styles: styles,
    mapTypeControl: false
  });

//adding multiple locations try Data Layer or Layer from google maps
var locations = [
{title: "Golden-Gate Park", location: {lat: 37.76904, lng:-122.483519}},
{title: "The Fillmore", location: {lat:37.787966,lng:-122.433681}},
{title: "Sightglass", location: {lat:37.776981,lng:-122.408571}},
{title:"MOMA", location: {lat:37.785718,lng:-122.401051}}
];

var largeinfoWindow= new google.maps.InfoWindow();

// Initialize the drawing manager.
        var drawingManager = new google.maps.drawing.DrawingManager({
          drawingMode: google.maps.drawing.OverlayType.POLYGON,
          drawingControl: true,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_LEFT,
            drawingModes: [
              google.maps.drawing.OverlayType.POLYGON
            ]
          }
        });

// Style the markers a bit. This will be our listing marker icon.
       var defaultIcon = makeMarkerIcon('0091ff');
       // Create a "highlighted location" marker color for when the user
       // mouses over the marker.
       var highlightedIcon = makeMarkerIcon('FFFF24');

for(var i=0;i<locations.length;i++){
//get positions form location array
var position = locations[i].location;
var title = locations[i].title;
// For every location within the location array above add a marker

var marker = new google.maps.Marker({
position: position, // links to locations[i].location declared variable earlier
  map: map,
  title: title,
   icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
  animation: google.maps.Animation.DROP,
  id:i
});
// push marker to array of markers
markers.push(marker);


marker.addListener('click',function(){
  populateInfoWindow(this,largeinfoWindow);
});
marker.addListener('mouseover', function() {
  this.setIcon(highlightedIcon);
});
marker.addListener('mouseout', function() {
  this.setIcon(defaultIcon);
});
}
document.getElementById('show-listings').addEventListener('click', showListings);
document.getElementById('hide-listings').addEventListener('click', hideListings);

document.getElementById('toggle-drawing').addEventListener('click', function(){
  toggleDrawing(drawingManager);
});
drawingManager.addListener('overlaycomplete', function(event) {
          // First, check if there is an existing polygon.
          // If there is, get rid of it and remove the markers
          if (polygon) {
            polygon.setMap(null);
            hideListings(markers);
          }
          // Switching the drawing mode to the HAND (i.e., no longer drawing).
          drawingManager.setDrawingMode(null);
          // Creating a new editable polygon from the overlay.
          polygon = event.overlay;
          polygon.setEditable(true);
          // Searching within the polygon.
          searchWithinPolygon();
          // Make sure the search is re-done if the poly is changed.
          polygon.getPath().addListener('set_at', searchWithinPolygon);
          polygon.getPath().addListener('insert_at', searchWithinPolygon);
        });
      }

// create a function to populate info Window with information upon being clicked
function populateInfoWindow(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          // Clear the infowindow content to give the streetview time to load.
          infowindow.setContent('');
          infowindow.marker = marker;
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
          });
          var streetViewService = new google.maps.StreetViewService();
          var radius = 50;
          // In case the status is OK, which means the pano was found, compute the
          // position of the streetview image, then calculate the heading, then get a
          // panorama from that and set the options
          function getStreetView(data, status) {
            if (status == google.maps.StreetViewStatus.OK) {
              var nearStreetViewLocation = data.location.latLng;
              var heading = google.maps.geometry.spherical.computeHeading(
                nearStreetViewLocation, marker.position);
                infowindow.setContent('<div>' + marker.title + '</div><div id="pano"></div>');
                var panoramaOptions = {
                  position: nearStreetViewLocation,
                  pov: {
                    heading: heading,
                    pitch: 30
                  }
                };
              var panorama = new google.maps.StreetViewPanorama(
                document.getElementById('pano'), panoramaOptions);
            } else {
              infowindow.setContent('<div>' + marker.title + '</div>' +
                '<div>No Street View Found</div>');
            }
          }
          // Use streetview service to get the closest streetview image within
          // 50 meters of the markers position
          streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
          // Open the infowindow on the correct marker.
          infowindow.open(map, marker);
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
      // This function takes in a COLOR, and then creates a new marker
      // icon of that color. The icon will be 21 px wide by 34 high, have an origin
      // of 0, 0 and be anchored at 10, 34).
      function makeMarkerIcon(markerColor) {
        var markerImage = new google.maps.MarkerImage(
          'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
          '|40|_|%E2%80%A2',
          new google.maps.Size(21, 34),
          new google.maps.Point(0, 0),
          new google.maps.Point(10, 34),
          new google.maps.Size(21,34));
        return markerImage;
      }

function toggleDrawing(drawingManager){
  if(drawingManager.map){
    drawingManager.setMap(null);
    if(polygon){
      polygon.setMap(null);
    }
  } else {
      drawingManager.setMap(map);
  }
 }

 //Search within polygon function
// will only show listings within geometry
 function searchWithinPolygon(){
   for(var i=0;i<markers.length;i++){
     if(google.maps.geometry.poly.containsLocation(markers[i].position,polygon)){
       markers[i].setMap(map);
     } else{
       markers[i].setMap(null);
     }
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
