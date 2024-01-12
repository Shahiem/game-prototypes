import GameEnvironment from '../GameEnvironment';
import Entity from './Entity';
import { Assets, AnimatedSprite, Rectangle, Texture, BaseTexture } from 'pixi.js';

export default class Character extends Entity {
  private keys: { [key: string]: boolean } = {};
  private sprite: any;
  private x: number = 0;
  private y: number = 0;
  private walkingSpeed: number = 5;

  constructor() {
    super();

    this.setupKeyboardListeners();
  }

  private setupKeyboardListeners() {
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
    window.addEventListener('keyup', this.handleKeyUp.bind(this));
  }

  private handleKeyDown(event: KeyboardEvent) {
    this.keys[event.key] = true;
  }

  private handleKeyUp(event: KeyboardEvent) {
    this.keys[event.key] = false;
  }

  async preload() {
    const manifest = {
      bundles: [
        {
          name: 'idle',
          assets: [
            { alias: 'background', src: 'assets/character/idle/sprite.png' },
            { alias: 'json', src: 'assets/character/idle/sprite.json' },
          ],
        },
      ],
    };

    await Assets.init({ manifest });
  }

  async draw(stage: any) {
    await Assets.loadBundle('idle');

    const baseTexture = BaseTexture.from('background');
    const frames = [
      new Texture(baseTexture, new Rectangle(5, 13, 17, 34)),
      new Texture(baseTexture, new Rectangle(53, 13, 17, 34)),
    ];

    const animatedSprite = new AnimatedSprite(frames);
    animatedSprite.animationSpeed = 0.05;
    animatedSprite.play();

    this.sprite = animatedSprite;
    stage.addChild(animatedSprite);
  }

  private flipSprite() {
    this.sprite.scale.x *= -1;
  }

  public update(delta: number) {
    if (!this.sprite) return;

    if (this.keys['ArrowLeft']) this.moveLeft(delta);
    if (this.keys['ArrowRight']) this.moveRight(delta);


    // if( GameEnvironment.getGame().tilemapManager.isCollidingWithTile(this.sprite.x + this.sprite.width, this.sprite.y)) {
    //   console.log('bl')
    //   this.sprite.x = this.sprite.x - this.sprite.width;

    // }
  }

  private moveLeft(delta: number) {
    this.sprite.x -= this.walkingSpeed * delta;

    if (this.sprite.getBounds().x < 0) this.sprite.x = 0;
  }

  private moveRight(delta: number) {
    this.sprite.x += this.walkingSpeed * delta;

    const maxX = GameEnvironment.getGame().tilemapManager.getTilemapWidth() - this.sprite.getBounds().width;
    if (this.sprite.getBounds().x > maxX) this.sprite.x = maxX;
  }

}
