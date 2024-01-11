import Entity from './Entity';
import { Assets, AnimatedSprite, Rectangle, Texture, BaseTexture } from 'pixi.js';

export default class Character extends Entity {
  assets: any[] = [];

  constructor() {
    super();
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
    animatedSprite.scale.set(2);
    animatedSprite.play();

    stage.addChild(animatedSprite);
  }

  public update(delta: number) {
  }
}
