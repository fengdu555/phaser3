/*
 * @Author: your name
 * @Date: 2020-06-10 11:37:37
 * @LastEditTime: 2020-06-10 11:41:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /github/phaser3-html/config/index.js
 */ 
let gameOptions = {

  // 平台速度范围，以每秒像素为单位
  platformSpeedRange: [300, 300],

  // 山地速度，以像素/秒为单位
  mountainSpeed: 80,

  // 生成范围，离右边缘最右边的平台应该多远
  // 在下一个平台生成之前，以像素为单位
  spawnRange: [80, 300],

  // 平台宽度范围（以像素为单位）
  platformSizeRange: [90, 300],

  // 最右边平台与要产生的下一个平台之间的高度范围
  platformHeightRange: [-5, 5],

  // 要乘以platformHeightRange的比例
  platformHeighScale: 20,

  // 平台的最大和最小高度，以屏幕高度比例表示
  platformVerticalLimit: [0.4, 0.8],

  // 玩家重力
  playerGravity: 900,

  // 玩家跳力
  jumpForce: 400,

  // 玩家起始X位置
  playerStartPosition: 200,

  // 允许连续跳跃
  jumps: 2,

  // 硬币出现在平台上的概率百分比
  coinPercent: 25,

  // 平台上发生火灾的可能性的百分比
  firePercent: 25
}