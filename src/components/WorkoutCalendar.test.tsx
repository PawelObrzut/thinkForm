import { describe, expect, it } from 'vitest'
import { dateFormatterYEAR_MONTH_DAY, isSunday, isTheSameDate } from '../utility/dateHelperFunctions'

describe('Date formatter function', () => {
  it('formats dates to YYYY-MM-DD', () => {
    const date = new Date(2020,3,19);
    expect(dateFormatterYEAR_MONTH_DAY(date)).toBe('2020-03-19');
  })
})

describe('IsSunday function', () => {
  it('detects Sundays correctly', () => {
    expect(isSunday(new Date(2026, 0, 25))).toBe(true);
    expect(isSunday(new Date(2026, 0, 26))).toBe(false);
  })
})

describe('IsTheSameDate function', () => {
  it('compares calendar and API dates correctly', () => {
  const date = new Date(2026, 0, 30)
    expect(isTheSameDate(date, '2026-01-30')).toBe(true)
    expect(isTheSameDate(date, '2026-01-31')).toBe(false)
})
})