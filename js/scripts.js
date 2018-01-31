var Game = {
  score: 0,
  hero: '',
  villain: '',
  speedModifier: 1,

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

var Powers = {
  activeScoreMultiplier: false,

  scoreMultiplier: function() {
    this.activeScoreMultiplier = true;
    PowerUpCounter.startCounter();
    return 1000;
  },
  slowDown: function() {
    console.log("I'm slow");
    PowerUpCounter.startCounter();
    return 2000;
  },
  speedUp: function() {
    console.log("I'm fast");
    PowerUpCounter.startCounter();
    return 700;
  },
  extraPoints: function() {
    Game.score += 5;
    return 1000;
  },
  losePoints: function() {
    Game.score -= 5;
    return 1000;
  }

};

var PowerUpCounter = {
  counter: 0,
  activePowerUp: false,
  reset: function() {
    this.counter = 0;
  },
  startCounter: function() {
    this.activePowerUp = true;
    this.counter = 0;
  },
  checkPowerUpCounter: function() {
    if (this.counter >= 10) {
      this.activePowerUp = false;
      Powers.activeScoreMultiplier = false;
      console.log(this.counter);
      console.log(Powers.activeScoreMultiplier);
    } else {
      this.counter ++;
      console.log(this.counter);
      console.log(Powers.activeScoreMultiplier);
    }
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

    $(".random").click(function() {
      $(this).parent().addClass("pointGain");
      $(this).addClass("clicked");
    });

    if (hero === "obama") {
      $(".trump").click(function() {
        $(this).parent().addClass("pointGain");
        $(this).addClass("clicked");
      });
      $(".obama").click(function() {
        $(this).parent().addClass("pointLose");
        $(this).addClass("clicked");
      });
    } else {
      $(".obama").click(function() {
        $(this).parent().addClass("pointGain");
        $(this).addClass("clicked");
      });
      $(".trump").click(function() {
        $(this).parent().addClass("pointLose");
        $(this).addClass("clicked");
      });
    };
    // $(".random").click(function() {
    //   getPower();
    // })
  };

  // var checkIfClicked = function(randomBoxNumber) {
  //   console.log("Checking if Clicked!")
  //   var currentBox = $("#s" + randomBoxNumber);
  //   console.log(currentBox);
  //   if (Game.hero === "obama") {
  //     if (currentBox.find(".trump").hasClass("clicked") === false
  //       && currentBox.find(".trump").hasClass("hidden") === false) {
  //       console.log(-1);
  //       return -1;
  //     };
  //     if (currentBox.find(".obama").hasClass("clicked") === false
  //       && currentBox.find(".obama").hasClass("hidden") === false) {
  //       console.log(1);
  //       return 1;
  //     };
  //   } else {
  //
  //     if (currentBox.find(".trump").hasClass("clicked") === false
  //       && currentBox.find(".trump").hasClass("hidden") === false) {
  //       return 1;
  //     };
  //     if (currentBox.find(".obama").hasClass("clicked") === false
  //       && currentBox.find(".obama").hasClass("hidden") === false) {
  //       return -1;
  //     };
  //   };
  // };

  var checkIfClicked = function(randomBoxNumber) {
        var currentBox = $("#s" + randomBoxNumber);
        if (currentBox.length === 0) return 0;
        var villainClicked = currentBox.find(`.${Game.villain}.clicked`).length > 0;
        var villainHidden = currentBox.find(`.${Game.villain}.hidden`).length > 0;
        var heroClicked = currentBox.find(`.${Game.hero}.clicked`).length > 0;
        var heroHidden = currentBox.find(`.${Game.hero}.hidden`).length > 0;
        var randomClicked = currentBox.find(`.${"random"}.clicked`).length > 0;
        var randomHidden = currentBox.find(`.${"random"}.hidden`).length > 0;
        if (!villainClicked && !villainHidden) return -1;
        if (!heroClicked && !heroHidden) return 1;
        if (villainClicked && !villainHidden) return 1;
        if (heroClicked && !heroHidden) return -1;
        if (randomClicked && !randomHidden) return "powerUp";
        else return 0;
    };

  var resetImages = function() {
    $("img").removeClass("clicked");
    $("img").removeClass("pointGain");
    $("img").removeClass("pointLose");
  };

  var getPowerUp = function(speed) {
    var randomIndex = Math.ceil(Math.random()*6);
    var speed = speed;
    console.log(randomIndex);

    switch (randomIndex) {
      case 1:
        console.log("I'm in case 1");
        break;
      case 2:
        this.speed = Powers.slowDown();
        break;
      case 3:
        this.speed = Powers.extraPoints();
        break;
      case 4:
        this.speed = Powers.scoreMultiplier();
        break;
      case 5:
        this.speed = Powers.speedUp();
        break;
      default:
        this.speed = Powers.losePoints();
        break;
    };

    resetImages();
    Timer.setTime();
    if (Timer.currentTime >= 0) interval(this.speed);
  };

  var checkStatus = function(randomBoxNumber, speed) {
    var branchIndex = checkIfClicked(randomBoxNumber);

    if (branchIndex === 1 && Powers.activeScoreMultiplier) {
      branchIndex = 2;
    };

    var speed = speed;
    PowerUpCounter.checkPowerUpCounter();

    if(PowerUpCounter.activePowerUp === false) {
      speed = 1000;
    };

    if (branchIndex === "powerUp") {
      console.log("Power Me Up!!!");
      getPowerUp(speed);
    } else {
      Game.setScore(branchIndex);
      resetImages();
      Timer.setTime();
      if (Timer.currentTime >= 0) interval(speed);
    };
  };

  var interval = function(speed) {
    var randomBoxNumber = 0;
    var randomDisplayIndex = 0;
    var showInnards = undefined;

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

    setTimeout(function() {
      checkStatus(randomBoxNumber, speed);
    }, speed);

  };

  var startGame = function() {
    $("img").addClass("hidden");
    Game.reset();
    assignGameClicks(Game.hero);
    interval(1000);
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
