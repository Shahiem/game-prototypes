import * as PIXI from 'pixi.js';
import Assets from '../core/AssetManager';
import Scene from './Scene';
import config from '../config';

export default class Splash extends Scene {
  private loadingNumber: any;
  private loadingContent: any;
  private config: { hideDelay: number; };
  private loadingProgress: PIXI.Graphics | undefined;
  private loadingProgressBar: PIXI.Graphics;

  constructor() {
    super();

    this.config = config.scenes.Splash;

    this.loadingNumber = new PIXI.Text('(0%)', { fontSize: 12, fontWeight: 'bold', fill: 0xf3cbb7 });
    this.loadingContent = new PIXI.Text('Please wait, game is loading...', { fontSize: 12, fill: 0xf3cbb7 });

    const loadingFrame = new PIXI.Graphics();
    loadingFrame.beginFill(0xaf744f);
    loadingFrame.drawRoundedRect(0, 0, 294, 31, 2);

    const loadingFrameBorder = new PIXI.Graphics();
    loadingFrameBorder.beginFill(0x8b5942);
    loadingFrameBorder.drawRoundedRect(1, 1, 292, 29, 2);
    loadingFrame.addChild(loadingFrameBorder)

    this.loadingProgressBar = new PIXI.Graphics()
      .beginFill(0x50241a)
      .drawRoundedRect(4, 4, 286, 24, 2);

    loadingFrameBorder.addChild(this.loadingProgressBar);

    loadingFrame.x = (window.innerWidth - loadingFrame.width) / 2;
    loadingFrame.y = (window.innerHeight - loadingFrame.height) / 2;

    this.loadingContent.x = loadingFrame.x;
    this.loadingContent.y = loadingFrame.y - 30;

    this.loadingNumber.position.set(loadingFrame.x, loadingFrame.y - 30);
    this.loadingNumber.position.set(loadingFrame.x + loadingFrame.width - 35, loadingFrame.y - 30);

    this.addChild(this.loadingNumber, this.loadingContent, loadingFrame);
  }

  get finish(): Promise<void> {
    return new Promise((res) => setTimeout(res, this.config.hideDelay));
  }

  preload() {
    let images: any = {

    };

    return super.preload({ images });
  }

  onResize(width: number, height: number) {
    this.loadingNumber.x = width / 2;
    this.loadingNumber.y = (height / 2);
  }

  async onLoadProgress(val: number) {
    this.loadingProgress = new PIXI.Graphics()
      .beginFill(0x3a1912)
      .drawRoundedRect(4, 4, 2.85 * val, 24, 2);

    this.loadingProgressBar.addChild(this.loadingProgress);
    this.loadingNumber.text = `(${val}%)`;
  }
}