var map = L.map('map').setView([-33.91, 18.41], 11)
//L.marker([51.5, -0.09], {icon: redIcon}).addTo(map);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map)

const appId = 'CVNwhRsBKjQXRlbOZIJs'
const appCode = '5bgs6vvyBoKP9cAOjBy1gA'
const clientId = 'f99da0f2-7aed-4d6a-a64b-5a166c99bdd3'
const clientSecret = 'fTV46ARkBaBb+nSNwmBWQm2Eum+I2ik+cBsq6Bsnwso='

const autocompleteUrl = "https://autocomplete.geocoder.api.here.com/6.2/suggest.json" +
  "?app_id=" + appId +
  "&app_code=" + appCode +
  "&query="
  
const geocodeUrl = "https://geocoder.api.here.com/6.2/geocode.json" +
  "?app_id=" + appId +
  "&app_code=" + appCode +
  "&searchtext=";

//Set pointer icon
var redIcon = L.icon({
    iconUrl: 'icons/mapPointer.jpg',
    //shadowUrl: 'leaf-shadow.png',

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});



//Lecture code
const tokenUrl = "https://identity.whereismytransport.com/connect/token"

function login() {
    var payload = {
        'client_id': clientId,
        'client_secret': clientSecret,
        'grant_type': 'client_credentials',
        'scope': 'transportapi:all'
    }

    var request = new XMLHttpRequest();
    request.open('POST', 'https://identity.whereismytransport.com/connect/token', true);
    request.addEventListener('load', function () {
        if(this.status == 200) {
            var response = JSON.parse(this.responseText);
            var token = response.access_token;
            window.token = token;

            localStorage.setItem('token', token)
            localStorage.setItem('storageDate', Date.now().toLocaleString())
        } else {
            console.log("get token call failed")
            alert('login unsuccessful')
        }
    });
    request.setRequestHeader('Accept', 'application/json');
    var formData = new FormData();

    for (var key in payload) {
        formData.append(key, payload[key]);
    }

    request.send(formData);
}

login()


var app = new Vue({
    el: '#app',
    data: {
        startAddress: '',        
        startPoint: "",
        destPoint: "",
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
                    if(_this.isStart == true) {
                        _this.startAddress = result.label
                        _this.startPoint = L.marker([51.5, -0.09], {icon: redIcon}).addTo(map);
                        //L.marker([location.Latitude, location.Longitude])
                        _this.startPoint.addTo(map)
                        _this.startLocation = location
                        _this.autoCompleteResults = []
                    } else {
                        _this.destinationAddress = result.label
                        _this.destinationPoint = L.marker([location.Latitude, location.Longitude])
                        _this.destinationPoint.addTo(map)
                        _this.destinationLocation = location
                        _this.autoCompleteResults = []
                    }
                })
            },
                search: function () {
                    console.log('running search')
                    this.locationSearch();
                    var journeyUrl = 'https://platform.whereismytransport.com/api/journeys'
                    var ourBody = {
                        "geometry": {
                            "type": "MultiPoint",
                            "coordinates": [
                                [
                                    this.startPoint.Longitude,
                                    this.startPoint.Latitude
                                ],
                                [
                                    this.destPoint.Longitude,
                                    this.destPoint.Latitude
                                ]
                            ]
                        },
                        "maxItineraries": 5
                    }

                    fetch(journeyUrl, {
                        method: 'POST',
                        headers: {
                            'Authorization': 'Bearer ' + window.token,
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify(ourBody) 
                    })
                    .then(function(response){
                        // console.log(response)
                        return response.json()
                    })
                    .then(function(response) {
                        console.log(response)
        
                        var itineraries = response.itineraries
                        if(itineraries.length > 0) {
                            var legs = itineraries[0].legs
                            for(var i = 0; i < legs.length; i++) {
                                console.log('geometry', legs[i].geometry.coordinates)
                                var coorindates = legs[i].geometry.coordinates
        
                            }
                        }
                    })
                }
        }
})

//connect to where is my transport, get token.....
