// This array contains the coordinates for all bus stops between MIT and Harvard
const busStops = [
  [-71.093729, 42.359244],
  [-71.094915, 42.360175],
  [-71.0958, 42.360698],
  [-71.099558, 42.362953],
  [-71.103476, 42.365248],
  [-71.106067, 42.366806],
  [-71.108717, 42.368355],
  [-71.110799, 42.369192],
  [-71.113095, 42.370218],
  [-71.115476, 42.372085],
  [-71.117585, 42.373016],
  [-71.118625, 42.374863],
];

// TODO: add your own access token
mapboxgl.accessToken ='pk.eyJ1IjoiY3JveDIzIiwiYSI6ImNrbmF2NjB5djBrMm4ydm8waWo5b2d0MjEifQ.ul59ADBC4q_h-ZJhd8EaNQ';
//'pk.eyJ1IjoiY3JveDIzIiwiYSI6ImNrbWNyeGU0bjFzY3gyd3A5bDVkZmFqeXcifQ.J5yP7qevLCyOQxPCbnqY2Q';
//'pk.eyJ1IjoiY3JveDIzIiwiYSI6ImNrbWNzMG1jaTJlbWgydXBtaWc3cWgwNDIifQ.jWxj-_YzJ7U4uoBF5Oy_mg';
  //'pk.eyJ1IjoidGVzdHVzZXIxMDAwIiwiYSI6ImNraDkzZ2pkMzAzMHoycnBmMXpvZ3UwZnMifQ.jAE4YsPeAJv50VK92NSpOQ';

// map object using mapboxgl.map() function
let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-71.104081, 42.365554],
  zoom: 14,
});

// added a marker to the map
let marker = new mapboxgl.Marker().setLngLat([-71.092761, 42.357575]).addTo(map);

// counter here represents the index of the current bus stop
let counter = 0;
function move() {
  //  move the marker on the map every 1000ms. Use the function marker.setLngLat() to update the marker coordinates
  // Use counter to access bus stops in the array busStops

  setTimeout(() => {
    if (counter >= busStops.length) return;
    marker.setLngLat(busStops[counter]);
    counter++;
    move();
  }, 1000);
}

// Do not edit code past this point
if (typeof module !== 'undefined') {
  module.exports = { move, counter, marker, busStops };
}
