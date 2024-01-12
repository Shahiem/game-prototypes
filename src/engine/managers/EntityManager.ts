export default class EntityManager {
  public entities: any[];

  constructor() {
    this.entities = [];
  }

  public add(entity: any) {
    this.entities.push(entity);
  }

  public preload() {
    for (const entity of this.entities) {
      entity.preload();
    }
  }

  public update(delta: number) {
    for (const entity of this.entities) {
      entity.update(delta);
    }
  }

  public draw(stage: any) {
    for (const entity of this.entities) {
      entity.draw(stage);
    }
  }
}