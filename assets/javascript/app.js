$(document).ready(function(){
  $("#timer").hide();
//My questions array
const myQuestions = [
    {
      question: "Santiago is the capital of which country? ",
      options: [ "Sweden", "Czech Republic","Russia","Chile"],
      answer: 3,
      image: "./assets/images/chile.gif",
      image2:"./assets/images/w1.gif",
    },
    {
      question: "	Amman is the capital of which country?",
      options: ["Thailand", "Jordan", "Philippines", "Kenya"],
      answer: 1,
      image:"./assets/images/jordan.gif",
      image2:"./assets/images/w2.gif",
      
    },
    {
      question: "Wellington is the capital of which country?",
      options: ["Northern Ireland", "Paraguay", "New Zealand", "Palau"],
      answer: 2,
      image:"./assets/images/newzealand.gif",
      image2:"./assets/images/w3.gif",
    },
    {
      question: "	Oslo is the capital of which country?",
      options: ["Vietnam", "Uganda", "Turkey", "Norway"],
      answer: 3,
      image:"./assets/images/norway.gif",
      image2:"./assets/images/w4.gif",
    },
    {
        question: "Madrid is the capital of which country?",
        options: ["Sweden", "Spain","Uganda", "Turkey"],
        answer: 1,
        image:"./assets/images/spain.gif",
        image2:"./assets/images/w5.gif",
    },
    {
        question: "Stockholm is the capital of which country? ",
        options: ["Austria","Spain","Turkey","Sweden"],
        answer: 3,
        image:"./assets/images/sweden.gif",
        image2:"./assets/images/w6.gif",
    }, 
    {
      question: "	Tokyo is the capital of which country?",
      options: ["China", "Malta", "Japan", "Mauritius"],
      answer: 2,
      image:"./assets/images/japan.gif",
      image2:"./assets/images/w1.gif",
    },
    {
      question: "	Seoul is the capital of which country?",
      options: ["Sri Lanka", "North Korea", "South Sudan", "South Korea"],
      answer: 3,
      image:"./assets/images/southkorea.gif",
      image2:"./assets/images/w2.gif",
    },
    {
      question: "	Kathmandu is the capital of which country?",
      options: ["Mozambique", "Monaco", "Nepal", "Myanmar"],
      answer: 2,
      image:"./assets/images/nepal.gif",
      image2:"./assets/images/w3.gif",
    },
    {
      question: "	New Delhi is the capital of which country?",
      options: ["Bhutan", "India", "Pakistan", "Nepal"],
      answer: 1,
      image:"./assets/images/india.gif",
      image2:"./assets/images/w4.gif",
    },
  ];
    let timeImage = "./assets/images/timeup.gif"
   //Stats counter
    let wins = 0;
    let losses = 0;
    let counter = 0;
    let attempted = 0;
    let userSelect = 0;
    let s = 0;
    let t = 0;

//Timer  code //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss). 
function timeConverter(t) {
    let minutes = Math.floor(t / 60);
    let seconds = t - (minutes * 60); // t till 0 minutes
    if (seconds < 10) {
      seconds = "0" + seconds;
     }
    if (minutes === 0) {
      minutes = "00";
     }
    else if (minutes < 10) {
     minutes = "0" + minutes;
     }
     return minutes + ":" + seconds;
    }

function myTimer() {
    s = 8;
    $("#timer").html(timeConverter(s));
    attempted = true;
    t = setInterval(clock, 800);
    //console.log(" I am here in myTimer");
  }

function clock(){
  console.log(" I am here in clock");
    s--;
    $("#timer").html(timeConverter(s));
    if (s < 1) {
        clearInterval(t);
        attempted = false;
    // console.log(" I am here in clock if condition");
        checkAnswer();
    }
  }

//Initial start and reset function // start game and display quiz right away
function startQuiz(){
     $("#gameOver").empty();
     $("#wins").empty();
     $("#losses").empty();
       counter = 0;
       wins = 0;
       losses = 0;
     $("#timer").show();
     newPage();  
  } 

function newPage(){  
      // $("#alert").empty();
      $("#pic").empty();
      $("#questionNum").empty();
      $(".options").empty();
       attempted = true;
      $("#questionNum").html("Question : " + (counter + 1) + "/" + myQuestions.length);
      $(".question").html("<h2>" + myQuestions[counter].question + "</h2>");
      for(let i =0; i < 4; i++){
        let option = $("<div>");
        option.text(myQuestions[counter].options[i]) ;
        option.attr({"data-index": i});
        option.addClass("thisOption");
        $(".options").append(option);
       }
        myTimer();
        $(".thisOption").click(function(){
        // console.log('I am clicked 1');
        //console.log($(this).data('index'));
        userSelect = $(this).data('index');   
        //console.log('I am clicked 2');
        clearInterval(t);
        checkAnswer();
        });
    }

function  checkAnswer(){
    if ((userSelect === myQuestions[counter].answer)  && (attempted === true)){
      //console.log('I am clicked 3');
      wins++;
      // $('#alert').html("You Go !!!Correct!");
      $("#pic").html("You Go !!!Correct!" + `<img src="` + myQuestions[counter].image +`">`);
    }
    else if ((userSelect !== myQuestions[counter].answer)  && (attempted === true)){
      losses ++;
      // $('#alert').html("Oops! That's not right");
      $("#pic").html("Oops! That's not right" + `<img src="` + myQuestions[counter].image2 +`">`);
    }
    else {
      losses++;
      //console.log("times up" + losses);
      // $('#alert').html();
      //$("#pic").html(`<img src="` + myQuestions[counter].image +`">`); 
      $("#pic").html(`Time Is Up!` + `<img src="` + timeImage +`">`);
      attempted = true;
    }
  //Displaying Next question and stats page
    if (counter === (myQuestions.length-1)){
        setTimeout(stats, 2000);
        //console.log(" I am in stats para");
    }
    else{ 
      counter++;
      setTimeout(newPage, 1500);   
    }
  }

function stats(){
      $("#questionNum").empty();
      $(".question").empty();
      $("#timer").empty();
      // $("#alert").empty();
      $("#pic").empty();
      $(".options").empty();
      $("#gameOver").html("Game Over! Let's see, how well you know the World!!!");
      $("#wins").html("Wins: " + wins);
      $("#losses").html("Losses: " + losses);
      $("#startBtn").show();
  } 
$("#startBtn").on('click', function(){
   $(this).hide();
   $("#instructions").hide();
   startQuiz();
  });
});