//ajax get load
var taipei = null;
var map = null;
var baselayer = null;
var gridLayer = null;
var selected = null;




// taipeigrid style
function style(feature) {
    return {
	    weight: 0,
        opacity: 0,
        fillOpacity: 0,
    };
}
//taipei edge style
function style1(feature) {
        return {
			weight: 1,
            opacity: 1,
            //dashArray: '1',
            fillOpacity: 0,
        };
}


// hover grid
function highlightFeature(layer) {
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

function resetHighlight(layer) {
    if (selected === null || selected._leaflet_id !== layer._leaflet_id) {
		gridLayer.resetStyle(layer);
	}
}
//click zoom in and focus outline on click retangle click next gone
function zoomToFeature(layer) {
	
	if (selected !== null) {
		var previous = selected;
    }
	    map.fitBounds(layer.getBounds(), {maxZoom: 15});
	    selected = layer;
	if (previous) {
		resetHighlight(previous);
	}
}



var customepop = {maxWidth: 300, minWidth: 250, 
maxHeight: 160, autoPan: true, closeButton: true, 
autoPanPadding: [5, 5]};

function onEachFeature(feature, layer) {
    layer.on({
		mouseover: function (e) {
  		      highlightFeature(e.target);
  		},
        mouseout: function (e) {
  		      resetHighlight(e.target);
  		},
        click: function(e){
			zoomToFeature(e.target);
			/* document.getElementById("tabs-1").innerHTML = 
			
			
			
			
			
			
			feature.properties.env_grade; */
			feature = feature;
			
			drawBar (feature);
			
			CP_value_100 = parseInt(feature.properties.CP_value_100);
			
			
			
			document.getElementById("tabs-2").innerHTML = 
			"<div id='cp'> CP值:"+feature.properties.CP_value+ "  分/萬元" +"</div>" +
			"<div id='cprank'> CP值排名:"+((100-CP_value_100)+1) + "/100</div>"+
			"<div id='cpv'> <i class='fa fa-tree' id = 'info_icon'></i> 公園綠地:"+feature.properties.park_cp + "/座</div>"+
			"<div id='cpv'> <i class='fa fa-mixcloud' id ='info_icon'></i> 優質空氣:"+feature.properties.psiover50_cp + "/天</div>"+
			"<div id='cpv'> <i class='fa fa-bus' id ='info_icon'></i> 公車站牌:"+feature.properties.bus_cp + "/站</div>"+
			"<div id='cpv' class='swim_case'><img src='/static/images/swimming-24-01.svg' id = 'swim_typhoon'> 颱風災害:"+feature.properties.flood_cp+ "</div>"+
			"<div id='cpv'> <i class='fa fa-cutlery fa-1x' id ='info_icon'></i> 便利商店:"+feature.properties.buy_cp+"/家</div>"+
			"<div id='cpv'> <i class='fa fa-camera' id ='info_icon'></i> 監視點位:"+feature.properties.cctv_cp+"/點</div>"+
			"<HR size='3' color='black'>" + 
			"<div id='cpv'><i class='fa fa-square' id ='info_icon'></i> 平均每坪:"+feature.properties.unitprice+ "</div>"+
			"<div id='cpv'><i class='fa fa-building' id ='info_icon'></i> 平均整戶:"+feature.properties.houseprice+ "</div>"+
			"<div id='cpv'><i class='fa fa-home' id ='info_icon'></i> 平均整戶租金:"+feature.properties.rentprice+ "</div>"
			;
		}
    });
	
	/* var popupContent = "<table  border = '0' cellpadding = '0' cellspacing = '15'><tr><td>公共設施等級 " +
		feature.properties.pub_grade+"<br>"+
		"環境品質等級 " + feature.properties.env_grade  +"<br>"+ 
		"交通機能等級 " + feature.properties.tran_grade  +"<br>"+ 
		"環境災害等級 " + feature.properties.dis_grade+"<br>"+ 
		"購物機能等級 " + feature.properties.buy_grade +"<br>"+
		"生活安全等級 " +
		feature.properties.sec_grade+ "<br>"
		+"整體評分 " +
		feature.properties.ttl_score+ "<br>"+
		"整體評分百分位數 "+
		feature.properties.ttl_score_100;

		
		
    if (feature.properties && feature.properties.popupContent) {
				popupContent += feature.properties.popupContent;
	}
	layer.bindPopup(popupContent,customepop); */
}

	
$(document).ready(function(){
	map = L.map('gmap').setView([25.041223,121.5476829], 13);
    baselayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiaHN1aGFuIiwiYSI6ImNpaDVta3lubzAweTl1amx4ajY3ajdyc3IifQ.qRk-5Jc_dVTuocMBOE2c2g'
     }).addTo(map);
	addGoogleSearch();
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
        }})
	taipeiedge()
});
//searchbox //edit pre address in l.control.geosearch.js

