var map = L.map('map').setView([-33.91, 18.41], 11)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map)

const appId = 'CVNwhRsBKjQXRlbOZIJs'
const appCode = '5bgs6vvyBoKP9cAOjBy1gA'

const autocompleteUrl = "http://autocomplete.geocoder.api.here.com/6.2/suggest.json" +
  "?app_id=" + appId +
  "&app_code=" + appCode +
  "&query="
  
const geocodeUrl = "https://geocoder.api.here.com/6.2/geocode.json" +
  "?app_id=" + appId +
  "&app_code=" + appCode +
  "&searchtext="

var app = new Vue({
    el: '#app',
    data: {
        startAddress: '',        
        startPoint: "",
        destAddress: "",
        autoCompleteResults: [],

        destLocError: false,
        startLocError: false,
        showModal: false,
        startLocMessage: [],
        endLocMessage: []        
    },
    methods: {
        locationSearch: function(){
            //console.log("searchFunc");
            this.destLocError =  false;
            this.startLocError =  false;
            this.showModal = false;
            this.startLocMessage = [];
            this.endLocMessage = [];

            if(this.startAddress.length <= 0){
                this.showModal = true;
                this.startLocError = true;
                this.startLocMessage.push({msg:"Please enter start address", date: Date.now()});
                //console.log("user <= 0");
            }

            if(this.destAddress.length <= 0){
                this.showModal = true;
                this.destLocError = true;
                this.endLocMessage.push({msg:"Please enter destination address", date: Date.now()});
                //console.log("user <= 0");
            }
        },
        closeModal: function(){
            this.destLocError = false;
            this.startLocError = false;
            this.startLocMessage = [];
            this.endLocMessage = [];
            this.showModal = false;
            console.log("closeModal");
        },
        autocomplete: function () {
            var _this = this
            var coordAddres = "";
            if(this.startAddress.length < 3 && this.destAddress.length < 3) {
                return false
            }

            if(this.startAddress.length > 0){
                console.log("startComplete");
                fetch(autocompleteUrl + this.startAddress)
                    .then(function (response) {
                        return response.json()
                    })
                    .then(function (response) {
                        _this.autoCompleteResults = response.suggestions
                    })
            }
        
            if(this.destAddress.length > 0){
                console.log("destComplete");
                fetch(autocompleteUrl + this.destAddress)
                    .then(function (response) {
                        return response.json()
                    })
                    .then(function (response) {
                        _this.autoCompleteResults = response.suggestions
                    })
            } 
        },
        resultSelect: function (result) {
            var _this = this
            console.log('result', result)
            fetch(geocodeUrl + result.label)
                .then(function (response) {
                    return response.json()
                })
                .then(function (response) {
                    var location = response.Response.View[0].Result[0].Location.DisplayPosition
                    _this.startPoint = L.marker([location.Latitude, location.Longitude]).addTo(map)
                    _this.autoCompleteResults = []                    
                })
        }
    }
})

//connect to where is my transport, get token.....


































