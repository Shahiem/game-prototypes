import { Rectangle, Texture, BaseTexture } from "pixi.js";

interface FrameSpecification {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function createFrames(baseTexture: BaseTexture, frameSpecifications: FrameSpecification[]): Texture[] {
  const frames: Texture[] = [];

  frameSpecifications.forEach(spec => {
    const frame = new Texture(baseTexture, new Rectangle(spec.x, spec.y, spec.width, spec.height));
    frames.push(frame);
  });

  return frames;
}
