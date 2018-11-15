var appElement = document.getElementById('#app')
if(appElement){
    console.log("appFunc")
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
console.log("outFunc");
var registerAppElement = document.getElementById('#registerapp')
if(registerAppElement) {
    var registerApp = new Vue({
        el: '#registerapp',
        data: {
            passwordError: false,
            showModal: false,
            message: "",
            password: ""
        },
        methods: {
            registerUser: function(){
                console.log("regFunc");
                this.passwordError = false;
                this.message = "";
                if(password.length < 6){
                    this.showModal = true;
                    this.passwordError = true;                    
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
 
