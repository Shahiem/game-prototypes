import * as PIXI from 'pixi.js';

export default class ViewportManager {
  cameraContainer: PIXI.Container<PIXI.DisplayObject>;
  cameraPosition: PIXI.Point;

  constructor() {
    this.cameraContainer = new PIXI.Container();
    this.cameraPosition = new PIXI.Point(0, 0);
  }

  public setMainStage(stage: PIXI.Container) {
    stage.addChild(this.cameraContainer);
  }

  public setScale(scale: number) {
    this.cameraContainer.scale.set(scale);
  }

  public setCenter() {
    const cameraWidth = this.cameraContainer.getBounds().width * this.cameraContainer.scale.x;
    const cameraHeight = this.cameraContainer.getBounds().height * this.cameraContainer.scale.y;

    this.cameraPosition.x = (window.innerWidth - cameraWidth) / 2;
    this.cameraPosition.y = (window.innerHeight - cameraHeight);

    this.cameraContainer.position.set(this.cameraPosition.x, this.cameraPosition.y);
  }

}
