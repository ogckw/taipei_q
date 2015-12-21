var map;

function doFirst(){
	map = L.map('gmap').setView([25.048, 121.514], 13);
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery c <a href="http://mapbox.com">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox.streets',
	accessToken: 'pk.eyJ1IjoiaHN1aGFuIiwiYSI6ImNpaDVta3lubzAweTl1amx4ajY3ajdyc3IifQ.qRk-5Jc_dVTuocMBOE2c2g'
	}).addTo(map);
}
window-addEventListener('load',doFirst,false);