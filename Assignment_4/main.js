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
        userName: "",
        passWord: ""
    },
    methods: {
        login: function(){
            window.location.href="searchTrain.html";
            //loadMap();
        }
    }
})

window.addEventListener('load', function() {

    var webAuth = new auth0.WebAuth({
      domain: 'matjele-teboho.auth0.com',
      clientID: 'e9XgVNbWM7tGiMzqmr4Xa2YkccWWtjuY',
      responseType: 'token id_token',
      scope: 'openid',
      redirectUri: window.location.href
    });
  
    var loginBtn = document.getElementById('btn-login');
  
    loginBtn.addEventListener('click', function(e) {
      e.preventDefault();
      webAuth.authorize();
    });
  
  });



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