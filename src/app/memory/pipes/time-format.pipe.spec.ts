import { TimeFormatPipe } from './time-format.pipe';

describe('TimeFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new TimeFormatPipe();
    expect(pipe).toBeTruthy();
  });
  it('should return formatted time string', () => {
    const data = [
      { number: 1, formatted: '00:00:01' },
      { number: 14, formatted: '00:00:14' },
      { number: 59, formatted: '00:00:59' },
      { number: 60, formatted: '00:01:00' },
      { number: 61, formatted: '00:01:01' },
      { number: 99, formatted: '00:01:39' },
      { number: 3599, formatted: '00:59:59' },
      { number: 3600, formatted: '01:00:00' },
      { number: 3601, formatted: '01:00:01' },
      { number: 3660, formatted: '01:01:00' },
      { number: 3661, formatted: '01:01:01' },
      { number: 3700, formatted: '01:01:40' },
      { number: 7199, formatted: '01:59:59' },
      { number: 7200, formatted: '02:00:00' },
    ];
    const pipe = new TimeFormatPipe();

    for (const testCase of data) {
      expect(pipe.transform(testCase.number)).toBe(testCase.formatted);
    }
  });
});