/*
var platform = new H.service.Platform({
    'app_id':'CVNwhRsBKjQXRlbOZIJs',
    'app_code':'5bgs6vvyBoKP9cAOjBy1gA'
});

function moveMapToCapeTown(map){
    map.setCenter({lat:-33.9249, lng:18.4241});
    map.setZoom(10);
    var mapMarker = new H.map.Marker({lat:-33.9249, lng:18.4241});
    map.addObject(mapMarker);
}

function putMarker(map){
    var mapMarker = new H.map.Marker({lat:-33.9249, lng:18.4241});
  map.addObject(mapMarker);
}
   
  /**
   * Boilerplate map initialization code starts below:
   */
  /*
  //Step 1: initialize communication with the platform
  var platform = new H.service.Platform({
    app_id: 'CVNwhRsBKjQXRlbOZIJs',
    app_code: '5bgs6vvyBoKP9cAOjBy1gA',
    useHTTPS: true
  });

  var pixelRatio = window.devicePixelRatio || 1;
  var defaultLayers = platform.createDefaultLayers({
    tileSize: pixelRatio === 1 ? 256 : 512,
    ppi: pixelRatio === 1 ? undefined : 320
  });
  
  //Step 2: initialize a map  - not specificing a location will give a whole world view.
  var map = new H.Map(document.getElementById('map'),
    defaultLayers.normal.map, {pixelRatio: pixelRatio});
  
  //Step 3: make the map interactive
  // MapEvents enables the event system
  // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
  var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
  
  // Create the default UI components
  var ui = H.ui.UI.createDefault(map, defaultLayers);
  
  // Now use the map as required...
  moveMapToCapeTown(map);
  //putMarker(map);





















































/*
window.onload = function(){
    loadMap();
}

function searchLocation(){
    var geo = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken;
    });
}*/
/*
var geocoder = new MapboxGeocoder({
    mapboxgl.accessToken = 'pk.eyJ1IjoidGJvLTAiLCJhIjoiY2ptdDhsZXY1MmM3NTNrbnhiOGJ1bHZoaCJ9.qh77ltMqwFPAZrbUcTNNMw';
    accessToken: mapboxgl.accessToken;
});

//Load map function
function loadMap(){
    //window.location.href = "searchTrain.html";
    mapboxgl.accessToken = 'pk.eyJ1IjoidGJvLTAiLCJhIjoiY2ptdDhsZXY1MmM3NTNrbnhiOGJ1bHZoaCJ9.qh77ltMqwFPAZrbUcTNNMw';
    window.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v10',       
        center: [18.4241, -33.9249], // starting position [lng, lat]
        zoom: 9 // starting zoom
    });
    
    window.startPin = new mapboxgl.Marker({draggable : true}).setLngLat([0, 0]).addTo(window.map)
    window.destinationPin = new mapboxgl.Marker({draggable : true}).setLngLat([0, 0]).addTo(window.map)
    window.map.on('click', function(event){
        event.preventDefault();
        if(window.startPoint == true){
            window.destinationPin.setLngLat(event.lngLat);
            window.startPoint = false;
            //document.getElementById('destination').value = event.lngLat.lng + "," + event.lngLat.lat;
        }else{
            window.startPin.setLngLat(event.lngLat);
            window.startPoint = true;
            //document.getElementById('start').value = event.lngLat.lng + "," + event.lngLat.lat;
        }
    })
}
document.getElementById('map').appendChild(geocoder.onAdd(map));
*/
/*
//New
//var cityName = document.getElementById('loc').value;
function loadMap() {
    //Part 1  
    //var mymap = L.map('map').setView([-33.9249,18.4241], 13);
    //L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    //    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    //    maxZoom: 18,
    //    id: 'mapbox.streets',
    //    accessToken: 'pk.eyJ1IjoidGJvLTAiLCJhIjoiY2ptdDhsZXY1MmM3NTNrbnhiOGJ1bHZoaCJ9.qh77ltMqwFPAZrbUcTNNMw'
    //}).addTo(mymap)

    //Part 2
    //L.mapbox.accessToken = 'pk.eyJ1IjoidGJvLTAiLCJhIjoiY2ptdDhsZXY1MmM3NTNrbnhiOGJ1bHZoaCJ9.qh77ltMqwFPAZrbUcTNNMw';
    //var map = L.mapbox.map('map', 'mapbox.dark')
    //.setView([-33.9249,18.4241], 10);

    //Part 3
    mapboxgl.accessToken = 'pk.eyJ1IjoidGJvLTAiLCJhIjoiY2ptdDhsZXY1MmM3NTNrbnhiOGJ1bHZoaCJ9.qh77ltMqwFPAZrbUcTNNMw';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [-33.9249,18.4241],
        zoom: 13
    });

    var geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken
    });
    
    //Add pointer by locName
    var mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
    mapboxClient.geocoding.forwardGeocode({
        query: 'Cape Town, South Africa',
        autocomplete: false,
        limit: 1
    })
    .send()
    .then(function (response) {
        if (response && response.body && response.body.features && response.body.features.length) {
            var feature = response.body.features[0];

            var map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v9',
                center: feature.center,
                zoom: 10
            });
            new mapboxgl.Marker()
                .setLngLat(feature.center)
                .addTo(map);
        }
    });


    map.addControl(geocoder);

// After the map style has loaded on the page, add a source layer and default
// styling for a single point.
    map.on('load', function() {
        map.addSource('single-point', {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": []
            }
    });

    map.addLayer({
        "id": "point",
        "source": "single-point",
        "type": "circle",
        "paint": {
            "circle-radius": 10,
            "circle-color": "#007cbf"
        }
    });

    // Listen for the `result` event from the MapboxGeocoder that is triggered when a user
    // makes a selection and add a symbol that matches the result.
    geocoder.on('result', function(ev) {
        map.getSource('single-point').setData(ev.result.geometry);
    });
});
=======
/*
function loadMap() {  
    var mymap = L.map('map').setView([-33.9249,18.4241], 13);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoidXdjbGVjdHVyZXIiLCJhIjoiY2ptdWJ6aWt1MGQ4aDN3bzhiM2V1dnRiYyJ9.lWYq773rwVmRzbyHcYAVHw'
    }).addTo(mymap)
>>>>>>> 9e86247dcd234aed0f0a85c83339bc123f60f97a
}

/*
function searchLocation(){
    var strRegion = document.getElementById('startLocation').innerText;
    var endRegion = document.getElementById('destLocation').innerText;
    const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: 'pk.eyJ1IjoidGJvLTAiLCJhIjoiY2ptdDhsZXY1MmM3NTNrbnhiOGJ1bHZoaCJ9.qh77ltMqwFPAZrbUcTNNMw' });

// geocoding with proximity
geocodingClient
  .forwardGeocode({
    query: 'Paris, France',
    proximity: [stsRegion, endRegion]
  })
  .send()
  .then(response => {
    const match = response.body;
  });
}*/

