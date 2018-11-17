var map = L.map('map').setView([-33.91, 18.41], 11)
L.marker([51.5, -0.09], {icon: redIcon}).addTo(map);

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
  "&searchtext=";

var redIcon = L.icon({
    iconUrl: 'icons/mapPointer.jpg',
    //shadowUrl: 'leaf-shadow.png',

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

L.marker([51.5, -0.09], {icon: redIcon}).addTo(map);

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
