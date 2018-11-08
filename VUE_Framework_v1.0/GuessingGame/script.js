function generateGuess(){
    return Math.round(Math.random() * 10);
    console.log(app.computerGuess)
}

const app = new Vue({
    el: "#app",
    data: {
      timer: 10,
      computerGuess: generateGuess(),
      inputNumber: 0,
      userValues: [],
      message: "",
      showModal: false,
      errors: []
    },
    methods:{
        userGuess: function(){
            this.userValues.push(this.inputNumber);
            if(this.inputNumber == this.computerGuess){
                this.showModal = true;
                app.message = "You win \nEntered numbers: " + this.userValues;
                this.errors = [];
                this.timer = 10;
                this.computerGuess = generateGuess();                
            }else{
                //alert("incorrect");
                this.errors.push(true);
               // window.location.reload();
               //alert("Entered numbers: " + this.userValues);
                if(this.errors.length >= 3){
                    this.showModal = true;
                    app.message = "You Lost, Play again";
                    this.errors = [];
                    this.timer = 10;
                    this.computerGuess = generateGuess();
                    
                }
            }
        },

        closeModal: function(){
            this.showModal = false;
            this.errors = [];
            this.timer = 10;
            this.computerGuess = generateGuess();
        }
    }

  })

  function countDownTimer(){
      app.timer--;
      if(app.timer == 0){
        //alert("Time up");
        app.showModal = true;
        app.message = "Your Time is Up!\nThe guessed number was: " + app.computerGuess;
        app.timer = 10;
      }
  }
  setInterval(countDownTimer, 1000);
 