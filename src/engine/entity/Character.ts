import Entity from './Entity';
import { Assets, AnimatedSprite, Rectangle, Texture, BaseTexture } from 'pixi.js';

export default class Character extends Entity {
  private keys: { [key: string]: boolean } = {};
  private sprite: any;
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
          name: 'load-screen',
          assets: [
            { alias: 'background', src: 'assets/character/idle.png' },
            { alias: 'json', src: 'assets/character/sprite.json' },
          ],
        },
      ],
    };

    await Assets.init({ manifest });
  }

  async draw(stage: any) {
    await Assets.loadBundle('load-screen');

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
    if (this.keys['ArrowLeft']) {
      this.sprite.x -= this.walkingSpeed * delta;
      if (this.sprite.scale.x > 0) this.flipSprite();
    }

    if (this.keys['ArrowRight']) {
      this.sprite.x += this.walkingSpeed * delta;
      if (this.sprite.scale.x < 0) this.flipSprite();
    }
  }
}
