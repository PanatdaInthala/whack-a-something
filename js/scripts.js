var newGame = false;

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
    Timer.startTimer();
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
  },
  startTimer: function() {
    this.currentTime = 60;
    var activeTimer = setInterval(function(){
      $(".time").text(Timer.currentTime);
      Timer.currentTime--;
      if (Timer.currentTime >= 0) {
      setInterval(activeTimer, 1000)
      };
    },1000);
  }
};

var Powers = {
  activeScoreMultiplier: false,
  activeProtestors: false,

  scoreMultiplier: function() {
    this.activeScoreMultiplier = true;
    PowerUpCounter.startCounter();
    return 1000;
  },
  slowDown: function() {
    PowerUpCounter.startCounter();
    return 2000;
  },
  speedUp: function() {
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
  },
  showProtestors: function() {
    this.activeProtestors = true;
    PowerUpCounter.startCounter();
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
      Powers.activeProtestors = false;
      $("#pointsX2, #timeSlow, #speedUp, #randomProtestors").removeClass("pointGain");
      $("#pointsX2, #timeSlow, #speedUp, #randomProtestors").removeClass("pointLose");
      console.log(this.counter);
      console.log(Powers.activeScoreMultiplier);
    } else {
      this.counter ++;
    }
  }
};

var Player = {
  name: '',
  partyAffiliation: ''
};

var PointDisplay = {
  position: 455,
  changePosition: function() {
    if(Game.score <= 0 && Game.score >= -20) {
      this.position = 455 - (Game.score*(-25));
      console.log("loser!");
      console.log(this.position);
    } else if (Game.score > 0 && Game.score <= 75){
      this.position = 455 + Math.ceil(Game.score*6.66);
      console.log("winner!");
      console.log(this.position);
    }
    $("#scoreBar img").css("left", this.position);
  }
};

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
  };

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
    $(".col-md-4 img").removeClass("clicked");
    $(".col-md-4 img").removeClass("pointGain");
    $(".col-md-4 img").removeClass("pointLose");
    PointDisplay.changePosition();
  };

  var getPowerUp = function(speed) {
    var randomIndex = Math.ceil(Math.random()*6);
    var speed = speed;

    switch (randomIndex) {
      case 1:
        this.speed = Powers.showProtestors();
        $("#randomProtestors").addClass("pointLose");
        break;
      case 2:
        this.speed = Powers.slowDown();
        $("#timeSlow").addClass("pointGain");
        break;
      case 3:
        this.speed = Powers.extraPoints();
        $("#extraPoints").addClass("pointGain");
        break;
      case 4:
        this.speed = Powers.scoreMultiplier();
        $("#pointsX2").addClass("pointGain");
        break;
      case 5:
        this.speed = Powers.speedUp();
        $("#speedUp").addClass("pointLose");
        break;
      default:
        this.speed = Powers.losePoints();
        $("#losePoints").addClass("pointLose");
        break;
    };

    resetImages();
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
    // END GAME CONDITIONS
    if (Timer.currentTime < 0 || Game.score <= -20 || Game.score >= 75){
      $("#ggContainer").toggleClass("hidden");
      $("#gameContainer").toggleClass("hidden");
      $(".finalScore").text(Game.score);
      if (Game.score <= 0){
        $(".WL").text("YOU LOSE!");
        $("#losePic").show();
      } else {
        $(".WL").text("YOU WIN!");
        $("#winPic").show();
      }
    } else {
      if (branchIndex === "powerUp") {
        getPowerUp(speed);
      } else {
        Game.setScore(branchIndex);
        resetImages();
        if (Timer.currentTime >= 0) interval(speed);
      };
    };
  };

  var interval = function(speed) {
    var randomBoxNumber = 0;
    var randomDisplayIndex = 0;
    var showInnards = undefined;

    randomBoxNumber = Math.ceil(Math.random()*9);
    randomDisplayIndex = Math.ceil(Math.random()*10);

    $(".score").text(Game.score);
    $(".col-md-4 img").addClass("hidden");
    $(".col-md-4").removeClass("pointLose");
    $(".col-md-4").removeClass("pointGain");


    if (randomDisplayIndex > 0 && randomDisplayIndex < 5) {
      $("#s" + randomBoxNumber).children("img." + Game.hero).removeClass("hidden");
    } else if (randomDisplayIndex > 4 && randomDisplayIndex< 9) {
      $("#s" + randomBoxNumber).children("img." + Game.villain).removeClass("hidden");
    } else {
      $("#s" + randomBoxNumber).children("img.random").removeClass("hidden");
    };

    if (Powers.activeProtestors) {

      var protestorBoxNumbers = [];

      protestorBoxNumbers.push(Math.ceil(Math.random()*9));
      protestorBoxNumbers.push(Math.ceil(Math.random()*9));
      protestorBoxNumbers.push(Math.ceil(Math.random()*9));
      protestorBoxNumbers.push(Math.ceil(Math.random()*9));
      protestorBoxNumbers.push(Math.ceil(Math.random()*9));
      protestorBoxNumbers.push(Math.ceil(Math.random()*9));
      protestorBoxNumbers.push(Math.ceil(Math.random()*9));

      for (var i = 0; i < protestorBoxNumbers.length; i ++) {
        if (protestorBoxNumbers[i] === randomBoxNumber) {
          protestorBoxNumbers.splice(i, 1);
        };
      };

      protestorBoxNumbers.forEach(function(boxNumber) {
        $("#s" + boxNumber).children("img.protestor").removeClass("hidden");
      });
    };

    setTimeout(function() {
      $("#extraPoints").removeClass("pointGain");
      $("#losePoints").removeClass("pointLose");
      checkStatus(randomBoxNumber, speed);
    }, speed);

  };

  var startGame = function() {

    newGame = true;
    resetImages();
    $(".col-md-4 img").addClass("hidden");
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
    newGame = true;
    if ($("#obamaHero").hasClass("hidden") && $("#trumpHero").hasClass("hidden")){
      alert("Please choose a hero.");
    } else {
      $(this).parent().toggleClass("hidden");
      $("#gameContainer").toggleClass("hidden");
      startGame();
    };
  });
  $("#playAgain").click(function(){
    location.reload();
  });
});
