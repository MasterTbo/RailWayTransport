window.onload = function(){
    loadMap();
}

var appElement = document.getElementById('#app')
if(appElement){
    var app = new Vue({
        el: '#app',
        data: {
            //username: "",
            //password: "",
            //message: "",
            //showModal: false,
            //usernameError: false,
            //passwordError: false
        },
        methods: {
            //registerUser: function(){
            //    this.passwordError = false;
            //    this.message = "";
            //    if(password.length < 6){
            //        this.passwordError = true;
            //        this.showModal = true;
            //        this.message = "Password too short";
            //    }
//
            //    if(this.username.length < 3){
            //        this.usernameError = true;
            //        this.showModal = true;
            //        this.message = "Username too short";
            //    }
//
            //    if(!this.username.includes('@')){
            //        this.passwordError = true;
            //        this.showModal = true;
            //        this.message = "A char '@' not found";
            //    }
//
//
//
                /*var i = 0;
                do{
                    if(!username.charAt(i).equals('@')){
                        this.message = 'Invalid'
                    }
                    i++;
                }while(username.length > 0);*/
            //}
        }
    })
} 

var registerAppElement = document.getElementById('#registerapp')
if(registerAppElement) {
    var registerApp = new Vue({
        el: '#registerapp',
        data: {

        },
        methods: {
            registerUser: function(){
                this.passwordError = false;
                this.message = "";
                if(password.length < 6){
                    this.passwordError = true;
                    this.showModal = true;
                    this.message = "Password too short";
                }

                if(this.username.length < 3){
                    this.usernameError = true;
                    this.showModal = true;
                    this.message = "Username too short";
                }

                if(!this.username.includes('@')){
                    this.passwordError = true;
                    this.showModal = true;
                    this.message = "A char '@' not found";
                }
            }
        }
    })
}
 
function searchLocation(){
    var geo = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken
    })
}


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