$("#submit").click(function(){
     $('#queryp').html("更改中");
	 change_id = "";
	 var orderp = $('#sortable').find("li");
	 for (var i = 0 ; i < orderp.length; i++) {
          change_id += orderp[i].id[orderp[i].id.length - 1];
     }
     changeScore(change_id);	 
});

$("#default").click(function(){
     $('#queryp').html("更改中");
	 change_id = "111111"
	 changeScore(change_id);
});


//changeScore
function changeScore(change_id){
	var order_change = change_id;
	$.ajax({
            url: '/nonrelblog/changeScore/',
            type: 'post', 
		    data: { scoreorder : order_change },
            success: function(data) {
			    taipei  = data;
			    gridLayer = L.geoJson(taipei, {
                style: style,
                onEachFeature: onEachFeature
                }).addTo(map);
                $('#queryp').html("優先順序");				
            },  
            failure: function(data) { 
                alert('server error maybe try connect admin');
            }
	});
	/* $('#queryp').html("優先順序"); */
}

//google search
function addGoogleSearch(){
    new L.Control.GeoSearch({
        provider: new L.GeoSearch.Provider.Google()
    }).addTo(map);
}

//draw taipeiedge 
var taipeiedge;
function taipeiedge(){
		$.ajax({
        url: '/nonrelblog/edge',
        type: 'get', 
		//this is the default though, you don't actually need to always mention it
        success: function(data) {
        //alert(data);
			taipeiedge  = data
			gridLayer = L.geoJson(taipeiedge, {
            style: style1,
            }).addTo(map);			
        },
        failure: function(data) { 
            alert('server error maybe try connect admin');
        }})	
}





// position
//    0             1            2
//hospital_loc 0 school_loc 1 park_loc  
var hospital_loc,school_loc,park_loc,bus_loc,ubike_loc,drugsotre_loc
,localMarket_loc,convenient_loc
;

hospital_loc =school_loc= park_loc=mrt_loc=bus_loc= ubike_loc=
drugsotre_loc=localMarket_loc=supermarket_loc=convenient_loc=null;

var layergroup = [hospital_loc,school_loc,park_loc,mrt_loc,bus_loc,ubike_loc,drugsotre_loc,localMarket_loc,supermarket_loc,convenient_loc];
var colorgroup = ["#ff4d4d","#b3b3b3","#00cc00","#005be6","#b266ff","#ffcc00","#804000","#b38500","#ffd382","#00cc99"];
var wordgroup = ["white","black","black","white","black","black","white","black","black","black"];
var icongroup = ["hospital","college","soccer","rail-light","bus","bicycle","suitcase","shop","grocery","restaurant"];











//checkbox listener
$('input[type="checkbox"]').click(function(){
  id = $('input[type="checkbox"]').index(this);

  if($(this).is(':checked')){
	  //query index of position
	  if(layergroup[id]!=null){
		  //add point when have local variable
		  map.addLayer(layergroup[id]); 	  
	  }
	  else{//query from database	  
		  $("input").attr('disabled', true); 
		  query(id);	  
	  }
  }
  else{
	  map.removeLayer(layergroup[id]); 
  }
});

//query for point
function query(id){
	$.ajax({
        url: '/nonrelblog/locPoint/'+id,
        type: 'get',
        success: function(data) {
	       Layer = 
		   L.geoJson(data, {
		   pointToLayer: function(feature, latlng) {
               var icon = L.MakiMarkers.icon({icon: icongroup[id], color: colorgroup[id], size: "m"});
		       return L.marker(latlng, {icon: icon});
           },
		   onEachFeature: function (feature, layer) {
	           var popupContent1 = 
			    "<p>" + feature.properties.org_name + "</p>"+
		        "<p>"+feature.properties.AddressClean+"</p>"
			    layer.bindPopup(popupContent1);
	       }, 
	       });
	       
		   
		   layergroup[id] = new L.markerClusterGroup( 
		       {iconCreateFunction: function(cluster) {
                    return L.divIcon({ html: 
					'<div style="line-height:40px;text-align:center;background-color:'
					+colorgroup[id] + ';color:' + wordgroup[id] +';font-size:14px;border-radius:50%;">' + cluster.getChildCount() + '</div>',className: 'mycluster',iconSize:40});
               }
           });
	       layergroup[id].addLayer(Layer);
           map.addLayer(layergroup[id]);
           		   
        },
        failure: function(data) { 
            alert('Got an error');
			
        }
    });	
}


