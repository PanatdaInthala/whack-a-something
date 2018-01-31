var Game = {
  score: 0,
  hero: '',
  villain: '',
  speedModifier: 1,
  intervalPoint: 0,

  setScore: function(score){
    this.score += score;
  },
  checkWin: function() {},
  setSpeed: function() {},
  setHero: function(hero) {
    this.hero = hero;
  },
  setVillain: function(villain) {
    this.villain = villain;
  },

  reset: function() {
    Timer.reset();
    this.score = 0;
    this.speedModifier = 1;

  },
};

var Timer = {
  currentTime: 60,
  setTime: function(){
    this.currentTime --;
  },
  addTime: function() {},
  slowTime: function() {},
  speedTime: function() {},
  reset: function() {
    this.currentTime = 60;
  }
};

var Player = {
  name: '',
  partyAffiliation: ''
};

var Board = {
  squares: [],

  setSquares: function() {},
};

function Square() {
  this.heroImage = heroImage;
  this.villainImage = villainImage;
  this.randomPower = randomPower;
};

// var continueGame = function() {
//
// };

Square.prototype.setVillainImage = function(image) {
  this.villainImage = image;
};

Square.prototype.setHeroImage = function(image) {
  this.heroImage = image;
},


$(document).ready(function() {

  var assignGameClicks = function(hero) {
    if (hero === "obama") {
      $(".trump").click(function() {
        Game.intervalPoint = 1;
        $(this).parent().addClass("pointGain");
        $(this).addClass("clicked");
      });
      $(".obama").click(function() {
        Game.intervalPoint = -1;
        $(this).parent().addClass("pointLose");
        $(this).addClass("clicked");
      });
    } else {
      $(".obama").click(function() {
        Game.intervalPoint = 1;
        $(this).parent().addClass("pointGain");
        $(this).addClass("clicked");
      });
      $(".trump").click(function() {
        Game.intervalPoint = -1;
        $(this).parent().addClass("pointLose");
        $(this).addClass("clicked");
      });
    };
    // $(".random").click(function() {
    //   getPower();
    // })
  };

  var checkIfClicked = function(randomBoxNumber) {
    console.log("Checking if Clicked!")
    var currentBox = $("#s" + randomBoxNumber);
    console.log(currentBox);
    if (Game.hero === "obama") {
      if (currentBox.find(".trump").hasClass("clicked") === false
        && currentBox.find(".trump").hasClass("hidden") === false) {
        console.log(-1);
        return -1;
      };
      if (currentBox.find(".obama").hasClass("clicked") === false
        && currentBox.find(".obama").hasClass("hidden") === false) {
        console.log(1);
        return 1;
      };
    } else {

      if (currentBox.find(".trump").hasClass("clicked") === false
        && currentBox.find(".trump").hasClass("hidden") === false) {
        return 1;
      };
      if (currentBox.find(".obama").hasClass("clicked") === false
        && currentBox.find(".obama").hasClass("hidden") === false) {
        return -1;
      };
    };
  };

  var resetImages = function() {
    $("img").removeClass("clicked");
    $("img").removeClass("pointGain");
    $("img").removeClass("pointLose");
  };

  var beginInterval = setInterval(interval, 1000);

  var interval = function() {
    var randomBoxNumber = 0;
    var randomDisplayIndex = 0;
    var showInnards = undefined;
    Game.intervalPoint = 0;

    randomBoxNumber = Math.ceil(Math.random()*9);
    randomDisplayIndex = Math.ceil(Math.random()*10);

    $(".time").text(Timer.currentTime);
    $(".score").text(Game.score);
    $("img").addClass("hidden");
    $(".col-md-4").removeClass("pointLose");
    $(".col-md-4").removeClass("pointGain");


    if (randomDisplayIndex > 0 && randomDisplayIndex < 5) {
      $("#s" + randomBoxNumber).children("img." + Game.hero).removeClass("hidden");
    } else if (randomDisplayIndex > 4 && randomDisplayIndex< 9) {
      $("#s" + randomBoxNumber).children("img." + Game.villain).removeClass("hidden");
    } else {
      $("#s" + randomBoxNumber).children("img.random").removeClass("hidden");
    };

    // setTimeout(checkIfClicked(randomBoxNumber), 1000);

    setTimeout(function(){},2000);

    Game.setScore(checkIfClicked(randomBoxNumber));
    Game.score += Game.intervalPoint;
    resetImages();
    Timer.setTime();
  };

  var startGame = function() {
    $("img").addClass("hidden");
    Game.reset();
    assignGameClicks(Game.hero);
    setInterval(interval, 1000);
  };

  $(".initHidden").toggleClass("hidden");

  $("#startGame1").click(function() {
    $(this).parent().parent().toggleClass("hidden");
    $("#pickContainer").toggleClass("hidden");
  });

  $("#chooseObama").click(function() {
    Game.setHero("obama");
    Game.setVillain("trump");
    $("#trumpHero").addClass("hidden");
    $("#obamaVill").addClass("hidden");
    $("#obamaHero").toggleClass("hidden");
    $("#trumpVill").toggleClass("hidden");
  });

  $("#chooseTrump").click(function() {
    Game.setHero("trump");
    Game.setVillain("obama");
    $("#obamaHero").addClass("hidden");
    $("#trumpVill").addClass("hidden");
    $("#trumpHero").toggleClass("hidden");
    $("#obamaVill").toggleClass("hidden");
  });

  $("#startGame2").click(function() {
    if ($("#obamaHero").hasClass("hidden") && $("#trumpHero").hasClass("hidden")){
      alert("Please choose a hero.");
    } else {
      $(this).parent().toggleClass("hidden");
      $("#gameContainer").toggleClass("hidden");
      startGame();
    };
  });



});
