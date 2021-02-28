/*
 * Extra typings definitions
 */

declare module '*.json';

// SystemJS module definition
declare var module: NodeModule;

interface NodeModule {
  id: string;
}

interface Array<T> {
  shuffle(): Array<T>;
}

interface Screen {
  lockOrientation?: ScreenOrientation;
  mozLockOrientation?: ScreenOrientation;
  msLockOrientation?: ScreenOrientation;
}

declare module 'o9n' {
  export interface O9n {
    getOrientation: () => ScreenOrientation;
    orientation: ScreenOrientation;
    install: () => void;
  }

  const o9n: O9n;
  export default o9n;
}

/// <reference path="node.d.ts"/>

interface Window {
  opera?: string;
  isMobile: () => boolean;
  getMobileOperatingSystem: () => 'winphone' | 'android' | 'ios' | '';
}
