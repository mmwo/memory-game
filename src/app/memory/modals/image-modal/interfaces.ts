export interface MoveStart {
  active: boolean;
  type: MoveTypes | null;
  position: string | null;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  clientX: number;
  clientY: number;
}

export enum MoveTypes {
  Move = 'move',
  Resize = 'resize',
  Pinch = 'pinch',
}

export interface ImageTransform {
  scale?: number;
  rotate?: number;
  flipH?: boolean;
  flipV?: boolean;
}

export interface ImageCroppedEvent {
  base64?: string | null;
  file?: Blob | null;
  width: number;
  height: number;
  cropperPosition: CropperPosition;
  imagePosition: CropperPosition;
  offsetImagePosition?: CropperPosition;
}

export interface ExifTransform {
  rotate: number;
  flip: boolean;
}
export interface Dimensions {
  width: number;
  height: number;
}

export interface CropperPosition {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}
