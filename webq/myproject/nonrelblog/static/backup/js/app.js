//ajax get load
var taipei;
var map;
var baselayer;
var gridLayer;
// taipeigrid style
function style(feature) {
    return {
	    weight: 0,
        opacity: 0,
        fillOpacity: 0,
    };
}
// hover grid
function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
        opacity: 1,
	    weight: 5,
        color: 'steelblue',
        fillOpacity: 0
    });
    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
}

function resetHighlight(e) {
    gridLayer.resetStyle(e.target);
}
//click zoom in //not enable now need debug
function zoomToFeature(e) {
	map.fitBounds(e.target.getBounds(e.latlng), {maxZoom: 15});
	
}

function onEachFeature(feature, layer) {
    layer.on({
		mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
	var popupContent = "<p>the noise_score is " +
		feature.properties.noise_score + "</p>" +
		"<p> the hospital_score is " + feature.properties.hospital_score + "</p>" + 
		"<p> the school_score is " + feature.properties.school_score + "</p>" + 
		"<p> the mrt_score is " + feature.properties.mrt_score + "</p>" + 
		"<p> the air_score is " + feature.properties.air_score + "</p>"
		;
    if (feature.properties && feature.properties.popupContent) {
				popupContent += feature.properties.popupContent;
	}
	layer.bindPopup(popupContent);
}

	
$(document).ready(function(){
	map = L.map('gmap').setView([25.041223,121.5476829], 13);
    baselayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiaHN1aGFuIiwiYSI6ImNpaDVta3lubzAweTl1amx4ajY3ajdyc3IifQ.qRk-5Jc_dVTuocMBOE2c2g'
     }).addTo(map);
	
	$.ajax({
        url: '/nonrelblog/getTaipei',
        type: 'get', 
		//this is the default though, you don't actually need to always mention it
        success: function(data) {
        //alert(data);
			taipei  = data
			gridLayer = L.geoJson(taipei, {
            style: style,
            onEachFeature: onEachFeature
            }).addTo(map);			
        },
        failure: function(data) { 
            alert('server error maybe try connect admin');
        }
	});	
});

// position
//    0             1            2
//hospital_loc 0 school_loc 1 park_loc  
var hospital_loc,school_loc,park_loc;

var layergroup = [hospital_loc,school_loc,park_loc]




$('input[type="checkbox"]').click(function(){
  var id = $('input[type="checkbox"]').index(this);
  if($(this).is(':checked')){	  //query index of position
	  if(layergroup[id]!=null){
		  //add point when have local variable
		  map.addLayer(layergroup[id]);	
	  }
	  else{//query from database
	      query(id);
	  }
  }
  else{
	  map.removeLayer(layergroup[id]); 
  }
});


function query(id){
	idx = id
	$.ajax({
        url: '/nonrelblog/locPoint/'+idx,
        type: 'get',
        success: function(data) {
	        var locdata  = data
			drawpoint(idx,locdata)  
        },
        failure: function(data) { 
            alert('Got an error');
        }
    });	
}



function drawpoint(idx,locdata){
	idd = idx;
	dataforgeo = locdata;
	Layer = 
	L.geoJson(dataforgeo, {
		onEachFeature: function (feature, layer) {
	            var popupContent1 = 
			    "<p>" + feature.properties.org_name + "</p>"+
				"<p>"+feature.properties.AddressClean+"</p>"
				layer.bindPopup(popupContent1);
	        }
	});
	layergroup[idd] = new L.markerClusterGroup(/* {
        iconCreateFunction: function(cluster) {
            return L.divIcon({ html: '<b>' + cluster.getChildCount() + '</b>'
              ,className: 'mycluster',iconSize: L.circle(50)
			});
        }
    } */);
	layergroup[idd].addLayer(Layer);
    map.addLayer(layergroup[idd]);		
}






	


					
/* function drawpoint(idx,locdata){
	idd = idx;
	dataforgeo = locdata;
	if (idd==1){
	    hospital_Layer = 
		L.geoJson(dataforgeo, {
		    onEachFeature: function (feature, layer) {
	            var popupContent1 = 
			    "<p>" + feature.properties.org_name + "</p>"+
				"<p>"+feature.properties.AddressClean+"</p>"
				layer.bindPopup(popupContent1);
	        }
		});
		hospital_loc = new L.markerClusterGroup();
	    hospital_loc.addLayer(hospital_Layer);
        map.addLayer(hospital_loc);		
	}
	else if(idd==2){  
		school_Layer = 
		L.geoJson(dataforgeo, {
		    onEachFeature: function (feature, layer) {
	            var popupContent1 = 
			    "<p>" + feature.properties.org_name + "</p>"+
				"<p>"+feature.properties.AddressClean+"</p>"
				layer.bindPopup(popupContent1);
	        }
		});
		school_loc = new L.markerClusterGroup();
		school_loc.addLayer(school_Layer);
		map.addLayer(school_loc);
    }
} */
















