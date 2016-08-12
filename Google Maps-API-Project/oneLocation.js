var map;
var markers=[];

function initMap(){
  map= new google.maps.Map(document.getElementById('map'),{
    center: {lat: 37.77493, lng:-122.419416},
    zoom: 13
  });

  var goldenGate = {lat: 37.76904, lng:-122.483519}; //Location object

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
}