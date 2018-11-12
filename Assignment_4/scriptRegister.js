var registerApp = new Vue({
    el: '#registerapp',
    data: {
        passwordError: false,
        usernameError: false,
        showModal: false,
        usernameMessage: "",
        passwordMessage: "",
        password: "",
        username: ""
    },
    methods: {
        registerUser: function(){
            console.log("regFunc");
            this.passwordError =  false;
            this.usernameError =  false;
            this.showModal = false;
            this.usernameMessage = "";
            this.passwordMessage = "";
            //this.password = "";
            //this.username = "";

            if(this.password.length < 6){
                this.showModal = true;
                this.passwordError = true;                    
                this.message = "Password too short";
            }

            if(this.username.length <= 0){
                this.showModal = true;
                this.usernameError = true;
                this.usernameMessage = "Please enter username";
            }

            if(this.username.length < 3){
                this.usernameError = true;
                this.showModal = true;
                this.usernameMessage = "Username too short";
            }

            /*if(!this.username.includes('@')){
                this.usernameError = true;
                this.showModal = true;
                this.usernameMessage = "A char '@' not found";
            }*/
        },
        closeModal: function(){
            showModal = false;
            passwordError = false;
            usernameError = false;
            this.usernameMessage = "";
            this.passwordMessage = "";
            console.log("closeModal");
        }
    }
    
})