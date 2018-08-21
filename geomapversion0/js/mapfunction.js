var latlngHK = new google.maps.LatLng(22.30123,114.17885);
var myMap;
var flagpoint=0;
var myInfoWindow = new Array();
var myMarker = new Array();
var contentString = new Array();
contentString[0] = 'POLYU-香港理工大學';
contentString[1] = 'HKU-香港大學';
contentString[2] = 'CUHK-香港中文大學';
contentString[3] = 'HKUST-香港科技大學';
contentString[4] = 'HKBU-香港浸会大學';
contentString[5] = 'Harbour City-尖沙咀';
contentString[6] = 'Festival Walk-九龙塘';
contentString[7] = 'SOGO-尖沙咀';
contentString[8] = 'SOGO-铜锣湾';

google.maps.event.addDomListener(window,'load',initialize);

function initialize() {
	var myOptions =
		{
			panControl:false,
			overviewMapControl:false,
			center:latlngHK,
			mapTypeId:google.maps.MapTypeId.ROADMAP,
			mapTypeControlOptions:{style:google.maps.MapTypeControlStyle.DROPDOWN_MENU,position:google.maps.ControlPosition.TOP_LEFT},
			streeViewControl:true,
			streetViewControlOptions: {position:google.maps.ControlPosition.LEFT_TOP},
			zoomControl:true,
			zoomControlOptions:{position:google.maps.ControlPosition.LEFT_TOP},
			zoom:12,
			scaleControl:true
		};
	myMap = new google.maps.Map(document.getElementById('map'),myOptions);
	
	// ========================================== //
	/* ===== Create a DrawingManager object ===== */
	// ========================================== //
	var myDrawingManager = new google.maps.drawing.DrawingManager();
	myDrawingManager.setMap(myMap);
	
	// ============================================================ //
	/* ===== Measure Tool: get coordinates of points ====== */
	// ============================================================ //
	google.maps.event.addListener(myMap,"click",function(event){getLatLngString(event.latLng);});
	google.maps.event.addListener(myMap,"click",function(event){placeMarker(event.latLng);});
	
	// ================================ //
	/* ===== Place the legend box ===== */
	// ================================ //
	var lengendinfo=set_icon();
	var icons=lengendinfo.icons;
	myMap.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(lengendinfo.legend);
	
	// =============================================== //
	/* ===== Catogoty: Place the schools and shopping markers===== */
	// ============================================== //
	
	//features1 is for schools and features2 for shopping malls
	var features = [
		{position:new google.maps.LatLng(22.303232, 114.178432),type:'schools',title:contentString[0]},
		{position:new google.maps.LatLng(22.283396, 114.137750),type:'schools',title:contentString[1]},
		{position:new google.maps.LatLng(22.416603, 114.211711),type:'schools',title:contentString[2]},
		{position:new google.maps.LatLng(22.336439, 114.265337),type:'schools',title:contentString[3]},
		{position:new google.maps.LatLng(22.340385, 114.181716),type:'schools',title:contentString[4]},
		{position:new google.maps.LatLng(22.295379, 114.166927),type:'shopping',title:contentString[5]},
		{position:new google.maps.LatLng(22.338136, 114.174463),type:'shopping',title:contentString[6]},
		{position:new google.maps.LatLng(22.297674, 114.172948),type:'shopping',title:contentString[7]},
		{position:new google.maps.LatLng(22.280653, 114.184290),type:'shopping',title:contentString[8]}
	];
	$("#Go").click(function(){
		if (document.getElementById("schoolcheck").checked){
			var i=0;
			var imax=5;
			placeCategory(features,icons,i,imax);
			google.maps.event.addListener(myMarker[0],'click',function(){myInfoWindow[0].open(myMap,myMarker[0]);});
			google.maps.event.addListener(myMarker[1],'click',function(){myInfoWindow[1].open(myMap,myMarker[1]);});
			google.maps.event.addListener(myMarker[2],'click',function(){myInfoWindow[2].open(myMap,myMarker[2]);});
			google.maps.event.addListener(myMarker[3],'click',function(){myInfoWindow[3].open(myMap,myMarker[3]);});
			google.maps.event.addListener(myMarker[4],'click',function(){myInfoWindow[4].open(myMap,myMarker[4]);});
		}
		if(document.getElementById("shoppingcheck").checked){
			var j=5;
			var jmax=9;
			placeCategory(features,icons,j,jmax);
			google.maps.event.addListener(myMarker[5],'click',function(){myInfoWindow[5].open(myMap,myMarker[5]);});
			google.maps.event.addListener(myMarker[6],'click',function(){myInfoWindow[6].open(myMap,myMarker[6]);});
			google.maps.event.addListener(myMarker[7],'click',function(){myInfoWindow[7].open(myMap,myMarker[7]);});
			google.maps.event.addListener(myMarker[8],'click',function(){myInfoWindow[8].open(myMap,myMarker[8]);});
		}
    });
	firstopen_info();
	
}

//place markers
function placeMarker(location) {
	if (flagpoint ==1){
	var aMarker = new google.maps.Marker({position:location,map:myMap,title:"Click to see details"});
	}
	else{
		return;
	}
}

//get the coordinates when cursor click the map
function getLatLngString(pt) {
	if (flagpoint ==1){
	var lat = pt.lat();
	lat = lat.toFixed(5);
	var lng = pt.lng();
	lng = lng.toFixed(5);
	document.getElementById("info").innerHTML = "lat=" + lat + "<br />lng=" + lng;
	}
	else{
		return;
	}
}

//set the catogoty lengend
function set_icon(){
	var iconBase = 'zz-';
	var icons = {
		schools:{name:'Schools in HK',icon:'./icons/'+iconBase+'school.png'},
		shopping:{name:'Shopping Mall',icon:'./icons/'+iconBase+'shopping.png'}};
	var legend = document.getElementById('legend');
	for (var key in icons) {
		var type = icons[key];
		var name = type.name;
		var icon = type.icon;
		var div = document.createElement('div');
		div.innerHTML = '<img style="width:30%;height:30%;" src="' + icon + '" /> <span style="font-size: 100%">' + name + '</span>';
		legend.appendChild(div);
	}
	var lengendinfo={"legend":legend, "icons":icons};
	return lengendinfo;
}

//place category location on map
function placeCategory(features,icons,i,imax){
	var feature;
	for (i;i<imax; i++) {
		feature=features[i];
		myMarker[i] = new google.maps.Marker({position:feature.position,icon:icons[feature.type].icon,title:feature.title,map:myMap});
		myInfoWindow[i] = new google.maps.InfoWindow({content:contentString[i]});
	}
}