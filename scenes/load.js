/*
 * @Author: your name
 * @Date: 2020-06-10 11:44:31
 * @LastEditTime: 2020-06-10 15:58:37
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
    this.load.image('start', 'particles/x0.png');
    this.load.image('ground', 'skies/ground.png');

  }
  create() {
    // this.add.image(400, 300, 'sky');//全图，以中心点算或者下面👇那种方法

    this.add.image(0, 0, 'sky').setOrigin(0, 0)//全图

    this.add.image(400, 300, 'start')

    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(400, 600, 'ground').setScale(1.2).refreshBody();

    this.platforms.create(100, 100, 'ground').setScale(0.5).refreshBody();
    this.platforms.create(400, 250, 'ground').setScale(0.5).refreshBody();
    this.platforms.create(750, 420, 'ground').setScale(0.2).refreshBody();
  }
}