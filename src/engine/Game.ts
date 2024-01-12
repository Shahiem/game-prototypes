import EntityManager from './managers/EntityManager';
import TilemapManager from './managers/TilemapManager';
import ViewportManager from './managers/ViewportManager';

export default class Game {
  public entityManager: EntityManager;
  public tilemapManager: TilemapManager;
  public viewportManager: ViewportManager;

  constructor() {
    const matrix = [
      [0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];

    this.entityManager = new EntityManager();
    this.viewportManager = new ViewportManager();
    this.tilemapManager = new TilemapManager(matrix, 20);
  }
}
