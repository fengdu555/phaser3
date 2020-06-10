/*
 * @Author: your name
 * @Date: 2020-06-10 11:44:31
 * @LastEditTime: 2020-06-10 16:05:52
 * @LastEditors: Please set LastEditors
 * @Description: 加载场景
 * @FilePath: /github/scenes/load.js
 */
class LoadScene extends Phaser.Scene {
  constructor() {
    super("LoadScene");
  }
  preload() {
    this.load.setBaseURL('assets/');

    this.load.image('sky', 'skies/space3.png');
    this.load.image('logo', 'sprites/phaser3-logo.png');
    this.load.image('red', 'particles/red.png');
    this.load.spritesheet('dude',
      'sprites/dude.png', {
        frameWidth: 32,
        frameHeight: 48
      }
    );
  }
  create() {

    this.add.image(400, 300, 'sky');

    var particles = this.add.particles('red');

    var emitter = particles.createEmitter({
      speed: 100,
      scale: {
        start: 1,
        end: 0
      },
      blendMode: 'ADD'
    });

    var logo = this.physics.add.image(400, 100, 'logo');

    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    emitter.startFollow(logo);
  }
}