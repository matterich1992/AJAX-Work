/*var map;
     // Function to initialize the map within the map div
     function initMap() {
       map = new google.maps.Map(document.getElementById('map'), {
         center: {lat: 40.74135, lng: -73.99802},
         zoom: 14
       });
       // Create a single latLng literal object.
       var singleLatLng = {lat: 40.74135, lng: -73.99802};
       // TODO: Create a single marker appearing on initialize -
       // Create it with the position of the singleLatLng,
       // on the map, and give it your own title!
       // TODO: create a single infowindow, with your own content.
       // It must appear on the marker
       // TODO: create an EVENT LISTENER so that the infowindow opens when
       // the marker is clicked!
     }*/

var map; //Create map variable

function initMap() { //initializer function that calls map 
   var styles = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#fefee7"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":"-18"},{"visibility":"on"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#72c4b9"},{"visibility":"on"}]}]

//Styles array object to customize map

map = new google.maps.Map (document.getElementById('map'),{ // variable map that sets the home state as to where the maps is set 
  center: {lat:37.77493, lng:-122.419416},
  zoom: 13,
  styles: styles, //links to styles object in order to customize .
  mapTypeControl: false //road terrain etc..
});

var embarcadero = {lat: 37.794887, lng:-122.397792}; //Embaracadero Center

     var marker = new google.maps.Marker({ // marker that contains all of the infor of the Market I created coords for

        position: embarcadero,
        map: map,
        animation: google.maps.Animation.DROP,
        title: "Embarcadero Market"
     });

      var infoWindow = new google.maps.InfoWindow({ // information window about the specific location
        content: " Embarcadero Market is great farmer's market/awesome place to get some food when visiting SF"
        });
  
  marker.addListener('click', function(){ // addListener for a 'click' to open the window when clicking the marker
    infoWindow.open(map,marker);
  });

}