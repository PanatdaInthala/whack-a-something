var Game = {
  score: 0,
  hero: '',
  villain: '',
  speedModifier: 1,
  intervalPoint: 0,
  randomBoxNumber: 0,

  setScore: function(score) {
    console.log("score effected: " + score);
    score = parseInt(score) || 0;
    this.score += score;
    $(".score").text(this.score);
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
  endGame: function() {

  }
};

var Timer = {
  currentTime: 60,
  intervalController: null,
  setTime: function() {
    this.currentTime--;
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
    // console.log('ready');
    $('#step').click(function() {
      interval()
    });

    var assignGameClicks = function(hero) {
      // console.log('clicks');

      if (hero === "obama") {
        $(".trump").click(function() {
          if ($(this).hasClass("clicked")) {
            // console.log("no points for you, you already points");
            return;
          }
          Game.setScore(1);
          $(this).parent().addClass("pointGain");
          $(this).addClass("clicked");
        });
        $(".obama").click(function() {
          if ($(this).hasClass("clicked")) {
            // console.log("no points for you, you already points");
            return;
          }

          Game.setScore(-1);
          $(this).parent().addClass("pointLose");
          $(this).addClass("clicked");
        });
      } else {
        $(".obama").click(function() {
          if ($(this).hasClass("clicked")) {
            // console.log("no points for you, you already points");
            return;
          }

          Game.setScore(1);
          $(this).parent().addClass("pointGain");
          $(this).addClass("clicked");
        });
        $(".trump").click(function() {
          if ($(this).hasClass("clicked")) {
            // console.log("no points for you, you already points");
            return;
          }

          Game.setScore(-1);
          $(this).parent().addClass("pointLose");
          $(this).addClass("clicked");
        });
      };
      // $(".random").click(function() {
      //   getPower();
      // })
    };

    var checkIfClicked = function() {
      var currentBox = $("#s" + Game.randomBoxNumber);
      if (currentBox.length === 0) return 0;
      var clicked = currentBox.find(`.${Game.villain}.clicked`).length > 0;
      var hidden = currentBox.find(`.${Game.villain}.hidden`).length > 0;
      if (!clicked && !hidden) return -1
      else return 0



      //if (Game.hero === "obama") {
      // No gaurantee these IFs will ever run. Needs an else, or a default return at the bottom
      //  var trump_clicked = currentBox.find(".trump").hasClass("clicked");
      //  var trump_hidden = currentBox.find(".trump.hidden").length > 0;
      //  if (!trump_clicked && !trump_hidden) {
      //    return -1;
      //  };
      //  if (currentBox.find(".obama").hasClass("clicked") === false &&
      //    currentBox.find(".obama").hasClass("hidden") === false) {
      // console.log(1);
      //return 1;
      //  };
      //} else {

      //  if (currentBox.find(".trump").hasClass("clicked") === false &&
      //    currentBox.find(".trump").hasClass("hidden") === false) {
      //    //return 1;
      //  };
      //  if (currentBox.find(".obama").hasClass("clicked") === false &&
      //    currentBox.find(".obama").hasClass("hidden") === false) {
      //    return -1;
      //  };
      //};
      //return 0;
    };

    var resetImages = function() {
      // console.log('resetImages');

      $("img").removeClass("clicked");
      $("img").removeClass("pointGain");
      $("img").removeClass("pointLose");
    };

    // var beginInterval = setInterval(interval, 1000); Unused

    var interval = function() {

      // console.log("interval");
      var randomDisplayIndex = 0;
      var showInnards = undefined;
      Game.setScore(checkIfClicked(Game.randomBoxNumber));

      Game.randomBoxNumber = Math.ceil(Math.random() * 9);
      randomDisplayIndex = Math.ceil(Math.random() * 9);

      $(".time").text(Timer.currentTime);
      $("img").addClass("hidden");
      $(".col-md-4").removeClass("pointLose");
      $(".col-md-4").removeClass("pointGain");



      if (randomDisplayIndex > 0 && randomDisplayIndex < 5) {
        $("#s" + Game.randomBoxNumber).children("img." + Game.hero).removeClass("hidden");
      } else if (randomDisplayIndex > 4 && randomDisplayIndex < 9) {
        $("#s" + Game.randomBoxNumber).children("img." + Game.villain).removeClass("hidden");
      } else {
        $("#s" + Game.randomBoxNumber).children("img.random").removeClass("hidden");
      };

      resetImages();
      Timer.setTime();

      if (Timer.currentTime < 0) {
        clearInterval(Timer.intervalController); // Cancel the interval by clearing it, using the reference you set earlier.
        Game.endGame(); // Need to fill out what should happen in the Game objects endGame method
      }
    };


    var startGame = function() {
      // console.log('startGame');

      $("img").addClass("hidden");
      Game.reset();
      assignGameClicks(Game.hero);
      Timer.intervalController = setInterval(interval, 1000); // Capture reference to the interval so that you can cancel it later;
    };

    $(".initHidden").toggleClass("hidden");

    $("#startGame1").click(function() {
      // console.log('startGame1');

      $(this).parent().parent().toggleClass("hidden");
      $("#pickContainer").toggleClass("hidden");
    });

    $("#chooseObama").click(function() {
      // console.log('chooseObama');

      Game.setHero("obama");
      Game.setVillain("trump");
      $("#trumpHero").addClass("hidden");
      $("#obamaVill").addClass("hidden");
      $("#obamaHero").toggleClass("hidden");
      $("#trumpVill").toggleClass("hidden");
    });

    $("#chooseTrump").click(function() {
      // console.log('chooseTrump');

      Game.setHero("trump");
      Game.setVillain("obama");
      $("#obamaHero").addClass("hidden");
      $("#trumpVill").addClass("hidden");
      $("#trumpHero").toggleClass("hidden");
      $("#obamaVill").toggleClass("hidden");
    });

    $("#startGame2").click(function() {
      // console.log('startGame2');

      if ($("#obamaHero").hasClass("hidden") && $("#trumpHero").hasClass("hidden")) {
        alert("Please choose a hero.");
      } else {
        $(this).parent().toggleClass("hidden");
        $("#gameContainer").toggleClass("hidden");
        startGame();
      };
    });

  });
