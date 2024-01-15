import { Functions } from './../builder/Functions'

describe('Functions', () => {
  describe('between', () => {
    test('inclusive range', () => {
      expect(Functions.between('1', '5')).toEqual({ $gte: '1', $lte: '5' });
    });

    test('exclusive range', () => {
      expect(Functions.between('1', '5', false)).toEqual({ $gt: '1', $lt: '5' });
    });
  });

  describe('add', () => {
    test('add values', () => {
      expect(Functions.add([1, 2, 3])).toEqual({ $add: [1, 2, 3] });
    });
  });

  describe('Exists', () => {
    test('it exists', () => {
      expect(Functions.itExist()).toEqual({ $exists: true });
    });
    test('it does not exist', () => {
      expect(Functions.itNotExist()).toEqual({ $exists: false });
    });
  });

  describe('round', () => {
    test('round value', () => {
      expect(Functions.round('field', 2)).toEqual({ $round: ['field', 2] });
    });
  });

  describe('multiply', () => {
    test('multiply values', () => {
      expect(Functions.multiply([2, 3, 4])).toEqual({ $multiply: [2, 3, 4] });
    });
  });

  describe('sum', () => {
    test('sum values', () => {
      expect(Functions.sum([1, 2, 3])).toEqual({ $sum: [1, 2, 3] });
    });
  });

  describe('absolute', () => {
    test('absolute value', () => {
      expect(Functions.absolute(-5)).toEqual({ $abs: -5 });
    });
  });
});
