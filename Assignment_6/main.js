//Progressive Web App

//Regster the Service Worker
//if('serviceWorker' in navigator){
//    navigator.serviceWorker.register('/service_worker.js', {scope: './'}).then(function(registration){
//        console.log('Seervice Worker registrayion successful:', registration);
//    }, function(error){
//        console.log('Registration failed:', error);
//    });
//};

//VUE-Framework
var app = new Vue({
    el: '#app',
    data:{
        username: "",
        password: "",
        passwordError:  false,
        usernameError:  false,
        showModal: false,
        usernameMessage: [],
        passwordMessage: []
    },
    methods: {
        login: function(){
            window.location.href="searchTrain.html";
            //loadMap();
        },
        loginUser: function(){
            console.log("regFunc");
            this.passwordError =  false;
            this.usernameError =  false;
            this.showModal = false;
            this.usernameMessage = [];
            this.passwordMessage = [];
            //this.password = "";
            //this.username = "";

            if(this.password.length < 6){
                this.showModal = true;
                this.passwordError = true;                    
                this.passwordMessage.push({msg:"Password too short", date: Date.now()})
                console.log("pass < 6");
            }

            if(!this.password.includes('@')){
                this.passwordError = true;
                this.showModal = true;
                this.passwordMessage.push({msg:"Password must include {0 - 9} UTF-8 characters!", date: Date.now()});
                console.log("user < @");
            }

            if(this.username.length <= 0){
                this.showModal = true;
                this.usernameError = true;
                this.usernameMessage.push({msg:"Please enter username", date: Date.now()});
                console.log("user <= 0");
            }

            if(this.username.length < 3){
                this.usernameError = true;
                this.showModal = true;
                this.usernameMessage.push({msg:"Username too short", date: Date.now()});
                console.log("user < 3");
            }

            if(!this.usernameError && !this.passwordError){
                window.location.href="searchTrain.html";
                console.log("mapPage");            
            }
            
        },
        closeModal: function(){
            this.passwordError = false;
            this.usernameError = false;
            this.usernameMessage = [];
            this.passwordMessage = [];
            this.showModal = false;
            console.log("closeModal");
        }
    }
})

//=====Connection to Auth0======
//window.addEventListener('load', function() {
//
//    var webAuth = new auth0.WebAuth({
//      domain: 'matjele-teboho.auth0.com',
//      clientID: 'e9XgVNbWM7tGiMzqmr4Xa2YkccWWtjuY',
//      responseType: 'token id_token',
//      scope: 'openid',
//      redirectUri: window.location.href
//    });
//  
//    var loginBtn = document.getElementById('btn-login');
//  
//    loginBtn.addEventListener('click', function(e) {
//      e.preventDefault();
//      webAuth.authorize();
//    });
//  
//  });



/*
window.onload = function(){
    loadMap();
}

//Load map function
function loadMap(){
    mapboxgl.accessToken = 'pk.eyJ1IjoidXdjbGVjdHVyZXIiLCJhIjoiY2ptdWJ6aWt1MGQ4aDN3bzhiM2V1dnRiYyJ9.lWYq773rwVmRzbyHcYAVHw';
    window.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/strees-v10',
        center: [18.4241, -33.9249], // starting position [longitude, lattitude]
        zoom: 9 // startin zoom
    });
}*/