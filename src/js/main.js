'use strict';

var PlayScene = require('./play_scene.js');


var BootScene = {
  preload: function () {
    // load here assets required for the loading screen
    this.game.load.image('preloader_bar', 'images/preloader_bar.png');
  },

  create: function () {
    this.game.state.start('preloader');
  }
};


var PreloaderScene = {
  preload: function () {
    this.loadingBar = this.game.add.sprite(0, 240, 'preloader_bar');
    this.loadingBar.anchor.setTo(0, 0.5);
    this.load.setPreloadSprite(this.loadingBar);

    // audio assets
    this.game.load.audio('backgroundMusic', 'audio/local_forecast_elevator.mp3');
    this.game.load.audio('sfxDingAndDoors', 'audio/sfx_elevator_ding_and_doors.mp3');

    // image assets
    this.game.load.image('elevatorDoor1', 'images/door.png');
    this.game.load.image('elevatorDoor2', 'images/door.png');
    this.game.load.image('gameTitle', 'images/title_name.png');
    this.game.load.image('playButton', 'images/play_button.png');
    this.game.load.image('logo', 'images/phaser.png');
  },

  create: function () {
    this.game.state.start('title');
  }
};


var TitleScene = {
  preload: function () {

  },

  create: function () {
    let game = this.game;
    let elevatorDoor1 = game.add.sprite(0, 0, 'elevatorDoor1');
    let elevatorDoor2 = game.add.sprite(400, 0, 'elevatorDoor2');

    let gameTitle = game.add.sprite(game.world.centerX - 200, game.world.centerY - 100, 'gameTitle');
    gameTitle.alpha = 0;

    let playButton = game.add.sprite(game.world.centerX - 50, game.world.centerY + 100, 'playButton');
    playButton.alpha = 0;
    playButton.inputEnabled = true;
    playButton.events.onInputDown.add(listener, this);




    function listener() {
      let sfxDingAndDoors = game.add.audio('sfxDingAndDoors');
      sfxDingAndDoors.onDecoded.add(function () {
        sfxDingAndDoors.fadeIn(0, false);
      }, this);

      game.add.tween(elevatorDoor1).to({ x: -400 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
      game.add.tween(elevatorDoor2).to({ x: 800 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
      game.add.tween(gameTitle).to({ alpha: 0 }, 0, Phaser.Easing.Linear.None, true, 0, 0, false);
      game.add.tween(playButton).to({ alpha: 0 }, 0, Phaser.Easing.Linear.None, true, 0, 0, false);
      setTimeout(() => {
        game.state.start('play');
      }, 2000);
      //this.game.state.start('play');
    }

    //sprite.anchor.setTo(0.5, 0.5);


    //to(properties, duration, ease, autoStart, delay, repeat, yoyo) 
    game.add.tween(gameTitle).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);
    game.add.tween(playButton).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 0, false);




    // this moves to the next scene (play scene)
    //this.game.state.start('play');
  }
};


window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

  game.state.add('boot', BootScene);
  game.state.add('preloader', PreloaderScene);
  game.state.add('title', TitleScene);
  game.state.add('play', PlayScene);

  game.state.start('boot');
};
