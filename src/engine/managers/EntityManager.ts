export default class EntityManager {
  entities: any[];

  constructor() {
    this.entities = [];
  }

  add(entity: any) {
    this.entities.push(entity);
  }

  preload() {
    for (const entity of this.entities) {
      entity.preload();
    }
  }

  update(delta: number) {
    for (const entity of this.entities) {
      entity.update(delta);
    }
  }

  draw(stage) {
    for (const entity of this.entities) {
      entity.draw(stage);
    }
  }
}