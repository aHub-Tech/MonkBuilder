export enum TimeUnit {
  YEAR = 'year',
  QUARTER = 'quarter',
  WEEK = 'week',
  MONTH = 'month',
  DAY = 'day',
  HOUR = 'hour',
  MINUTE = 'minute',
  SECOND = 'second',
  MILISECOND = 'millisecond',
}

export enum TimeDayOfWeek {
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = 'saturday',
  SUNDAY = 'sunday',
}

type RangeToUnion<N extends number, Result extends number[] = []> =
  Result['length'] extends N ? Result[number] : RangeToUnion<N, [...Result, Result['length'] + 1]>;

export class Functions {
  static between(min: string, max: string, isInclusive: boolean = true) {
    if (isInclusive) {
      return { $gte: min, $lte: max };
    }
    return { $gt: min, $lt: max };
  }

  static add(values: unknown[]): { $add: unknown[] } {
    return { $add: values };
  }

  static itExist(): { $exists: boolean } {
    return { $exists: true };
  }

  static itNotExist(): { $exists: boolean } {
    return { $exists: false };
  }

  static round(field: string, decimals: number): { $round: unknown[] } {
    return { $round: [field, decimals] };
  }

  static multiply(values: unknown[]): { $multiply: unknown[] } {
    return { $multiply: values };
  }

  static sum(values: unknown): { $sum: unknown } {
    return { $sum: values };
  }

  static absolute(value: number): { $abs: number } {
    return { $abs: value };
  }

  static addToSet(value: string): { $addToSet: string } {
    return { $addToSet: value };
  }

  static allElementsTrue(value: unknown[]): { $allElementsTrue: unknown[] } {
    return { $allElementsTrue: value };
  }

  static and(value: unknown[]): { $and: unknown[] } {
    return { $and: value };
  }

  static or(value: unknown[]): { $or: unknown[] } {
    return { $or: value };
  }

  static anyElementTrue(value: unknown[]): { $anyElementTrue: unknown[] } {
    return { $anyElementTrue: value };
  }

  static arrayToObject(value: unknown): { $arrayToObject: unknown } {
    return { $arrayToObject: value };
  }

  static avg(value: unknown): { $avg: unknown } {
    return { $avg: value };
  }

  static binarySize(value: string | null): { $binarySize: string | null } {
    return { $binarySize: value };
  }

  static bitAnd(value: unknown[]): { $bitAnd: unknown[] } {
    return { $bitAnd: value };
  }

  static bitOr(value: unknown[]): { $bitOr: unknown[] } {
    return { $bitOr: value };
  }

  static bitNot(value: unknown): { $bitNot: unknown } {
    return { $bitNot: value };
  }

  static bitXor(value: unknown[]): { $bitXor: unknown[] } {
    return { $bitXor: value };
  }

  static bottom(sortBy: unknown[], output: unknown): { $bottom: { sortBy: unknown[]; output: unknown } } {
    return {
      $bottom: {
        sortBy: sortBy,
        output: output,
      },
    };
  }

  static bottomN(
    sortBy: unknown[],
    output: unknown,
    n: unknown,
  ): { $bottom: { sortBy: unknown[]; output: unknown; n: unknown } } {
    return {
      $bottom: {
        sortBy,
        output,
        n,
      },
    };
  }

  static bsonSize(value: unknown): { $bsonSize: unknown } {
    return { $bsonSize: value };
  }

  static ceil(value: number): { $ceil: number } {
    return { $ceil: value };
  }

  static cmp(value: unknown[]): { $cmp: unknown[] } {
    return { $cmp: value };
  }

  static concat(value: unknown[]): { $concat: unknown[] } {
    return { $concat: value };
  }

  static concatArrays(value: unknown[]): { $concat: unknown[] } {
    return { $concat: value };
  }

  static cond(
    ifValue: string,
    thenValue: unknown,
    elseValue: unknown,
  ): { $cond: { if: string; then: unknown; else: unknown } } {
    return { $cond: { if: ifValue, then: thenValue, else: elseValue } };
  }

  static convert(
    input: unknown,
    to: unknown,
    onError?: unknown,
    onNull?: unknown,
  ): { $convert: { input: unknown; to: unknown; onError?: unknown; onNull?: unknown } } {
    return { $convert: { input, to, onError, onNull } };
  }

  static count() {
    return { $count: {} };
  }

  static dateAdd(
    startDate: unknown,
    unit: TimeUnit,
    amount: number | string,
    timezone: string,
  ): { $dateAdd: { startDate: unknown; unit: TimeUnit; amount: number | string; timezone: string } } {
    return { $dateAdd: { startDate, unit, amount, timezone } };
  }

  static dateDiff(
    startDate: unknown,
    endDate: unknown,
    unit: TimeUnit,
    timezone: string,
    startOfWeek?: TimeDayOfWeek,
  ): {
    $dateDiff: {
      startDate: unknown;
      endDate: unknown;
      unit: TimeUnit;
      timezone: string;
      startOfWeek?: TimeDayOfWeek;
    };
  } {
    return { $dateDiff: { startDate, endDate, unit, timezone, startOfWeek } };
  }

  static dateFromParts(
    year: number,
    month?: number,
    day?: number,
    hour?: number,
    minute?: number,
    second?: number,
    millisecond?: number,
    week?: number,
    dayofWeek?: number,
    timezone?: unknown,
    isIso?: boolean,
  ): {
    $dateFromParts:
      | {
          year: number;
          isoWeekYear?: never;
          isoDayOfWeek?: never;
          isoWeek?: never;
          month?: number;
          day?: number;
          hour?: number;
          minute?: number;
          second?: number;
          millisecond?: number;
          timezone?: unknown;
        }
      | {
          year?: never;
          isoWeekYear: number;
          isoDayOfWeek?: number;
          isoWeek?: number;
          month?: number;
          day?: number;
          hour?: number;
          minute?: number;
          second?: number;
          millisecond?: number;
          timezone?: unknown;
        };
  } {
    if (isIso) {
      return {
        $dateFromParts: {
          isoWeekYear: year,
          isoDayOfWeek: dayofWeek,
          isoWeek: week,
          month,
          day,
          hour,
          minute,
          second,
          millisecond,
          timezone,
        },
      };
    }

    return {
      $dateFromParts: {
        year: year,
        month,
        day,
        hour,
        minute,
        second,
        millisecond,
        timezone,
      },
    };
  }


}
