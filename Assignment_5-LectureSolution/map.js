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
        destinationAddress: '',
        autoCompleteResults: [],
        startPoint: "",
        destAddress: ""
    },
    methods: {
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