//tab 

$(document).ready(function() {
	$( "#feature_infos" ).tabs();
});
var feature_count = false; 
$('#tab3').click(function(){
	if(feature_count){
		$("#feature_infos").stop().animate(
			{bottom:'0%'},
			1500,
			'easeOutBounce');
			feature_count = false;
		$("#tab3_a").html('－');
	}else{
		$("#feature_infos").stop().animate(
			{bottom:'-45%'},
			1500,
			'easeOutBounce');
			feature_count = true;
		$("#tab3_a").html('＋');
	}		
})






//score bar 
/*         feature.properties.pub_grade+"<br>"+
		"環境品質等級 " + feature.properties.env_grade  +"<br>"+ 
		"交通機能等級 " + feature.properties.tran_grade  +"<br>"+ 
		"環境災害等級 " + feature.properties.dis_grade+"<br>"+ 
		"購物機能等級 " + feature.properties.buy_grade +"<br>"+
		"生活安全等級 " +
		feature.properties.sec_grade+ "<br>"
		+"整體評分 " +
		feature.properties.ttl_score+ "<br>"+
		"整體評分百分位數 " */

function drawBar (feature) {
    ttl_score = parseInt(feature.properties.ttl_score);
	ttl_score_100 = parseInt(feature.properties.ttl_score_100);
	pub_grade = parseInt(feature.properties.pub_grade);
    tran_grade = parseInt(feature.properties.tran_grade);
	buy_grade = parseInt(feature.properties.buy_grade);
	sec_grade = parseInt(feature.properties.sec_grade);
	dis_grade = parseInt(feature.properties.dis_grade);
	env_grade = parseInt(feature.properties.env_grade);
	
	/* feature.properties.pub_grade, feature.properties.tran_grade, 
			feature.properties.buy_grade, feature.properties.sec_grade, feature.properties.dis_grade */
	$('#tabs-1').highcharts({
		chart: {
            type: 'bar',
			backgroundColor: 'rgba(255, 255, 255, 0)',
			polar: true	,
			style: {
            color: '#000',
            fontFamily: "'cwTeXYen', sans-serif"
            }
        },
        title: {
            text: '生活品質總分' + ttl_score,
			style: {
            color: 'red',
            font: "bold 24px 'cwTeXYen' sans-serif"
            }
        },
        subtitle: {
            text: '台北市前' + ((100-ttl_score_100)+1)　+'/100',
			style: {
            color: '#000',
            font: "bold 18px 'cwTeXYen', sans-serif"
            }
        },
        xAxis: {
            categories: ['公共設施', '交通機能', '購物機能', '生活安全', '環境災害','環境品質'],
            title: {
                text: null
            },
			labels:{style: {
            color: '#000',
            font: "bold 16px 'cwTeXYen', sans-serif"
            }}
            			
        },
        yAxis: {
            min: 0,
            max: 5,
			title: {
                text: '劣　　　　　　　　　優',
                align: 'high',
				style: {
                    color: '#000',
					font: "bold 14px 'cwTeXYen', sans-serif"
                }
            },
            labels: {
                overflow: 'justify',
				style: {
                    color: '#000',
					font: "bold 14px 'cwTeXYen', sans-serif"
                }
            },
			
        },
        tooltip: {
            valueSuffix: '分'
			
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true,
					style: {fontSize: '14px',fontFamily: 'cwTeXYen, Sans-Serif'}
                },
				
            }
        },
        /* legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        } ,*/
        credits: {
            enabled: false
        },
        series: [{
            name: '生活品質指標',
            data: [pub_grade,tran_grade,buy_grade,sec_grade,dis_grade,env_grade]
        
        }]
	});             
}























/* 
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
		pointToLayer: function(feature, latlng) {
        var icon = L.MakiMarkers.icon({icon: "hospital", color: "#FFD382", size: "m"});
		return L.marker(latlng, {icon: icon});
        },
		onEachFeature: function (feature, layer) {
	        var popupContent1 = 
			"<p>" + feature.properties.org_name + "</p>"+
		    "<p>"+feature.properties.AddressClean+"</p>"
				layer.bindPopup(popupContent1);
	    }, 
	});
	layergroup[idd] = new L.markerClusterGroup( {
        iconCreateFunction: function(cluster) {
            return L.divIcon({ html: '<div style="line-height:40px;text-align:center;background-color:#FFD382;border-radius:50%;">' + cluster.getChildCount() + '</div>',className: 'mycluster',iconSize:40
			});
        }
    } );
	layergroup[idd].addLayer(Layer);
    map.addLayer(layergroup[idd]);		
}
 */








	


					
















