'use strict';

var PlayScene = {
  create: function () {
      let game = this.game;
      
      let backgroundMusic = game.add.audio('backgroundMusic');
      backgroundMusic.onDecoded.add(function () {
        backgroundMusic.fadeIn(0, true);
      }, this);

    var logo = this.game.add.sprite(
      this.game.world.centerX, this.game.world.centerY, 'logo');
    logo.anchor.setTo(0.5, 0.5);
  }
};

module.exports = PlayScene;
