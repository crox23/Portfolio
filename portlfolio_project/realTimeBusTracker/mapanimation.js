mapboxgl.accessToken = 'pk.eyJ1IjoiY3JveDIzIiwiYSI6ImNrbmF2NjB5djBrMm4ydm8waWo5b2d0MjEifQ.ul59ADBC4q_h-ZJhd8EaNQ';

var map = new mapboxgl.Map({
    container: 'map', 
    style: 'mapbox://styles/mapbox/streets-v11', 
    center: [-71.0727476236504, 42.36070356143535], 
    zoom: 12
});



var legend = document.getElementById("Bus Legend");
var locationsData = [];
var busLocations = [];
var markers = [];
var colorIndex = ["lime", "green", "olive", "aqua", "teal", "blue", "brown", "cyan",   "navy", "indigo", "violet", "black", "gray", "silver", "magenta", "red", "orange", "yellow"]
async function run(){
    // get bus data    
	const locations = await getBusLocations();
	console.log(new Date());
	console.log(locations);
	console.log(locations.length);
	for (let j = 0; j < markers.length; j++){
		markers[j].remove();
	}

	busLocations = [];
	markers = [];
	removeAllChildNodes(legend);
		
	for (let i = 0; i < locationsData.length; i++){
		busLocations.push([locationsData[i].attributes.longitude, locationsData[i].attributes.latitude]);
		markers.push(new mapboxgl.Marker({color: colorIndex[i]}));
	}

	for (let j = 0; j < markers.length; j++){
		markers[j].setLngLat([busLocations[j][0], busLocations[j][1]]).addTo(map);
	}

	for (let k = 0; k < markers.length; k++){
		let li = document.createElement("li");
		li.id = "listItem" + k;  //Sets id value for <li> elements
		li.innerHTML = "Bus # " + locationsData[k].id;  //Adds bus # to the legend
		li.style.borderLeftColor = markers[k]._color;  //Sets Legend Color to correspond with bus map marker color
		legend.appendChild(li);  //Adds <li> element to the legend <ul>
	}
	

	// timer
	setTimeout(run, 15000);
}

// Request bus data from MBTA
async function getBusLocations(){
	locationsData = [];
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json     = await response.json();
	locationsData = json.data;
	return json.data;
}

run();

function removeAllChildNodes(parent) {
    parent.innerHTML = '<p class = "legendHeader">BUS LEGEND</p>';
}