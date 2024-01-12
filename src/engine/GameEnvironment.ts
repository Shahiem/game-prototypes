import Splash from './scenes/Splash';
import Play from './scenes/Play';
import Game from './Game';
import { Container } from 'pixi.js';

export default class GameEnvironment extends Container {
  static gameInstance: Game;

  static currentScene: any = null;

  constructor(view: any) {
    super();

    document.body.appendChild(view);
  }

  async start() {
    await Promise.all([
      await this.switchScene(Splash),
      await GameEnvironment.currentScene.finish,
      await this.switchScene(Play),
    ]);
  }

  static getGame() {
    if (GameEnvironment.gameInstance == null) GameEnvironment.gameInstance = new Game();
    return this.gameInstance;
  }

  protected switchScene(constructor: any) {
    this.removeChild(GameEnvironment.currentScene);
    GameEnvironment.currentScene = new constructor();
    this.addChild(GameEnvironment.currentScene);

    return GameEnvironment.currentScene.onCreated();
  }

  public onResize() {
    if (GameEnvironment.currentScene === null) return;
    GameEnvironment.currentScene.onResize();
  }
}
