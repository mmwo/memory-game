import { TextSegmentPipe } from '@app/memory/pipes/text-segment.pipe';

describe('textSegmentPipe', () => {
  let pipe: TextSegmentPipe;
  beforeEach(() => {
    pipe = new TextSegmentPipe();
  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return formatted time string', () => {
    const data = [
      { before: 'tekst', formatted: ['tekst'] },
      { before: 'tekst\ntekst', formatted: ['tekst', 'tekst'] },
      { before: 'telst\nt\nt', formatted: ['telst', 't', 't'] },
      { before: '\ntekst\n', formatted: ['', 'tekst', ''] },
      { before: '\ntekst', formatted: ['', 'tekst'] },
      { before: 'tekst\n', formatted: ['tekst', ''] },
    ];

    for (const testCase of data) {
      expect(pipe.transform(testCase.before)).toEqual(testCase.formatted);
    }
  });
});
