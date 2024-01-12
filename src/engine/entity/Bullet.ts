import { Graphics } from 'pixi.js';
import Entity from './Entity'

export default class Bullet extends Entity {
  private graphics: Graphics;
  private speed: number = 5;

  constructor(x: number, y: number) {
    super();

    // TODO: Change to image
    this.graphics = new Graphics();
    this.graphics.beginFill(0xFF0000);

    // TODO: X AND Y based on weapon position
    this.graphics.drawRect(30, 15, 5, 2);
    this.graphics.endFill();

    this.graphics.x = x;
    this.graphics.y = y;
  }

  public update(delta: number) {
    this.graphics.x += this.speed * delta;

    // TODO: Check for collision or boundaries and handle accordingly
    // TODO: Remove the bullet when it goes off-screen
    // if (this.graphics.y < 0) {
    //   this.destroy();
    // }
  }

  public getGraphics(): Graphics {
    return this.graphics;
  }
}
