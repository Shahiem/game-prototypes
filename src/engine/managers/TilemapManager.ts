import * as PIXI from 'pixi.js';

export default class TilemapManager {

  private tiles: PIXI.Sprite[][] = [];
  private tileSize: number = 0;
  private matrix: number[][] = [];

  constructor(matrix: number[][], tileSize: number) {
    this.matrix = matrix;
    this.tileSize = tileSize;
  }

  public createTiles(stage: PIXI.Container): void {
    for (let row = 0; row < this.matrix.length; row++) {
      this.tiles[row] = [];

      for (let col = 0; col < this.matrix[row].length; col++) {
        const tileValue = this.matrix[row][col];

        const tile = this.createTile(tileValue, this.tileSize);
        tile.position.set(col * this.tileSize, row * this.tileSize);
        stage.addChild(tile);

        // TODO: Fix typing
        this.tiles[row][col] = { value: tileValue };
      }
    }
  }

  private createTile(tileValue: number, tileSize: number): PIXI.DisplayObject {
    const graphics = new PIXI.Graphics();
    graphics.beginFill(this.getTileColor(tileValue));
    graphics.drawRect(0, 0, tileSize, tileSize);
    graphics.endFill();

    return graphics;
  }

  public getTilemapWidth(): number {
    return this.matrix.length > 0 ? this.matrix[0].length * this.tileSize : 0;
  }

  private getTileColor(tileValue: number) {
    switch (tileValue) {
      case 1:
        return 0xFFFFFF;
    }
  }

  public isCollidingWithTile(x: number, y: number): any | null {
    const col = Math.floor(x / this.tileSize);
    const row = Math.floor(y / this.tileSize);

    if (this.isValidTilePosition(row, col)) return this.tiles[row][col].value > 0;

    return null;
  }

  private isValidTilePosition(row: number, col: number): boolean {
    return row >= 0 && row < this.tiles.length && col >= 0 && col < this.tiles[row].length;
  }

}
