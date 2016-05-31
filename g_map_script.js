//global variables
var map; 
//facebook page
var fb_page_string = "UCIrvine";
//this draws the route on the map
var directionsService = new google.maps.DirectionsService;
var directionsDisplay = new google.maps.DirectionsRenderer;
//the destination coordinats from uci (if directions are requested)
//initially set to UCI itself
var destination_lat = 33.6454; 
var destination_lng = -117.8426;
//destination name (for the buttons)
var dest_name;
function initialize()
{
	//uci coordinates 33.6454,-117.8426
	//diamond jamboree coordinates: 33.689800, -117.836138.
	
	var mapOpt = {
	  //center coordinates for UCI
	  center:new google.maps.LatLng(33.6454,-117.8426), 
	  zoom:15,
	  mapTypeId:google.maps.MapTypeId.ROADMAP
	  };
	map=new google.maps.Map(document.getElementById("googleMap"),mapOpt);
	
	//puts marker on the map
	/*var marker=new google.maps.Marker({
    	position:new google.maps.LatLng(33.6454,-117.8426),
        });
    marker.setMap(map);*/
   
	//sets the route maker to this map
	directionsDisplay.setMap(map);
	//displays the side bar
	directionsDisplay.setPanel(document.getElementById('right-panel'));
	document.getElementById("directions").disabled = true;  
	makeRoute("Aldrich Park, Irvine"); 
	
	//Just hiding the button since I ended up not needing it
	//DAT one line of JQuery though...
	$("#directions").hide();
}

//DOM = Document Object Model
//probably loads after html content loads
google.maps.event.addDomListener(window, 'load', initialize);

//This function pans the map to the lat lng coordinate parameters.
//lat lng: decimal numbers
//name: name of location with lat lng coordintes
function panMap(lat, lng, name){
	if(name == "UCI"){
		document.getElementById("directions").value = "Directions";
		document.getElementById("directions").disabled = true;
	}else{
		document.getElementById("directions").value = "Directions to " + name;
		document.getElementById("directions").disabled = false;
	}
	var message = document.getElementById("message");
	var latlng = new google.maps.LatLng(lat,lng);
	map.panTo(latlng);
	map.setZoom(15);
	destination_lat = lat;
	destination_lng = lng;
	document.getElementById("searchBox").value = name;
	//converts the lat lng coordinates into the location name,
	//if it's a valid location
	var geocoder = new google.maps.Geocoder;
	geocoder.geocode({'location': latlng}, function(results, status) {
	if (status === google.maps.GeocoderStatus.OK) {
	  if (results[1]) {
	  	console.log(results[1].formatted_address);
	  } else {
	    window.alert('No results found');
	  }
	} else {
	  window.alert('Geocoder failed due to: ' + status);
	    }
	  });
}

//This function dislplays the directions from UCI to map_destination on the 
//map canvas (highlights the route). If the map_destination is invalid a 
//pop-up notification appears on the user's web browser.
//map_destination: can either be a lat long object or a location name (a string)
function makeRoute(map_destination){
	directionsService.route({
    origin: "pereira drive, irvine, ca",
    destination: map_destination,
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

//This functions reads the content from the input box (id is 'searchBox')
//and passes in that value to the makeRoute function (which highlights the
//route on the canvs). Afterwards, it clears the text from the input box.
function searchBoxRoute(){
	var input = document.getElementById("searchBox");
	makeRoute(input.value);
	input.value=""; //clear entry after search
}


