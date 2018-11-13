var registerApp = new Vue({
    el: '#registerapp',
    data: {
        passwordError: false,
        usernameError: false,
        showModal: false,
        usernameMessage: [],
        passwordMessage: [],
        password: "",
        username: "",
    },
    methods: {
        registerUser: function(){
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