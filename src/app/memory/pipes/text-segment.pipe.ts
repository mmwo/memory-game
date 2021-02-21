import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textSegment',
})
export class TextSegmentPipe implements PipeTransform {
  private lines = {
    1: [0],
    2: [0, 16],
    3: [-16, 16, 16],
    4: [-25, 16, 16, 16],
    5: [-30, 16, 16, 16, 16],
    6: [-38, 16, 16, 16, 16, 16],
  };

  transform(textToTransform: string): { text: string; y: number }[] {
    const segments = textToTransform.split('\n').filter(Boolean);
    return segments.map((text, index) => ({ text, y: this.lines[segments.length][index] }));
  }
}
