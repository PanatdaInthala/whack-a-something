var Game = {
  score: 0,
  hero: '',
  villain: '',
  speedModifier: 1,

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

var startGame = function() {
  Game.reset();

};

var continueGame = function() {

};

Square.prototype.setVillainImage = function(image) {
  this.villainImage = image;
};

Square.prototype.setHeroImage = function(image) {
  this.heroImage = image;
},


$(document).ready(function() {
  console.log("reading javascript");
  $(".initHidden").toggleClass("hidden");

  $("#startGame1").click(function() {
    $(this).parent().parent().toggleClass("hidden");
    $("#pickContainer").toggleClass("hidden");
  });

  $("#chooseObama").click(function() {
    Game.setHero("Obama");
    Game.setVillain("Trump");
    $("#trumpHero").addClass("hidden");
    $("#obamaVill").addClass("hidden");
    $("#obamaHero").toggleClass("hidden");
    $("#trumpVill").toggleClass("hidden");
  });

  $("#chooseTrump").click(function() {
    Game.setHero("Trump");
    Game.setVillain("Obama");
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
