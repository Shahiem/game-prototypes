import GameEnvironment from '../GameEnvironment';
import Entity from './Entity';
import Bullet from './Bullet';
import { Assets, AnimatedSprite, Sprite, Rectangle, Container, Texture, BaseTexture } from 'pixi.js';

export default class Character extends Entity {

  // TODO: Change typing
  private bullets: any[] = [];
  private keys: { [key: string]: boolean } = {};
  private sprite: any;
  private walkingSpeed: number = 5;

  constructor() {
    super();

    // TODO: Move to main class
    window.addEventListener('click', this.handleMouseClick.bind(this));

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
        {
          name: 'weapon',
          assets: [
            { alias: 'background', src: 'assets/character/weapon/sprite.png' },
          ],
        },
      ],
    };

    await Assets.init({ manifest });
  }

  async draw(stage: Container) {
    // TODO: Cleanup, just a  test
    await Assets.loadBundle('idle');

    const baseTexture = BaseTexture.from('background');
    const frames = [
      new Texture(baseTexture, new Rectangle(5, 13, 17, 34)),
      new Texture(baseTexture, new Rectangle(53, 13, 17, 34)),
    ];

    const animatedSprite = new AnimatedSprite(frames);
    animatedSprite.animationSpeed = 0.05;
    animatedSprite.play();

    // Weapon test
    // TODO: Cleanup
    const weapon = await Assets.loadBundle('weapon');
    const test = new Sprite(weapon.background);
    test.x = 10;
    test.y = (animatedSprite.height - test.height) / 2;

    this.sprite = animatedSprite;
    stage.addChild(animatedSprite, test);
  }

  private handleMouseClick(event: MouseEvent) {
    const bullet = new Bullet(this.sprite.x + this.sprite.width / 2, this.sprite.y);
    this.bullets.push(bullet);

    // TODO: Add the bullet graphics to the stage
    GameEnvironment.getGame().viewportManager.cameraContainer.addChild(bullet.getGraphics());
  }

  private flipSprite() {
    this.sprite.scale.x *= -1;
  }

  public update(delta: number) {
    if (!this.sprite) return;

    if (this.keys['ArrowLeft']) this.moveLeft(delta);
    if (this.keys['ArrowRight']) this.moveRight(delta);

    // TODO: in main class
    this.bullets.forEach((bullet) => {
      bullet.update(delta);
    });

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
