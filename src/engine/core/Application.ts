import { Application } from 'pixi.js';
import config from '../config';
import GameEnvironment from '../GameEnvironment';

export default class GameApplication extends Application {

  private game: GameEnvironment;

  constructor() {
    super(config.view);

    this.game = new GameEnvironment(this.view);
    this.initGame();
  }

  async initGame() {
    this.stage.addChild(this.game);
    await this.game.start();
  }

}

