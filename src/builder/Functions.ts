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
    return { $round: [field, decimals ] }
  }

  static multiply(values: unknown[]): { $multiply: unknown[] } {
    return { $multiply: values };
  }
  
  static sum(values: unknown): { $sum: unknown } {
    return { $sum: values };
  }

  static absolute(value: number): { $abs: number }  {
    return { $abs: value }
  }

}