//start default map
    /* var map = L.map('gmap').setView([25.041223,121.5476829], 13);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiaHN1aGFuIiwiYSI6ImNpaDVta3lubzAweTl1amx4ajY3ajdyc3IifQ.qRk-5Jc_dVTuocMBOE2c2g'
     }).addTo(map);
	
	//edit style
    function style(feature) {
        return {
			weight: 0,
            opacity: 0,
            dashArray: '3',
            fillOpacity: 0,
        };
    }
	
	function style1(feature) {
        return {
			weight: 1,
            opacity: 1,
            //dashArray: '1',
            fillOpacity: 0,
        };
    }
	//data from mongodb
	var taipei = {{taipei_score | safe }};
	//create varaible to change
	var geojson;
	geojson = L.geoJson(taipei, {style: style}).addTo(map);

	taipeiedge1 = L.geoJson(taipeiedge,{style: style1}).addTo(map);
	//search box
	new L.Control.GeoSearch({
            provider: new L.GeoSearch.Provider.Google()
        }).addTo(map);
	
	//highlight
	function highlightFeature(e) {
        var layer = e.target;

        layer.setStyle({
            opacity: 1,
			weight: 5,
            color: 'steelblue',
            dashArray: '3',
            fillOpacity: 0
        });

        if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
        }
    }
	//return
	function resetHighlight(e) {
        geojson.resetStyle(e.target);
    }
	//double click zoom in //not enable now need debug
	function zoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
    }
	//Listener event
	function onEachFeature(feature, layer) {
    layer.on({
		mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
        });
		
	var popupContent = "<p>the noise_score is " +
		feature.properties.noise_score + "</p>" +
		"<p> the hospital_score is " + feature.properties.hospital_score + "</p>" + 
		"<p> the school_score is " + feature.properties.school_score + "</p>" + 
		"<p> the mrt_score is " + feature.properties.mrt_score + "</p>" + 
		"<p> the air_score is " + feature.properties.air_score + "</p>"
		;
		if (feature.properties && feature.properties.popupContent) {
				popupContent += feature.properties.popupContent;
			}
		layer.bindPopup(popupContent);
    }
        geojson = L.geoJson(taipei, {
        style: style,
        onEachFeature: onEachFeature
    }).addTo(map);
	//hospital test cluster      
	//marker
	
	//school_loc	
	var school_loc = null;	
	$("input").click(function() {
        var definea = $("#school_loc").prop("checked");
		if(definea=true){
		    $.ajax({
            url: '/nonrelblog/getSchool',
            type: 'get', //this is the default though, you don't actually need to always mention it
                success: function(data) {
               //alert(data);
			    geoJson  = data
			    var markers = L.markerClusterGroup();

	            var geoJsonLayer = L.geoJson(geoJson, {
		            onEachFeature: function (feature, layer) {
			        var popupContent1 = "<p>" + feature.properties.org_name + "</p>"+
				                  "<p>"+feature.properties.addressclean+"</p>"
				    layer.bindPopup(popupContent1);
			    }
		        });
		        markers.addLayer(geoJsonLayer);

		        map.addLayer(markers);
		        map.fitBounds(markers.getBounds());
			   
            },
                failure: function(data) { 
                alert('Got an error dude');
                }
           });   
		};          
	}); */