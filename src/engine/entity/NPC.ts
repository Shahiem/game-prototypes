import { createFrames } from '../../engine/core/utils';
import Entity from './Entity';
import { Assets, AnimatedSprite, BaseTexture } from 'pixi.js';

export default class Character extends Entity {
  private keys: { [key: string]: boolean } = {};
  private sprite: any;
  private walkingSpeed: number = 5;

  constructor() {
    super();
  }

  async preload() {
    const manifest = {
      bundles: [
        {
          name: 'walking',
          assets: [
            { alias: 'background', src: 'assets/enemy1/walking/sprite.png' },
            { alias: 'json', src: 'assets/enemy1/walking/sprite.json' },
          ],
        },
      ],
    };

    await Assets.init({ manifest });
  }

  async draw(stage: any) {
    const spriteData = await Assets.loadBundle('walking');
    const baseTexture = BaseTexture.from('background');

    const animatedSprite = new AnimatedSprite(createFrames(baseTexture, spriteData.json));
    animatedSprite.animationSpeed = 0.1;
    animatedSprite.play();

    this.sprite = animatedSprite;
    stage.addChild(animatedSprite);
  }

  public update(delta: number) {


  }
}