/*
var strRegion = document.getElementById('startLocation').innerText;
var endRegion = document.getElementById('destLocation').innerText;
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: 'pk.eyJ1IjoidGJvLTAiLCJhIjoiY2ptdDhsZXY1MmM3NTNrbnhiOGJ1bHZoaCJ9.qh77ltMqwFPAZrbUcTNNMw' });

// geocoding with proximity
geocodingClient
  .forwardGeocode({
    query: 'Paris, France',
    proximity: [stsRegion, endRegion]
  })
  .send()
  .then(response => {
    const match = response.body;
  });
*/

/*
//Lecture code Search Location
const appId = 'CVNwhRsBKjQXRlbOZIJs'
const appCode = '5bgs6vvyBoKP9cAOjBy1gA'

const autocompleteUrl = "http://autocomplete.geocoder.api.here.com/6.2/suggest.json" +
  "?app_id=" + appId +
  "&app_code=" + appCode +
  "&query="
  
const geocodeUrl = "https://geocoder.api.here.com/6.2/geocode.json" +
  "?app_id=" + appId +
  "&app_code=" + appCode +
  "&searchtext="

var app = new Vue({
  el: '#app',
  data: {
    address: '',
    results: [],
    geoResults: []
  },
  methods: {
    find: function () {
      var _this = this
      fetch(geocodeUrl + this.address)
        .then(function (response) {
          return response.json()
        })
        .then(function (response) {
          console.log('geocode', response)
          console.log('location', response.Response.View[0].Result[0].Location.DisplayPosition)
          _this.geoResults = response.Response.View[0].Result
        })
    },
    search: function () {
      if(this.address.length > 5) {
        var _this = this
        fetch(autocompleteUrl + this.address)
          .then(function (response) {
            return response.json()
          })
          .then(function (response){
            _this.results = response.suggestions
          })
      } else {
        console.log('must use a valid address')
      }
    },
    klick: function (result) {
      this.address = result.label
    }
  }
})*/
