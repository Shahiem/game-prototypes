import GameEnvironment from '../GameEnvironment';
import Character from '../entity/Character';
import NPC from '../entity/NPC';
import Scene from './Scene';
import * as PIXI from 'pixi.js';
export default class Play extends Scene {

  tilemap: any;

  constructor() {
    super();

    this.sortableChildren = true;
    this.sortDirty = true;
    this.onStart();
  }

  private async onStart() {
    GameEnvironment.getGame().viewportManager.setMainStage(this);
    GameEnvironment.getGame().viewportManager.setScale(2);

    const character = new Character();
    const npc = new NPC();

    GameEnvironment.getGame().entityManager.add(character);
    // GameEnvironment.getGame().entityManager.add(npc);

    GameEnvironment.getGame().tilemapManager.createTiles(GameEnvironment.getGame().viewportManager.cameraContainer);

    GameEnvironment.getGame().entityManager.preload();
    GameEnvironment.getGame().entityManager.draw(GameEnvironment.getGame().viewportManager.cameraContainer);

    GameEnvironment.getGame().viewportManager.setCenter();

    PIXI.Ticker.shared.add((delta: number) => GameEnvironment.getGame().entityManager.update(delta));
  }
}