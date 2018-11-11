//Progressive Web App
window.onload = function(){
    loadMap();
}


//Regster the Service Worker
if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/RailWayTransport/Assignment_3/service_worker.js');
};

//Load map function
function loadMap(){
    mapboxgl.accessToken = 'pk.eyJ1IjoidGJvLTAiLCJhIjoiY2ptdDhsZXY1MmM3NTNrbnhiOGJ1bHZoaCJ9.qh77ltMqwFPAZrbUcTNNMw';
    window.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/strees-v10',
        center: [18.4241, -33.9249], // starting position [longitude, lattitude]
        zoom: 9 // startin zoom
    });
}