import Character from '../entity/Character';
import EntityManager from '../managers/EntityManager';
import Scene from './Scene';
import * as PIXI from 'pixi.js';

export default class Play extends Scene {

  public entityManager: any;

  constructor() {
    super();

    this.sortableChildren = true;
    this.sortDirty = true;

    this.entityManager = new EntityManager();

    this.onStart();
  }

  private async onStart() {
    const character = new Character();
    this.entityManager.add(character);
    this.entityManager.preload();
    this.entityManager.draw(this);

    PIXI.Ticker.shared.add((delta: number) => this.entityManager.update(delta));
  }
}