function doFirst(){
	var area =document.getElementById('gmap');
	var latlng = new google.maps.LatLng(24.972,121.205);
	var option ={
		zoom : 14,
		center : latlng,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(area,option);
}
window.addEventListener('load' , doFirst , false);