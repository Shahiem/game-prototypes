import Splash from './scenes/Splash';
import Play from './scenes/Play';
import { Container } from 'pixi.js';

export default class Game extends Container {

  static currentScene: any = null;

  constructor(view: any) {
    super();

    document.body.appendChild(view);
  }

  async start() {
    await Promise.all([
      await this.switchScene(Splash),
      await Game.currentScene.finish,
      await this.switchScene(Play),
    ]);
  }

  static getGame() {
    return this.currentScene;
  }

  protected switchScene(constructor: any) {
    this.removeChild(Game.currentScene);
    Game.currentScene = new constructor();
    this.addChild(Game.currentScene);

    return Game.currentScene.onCreated();
  }

  public onResize() {
    if (Game.currentScene === null) return;
    Game.currentScene.onResize();
  }
}
