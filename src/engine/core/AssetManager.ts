import * as PIXI from 'pixi.js';
import { Assets } from '@pixi/assets';

class AssetManager {
  public renderer: PIXI.Renderer | null = null;
  private _assets: any = {};
  private _images: any = {};
  private _json: any = {};
  private extensions = ['jpeg', 'jpg', 'png'];

  constructor() {
    this.importAssets();
  }

  get images() {
    return this._images;
  }

  get json() {
    return this._json;
  }

  get assets() {
    return this._assets;
  }

  public load(assets = { images: this._images }, progressCallback: (progress: number) => {}) {
    const imagesCount = Object.keys(assets.images || {}).length;

    let loadProgress = 0;
    const calcTotalProgress = (progress: number) => {
      loadProgress += progress;
      progressCallback(parseInt(loadProgress.toString(), 10));
    };

    return Promise.all([
      this.loadImages(assets.images, () => calcTotalProgress(100 / imagesCount)),
    ]);
  }

  public async loadImages(images = {}, progressCallback = (progress: number) => { }) {
    Assets.addBundle('images', images);

    return await Assets.loadBundle('images', (progress: number) => progressCallback(progress));
  }

  public async prepareImages(images = {}, renderer = this.renderer): Promise<any> {
    if (renderer === null) return;

    const prepare = renderer.plugins.prepare;
    for (const [img] of Object.entries(images)) {
      prepare.add(PIXI.Texture.from(img));
    }

    return await prepare.upload(prepare);
  }

  private importAssets() {
    const context = require.context('../../../public/assets/', true, /\.(jpg|png|wav|json)$/im);
    context.keys().forEach((filename: string) => {
      let [, id, ext] = filename.split('.');
      id = id.substring(1);

      const url = context(filename);

      this._assets[id] = url;

      if (ext === 'json') this._json[id] = url;
      if (this.extensions.indexOf(ext) > -1) this._images[id] = url;
    });
  }
}

export default new AssetManager();
