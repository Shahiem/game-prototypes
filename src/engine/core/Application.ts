import { Application } from 'pixi.js';
import { Viewport } from 'pixi-viewport';
import { Renderer } from '@pixi/core';
import config from '../config';
import Game from '../Game';
import Assets from './AssetManager';

export default class GameApplication extends Application {
  private static viewport: Viewport;

  private game: Game;
  private config: typeof config;

  constructor() {
    super(config.view);

    Assets.renderer = this.renderer as Renderer;

    this.game = new Game(this.view);
    this.config = config;

    this.setupViewport();
    this.initGame();
  }

  async initGame() {
    GameApplication.viewport.addChild(this.game);
    await this.game.start();
  }

  private setupViewport() {
    const viewport = new Viewport({
      screenWidth: this.config.view.width,
      screenHeight: this.config.view.height,
      worldWidth: this.config.game.width,
      worldHeight: this.config.game.height,
      interaction: this.renderer.plugins.interaction,
    });

    window.onresize = () => this.onResize.bind(this);
    this.stage.addChild(viewport);

    if (this.config.game.drag) viewport.drag();
    if (this.config.game.pinch) viewport.pinch();
    if (this.config.game.wheel) viewport.wheel();
    if (this.config.game.decelerate) viewport.decelerate();

    GameApplication.viewport = viewport;
  }

  public onResize(width = this.config.view.width, height = this.config.view.height) {
    this.game.onResize();
  }

}

