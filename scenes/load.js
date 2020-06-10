/*
 * @Author: your name
 * @Date: 2020-06-10 11:44:31
 * @LastEditTime: 2020-06-10 17:35:33
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
    this.load.image('star', 'particles/star1.png');
    this.load.image('bomb', 'particles/bomb64.png');
    this.load.image('ground', 'skies/ground.png');
    this.load.spritesheet('dude',
      'sprites/dude.png', {
        frameWidth: 32,
        frameHeight: 48
      }
    );
  }

  create() {
    this.load.image('ground', 'skies/ground.png');
    // this.add.image(400, 300, 'sky');//全图，以中心点算或者下面👇那种方法

    this.add.image(0, 0, 'sky').setOrigin(0, 0) //全图

    // <1>
    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(400, 600, 'ground').setScale(1.2).refreshBody();
    this.platforms.create(100, 300, 'ground').setScale(0.5).refreshBody();
    this.platforms.create(400, 350, 'ground').setScale(0.5).refreshBody();
    this.platforms.create(750, 420, 'ground').setScale(0.2).refreshBody();

    // <2>创建精灵
    this.player = this.physics.add.sprite(100, 450, 'dude')
    this.player.setBounce(0.2) //回弹
    this.player.setCollideWorldBounds(true) //不超过边缘

    // <3>创建动画
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', {
        start: 0,
        end: 3
      }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [{
        key: 'dude',
        frame: 4
      }],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', {
        start: 5,
        end: 8
      }),
      frameRate: 10,
      repeat: -1
    });

    //<4>创建物理系统
    this.player.body.setGravityY(50) //下落重力 下落的快慢

    //<5>检测精灵是否碰撞到platforms

    this.physics.add.collider(this.player, this.platforms);

    //<6>创建键盘光标
    this.cursors = this.input.keyboard.createCursorKeys();

    //<7>创建星星
    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: {
        x: 12,
        y: 0,
        stepX: 60
      }
    });

    this.stars.children.iterate(function (child) {

      child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.2)); //所有星星随机反弹

    });

    //<8>检测星星是否碰撞到platforms
    this.physics.add.collider(this.stars, this.platforms);

    //<9>检测玩家是否与星星重叠时执行的方法
    let collectStar = (player, star) => {

      //隐藏星星
      star.disableBody(true, true);

      //计算分数
      this.score += 10;
      this.scoreText.setText('分数: ' + this.score);

      //什么时候放炸弹
      if (this.stars.countActive(true) === 0) {
        this.stars.children.iterate(function (child) {

          child.enableBody(true, child.x, 0, true, true);

        });

        let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        let bomb = this.bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

      }
    }

    this.physics.add.overlap(this.player, this.stars, collectStar, null, this); //collectStar这个是回调函数

    //<10>文本
    this.score = 0;
    this.scoreText = this.add.text(16, 16, '分数: 0', {
      fontSize: '32px',
      fill: '#fff'
    });

    //<11>
    let hitBomb = (player, bomb) => {
      this.physics.pause();

      player.setTint(0xff0000);

      player.anims.play('turn');

      this.gameOver = true;
    }
    this.bombs = this.physics.add.group();

    this.physics.add.collider(this.bombs, this.platforms); //bombs是否碰撞到platforms

    this.physics.add.collider(this.player, this.bombs, hitBomb, null, this); //player是否碰撞到bombs,这是回调函数hitBomb

  }

  //页面刷新循环
  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160); //向左的速度

      this.player.anims.play('left', true); //向左的动画
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);

      this.player.anims.play('right', true);
    } else {
      this.player.setVelocityX(0);

      this.player.anims.play('turn');
    }

    //this.player.body.touching.down 检测是否和地面有接触
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }
}