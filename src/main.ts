import * as Phaser from 'phaser'

class PlaygroundScene extends Phaser.Scene {

}

new Phaser.Game({
  parent: 'phaser-playground',
  type: Phaser.WEBGL,
  width: 800,
  height: 600,
  scale: {
    mode: Phaser.Scale.ScaleModes.FIT
  },
  scene: new PlaygroundScene({})
})