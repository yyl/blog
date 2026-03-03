const { fillMonthGaps } = require('../assets/js/activity-utils');

describe('fillMonthGaps', () => {
  const fields = ['val1', 'val2'];

  test('returns data as is if empty or single element', () => {
    expect(fillMonthGaps([], fields)).toEqual([]);
    expect(fillMonthGaps(null, fields)).toBe(null);
    const single = [{ month: '2025-01', val1: 10 }];
    expect(fillMonthGaps(single, fields)).toEqual(single);
  });

  test('does not add months if no gaps exist', () => {
    const data = [
      { month: '2025-01', val1: 10, val2: 20 },
      { month: '2025-02', val1: 15, val2: 25 }
    ];
    expect(fillMonthGaps(data, fields)).toEqual(data);
  });

  test('fills a single month gap within the same year', () => {
    const data = [
      { month: '2025-01', val1: 10, val2: 20 },
      { month: '2025-03', val1: 30, val2: 40 }
    ];
    const result = fillMonthGaps(data, fields);
    expect(result).toHaveLength(3);
    expect(result[1]).toEqual({
      month: '2025-02',
      val1: 0,
      val2: 0
    });
  });

  test('fills gaps across year boundaries', () => {
    const data = [
      { month: '2024-12', val1: 12 },
      { month: '2025-02', val1: 2 }
    ];
    const result = fillMonthGaps(data, ['val1']);
    expect(result).toHaveLength(3);
    expect(result[1]).toEqual({
      month: '2025-01',
      val1: 0
    });
  });

  test('fills multiple months and years gap', () => {
    const data = [
      { month: '2024-11', val1: 11 },
      { month: '2025-02', val1: 2 }
    ];
    const result = fillMonthGaps(data, ['val1']);
    expect(result).toHaveLength(4);
    expect(result[1].month).toBe('2024-12');
    expect(result[2].month).toBe('2025-01');
  });

  test('handles large multi-year gap', () => {
    const data = [
      { month: '2023-10', val1: 1 },
      { month: '2025-01', val1: 2 }
    ];
    const result = fillMonthGaps(data, ['val1']);
    // Oct 2023 to Jan 2025:
    // 2023: 10, 11, 12 (3 months)
    // 2024: 01 to 12 (12 months)
    // 2025: 01 (1 month)
    // Total expected: 3 + 12 + 1 = 16
    expect(result).toHaveLength(16);
    expect(result[1].month).toBe('2023-11');
    expect(result[14].month).toBe('2024-12');
    expect(result[15].month).toBe('2025-01');
  });
});
