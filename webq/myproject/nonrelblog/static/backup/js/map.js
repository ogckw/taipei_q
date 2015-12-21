var map;
function doFirst(){
map = L.map('map').setView([25.048, 121.514], 13);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery c <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiaHN1aGFuIiwiYSI6ImNpaDVta3lubzAweTl1amx4ajY3ajdyc3IifQ.qRk-5Jc_dVTuocMBOE2c2g'
}).addTo(map);
addretang();
map.on('click', onMapClick);
}

var popup = L.popup();

function onMapClick(e) {
    var marker2 = L.marker(e.latlng).addTo(map);
	popup.setLatLng(e.latlng)
         .setContent("You clicked the map at " + e.latlng.toString())
         .openOn(map);
}


function addretang(){
	var bounds = [[25.12,121.457], [25.125,121.462]];
	var rectangle = L.rectangle(bounds, {color: "#ff7800", weight: 1}).addTo(map);
	rectangle.bindPopup("I am a rectangle.").addTo(map);
}


/* function addmarker(){
	var marker = L.marker([25.048, 121.514]).addTo(map);
	var circle = L.circle([25.048, 121.515], 500, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5}).addTo(map);
	var polygon = L.polygon([
    [25.048, 121.615],
    [25.045, 121.618],
    [25.048, 121.62]
    ]).addTo(map);
	
	
	marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
    circle.bindPopup("I am a circle.");
    polygon.bindPopup("I am a polygon.");
	
	var popup = L.popup()
    .setLatLng([25.048, 121.67])
    .setContent("I am a standalone popup.")
    .openOn(map);
} */








window-addEventListener('load',doFirst,false);