var map;
var markers=[];

function initMap(){
  map= new google.maps.Map(document.getElementById('map'),{
    center: {lat: 37.77493, lng:-122.419416},
    zoom: 13
  });

//adding multiple locations try Data Layer or Layer from google maps
var locations = [
{title: "Golden-Gate Park", location: {lat: 37.76904, lng:-122.483519}},
{title: "The Fillmore", location: {lat:37.787966,lng:-122.433681}},
{title: "Sightglass", location: {lat:37.776981,lng:-122.408571}},
{title:"MOMA", location: {lat:37.785718,lng:-122.401051}}
];

var largeinfoWindow= new google.maps.InfoWindow();
var bounds = new google.maps.LatLngBounds(); // Bounds set for viewport

for(var i=0;i<locations.length;i++){
//get positions form location array
var position = locations[i].location;
var title = locations[i].title; 
// For every location within the location array above add a marker

var marker = new google.maps.Marker({
position: position, // links to locations[i].location declared variable earlier
  map: map,
  title: title,
  animation: google.maps.Animation.DROP,
  id:i
});
// push marker to array of markers
markers.push(marker);
bounds.extend(marker.position);

marker.addListener('click',function(){
  populateInfoWindow(this,largeinfoWindow);
});

}
// create a function to populate info Window with information upon being clicked
function populateInfoWindow(marker, infoWindow){
if(infoWindow.marker != marker){
  infoWindow.marker=marker;
  infoWindow.setContent('<div>' + marker.title + '</div>');
  infoWindow.open(map,marker);
  infoWindow.addListener('closeclick', function(){
      infoWindow.setMarker(null);
  })
 }
 map.fitBounds(bounds);
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
