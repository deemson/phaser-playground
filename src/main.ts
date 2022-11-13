import * as Phaser from 'phaser'
import { PlaygroundScene } from './scene'

new Phaser.Game({
  parent: 'phaser-playground',
  type: Phaser.WEBGL,
  width: 800,
  height: 600,
  scene: new PlaygroundScene({}),
})