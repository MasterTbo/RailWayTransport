
var app = new Vue({
    el: '#app',
    data:{
        guess: 0,
        numValue: 0,
        message: ""
    },
    methods: {
        compareNumbers: function(){
            //console.log('copmparing')
            //console.log(this.$data.guess, this.$data.numValue)
            if(this.guess == this.numValue){
                //alert("Guessed Number " + this.$data.numValue + " is Correct!")
                window.location.href="Result.html";
                this.message = "Guessed number: " + app.guess + "\nUser Input: " + this.$data.numValue;
            }else{
                alert("Sorry!!!\nGuessed Number " + this.$data.numValue + " is Incorrect!")
                window.location.reload();
            }
        }
    }
})

app.guess = Math.round(Math.random() *10);

console.log(app.guess);