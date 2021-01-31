import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textSegment',
})
export class TextSegmentPipe implements PipeTransform {
  transform(text: string): string[] {
    return text.split('\n');
  }
}
