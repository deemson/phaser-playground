import * as Phaser from 'phaser'

class PlaygroundScene extends Phaser.Scene {

}

const playgroundGameConfig: Phaser.Types.Core.GameConfig = {
  parent: 'phaser-playground',
  type: Phaser.WEBGL,
  width: 100,
  height: 100,
  scale: {
    zoom: 4,
    autoCenter: Phaser.Scale.Center.CENTER_HORIZONTALLY,
    mode: Phaser.Scale.ScaleModes.NONE
  },
  pixelArt: true,
  scene: new PlaygroundScene({})
}

new Phaser.Game(playgroundGameConfig)