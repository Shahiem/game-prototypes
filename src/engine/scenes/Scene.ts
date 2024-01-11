import Assets from '../core/AssetManager';
import { Container } from 'pixi.js';

export default class Scene extends Container {
  constructor() {
    super();
  }

  public onResize(width: number, height: number) {

  }

  public async preload({ images }: { images?: string[] } = {}): Promise<void> {
    await Assets.load({ images }, this.onLoadProgress.bind(this));
    await Assets.prepareImages(images);
  }

  public onLoadProgress(progress: number): any {
  }

  public onCreated() {
    return this.preload();
  }

  get finish() {
    return Promise.resolve();
  }
}