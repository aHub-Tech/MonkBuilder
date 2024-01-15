import {SortStatus, MonkBuildAggregate } from '../builder/AggregationBuilder';
import { Functions } from '../builder/Functions';
describe('MonkBuildAggregate', () => {
  test('should build match stage correctly', () => {
    const builder = new MonkBuildAggregate();
    const aggregation = builder.match({ organisationId: 'id123' }).build();

    expect(aggregation).toEqual([{ $match: { organisationId: 'id123' } }]);
  });

  test('should build group stage correctly', () => {
    const builder = new MonkBuildAggregate();
    const aggregation = builder
      .group({
        _id: '$test',
        total: 0,
      })
      .build();

    expect(aggregation).toEqual([{ $group: { _id: '$test', 'total': 0 } }]);
  });

  test('should build sort stage correctly', () => {
    const builder = new MonkBuildAggregate();
    const aggregation = builder
      .sort({
        total: SortStatus.TOP_DOWN,
      })
      .build();

    expect(aggregation).toEqual([{ $sort: { total: 1 } }]);
  });

  test('should build project stage correctly', () => {
    const builder = new MonkBuildAggregate();
    const aggregation = builder
      .project({
        _id: 1,
        total: 1,
      })
      .build();

    expect(aggregation).toEqual([{ $project: { _id: 1, total: 1 } }]);
  });

  test('should build aggregation stages correctly', () => {
    const builder = new MonkBuildAggregate();

    const aggregation = builder
      .match({ organisationId: 'exampleId' })
      .match({ date: Functions.between('2023-01-01', '2023-12-31') })
      .match({ 'items.0': Functions.itNotExist() })
      .group({
        _id: '$status',
        total: Functions.sum(
          Functions.multiply(['$totalNet', Functions.add([1, '$vatType.value'])]),
        ),
      })
      .project({
        _id: 1,
        total: Functions.round('$total', 2),
      })
      .build();

    // Add assertions based on your expected output
    expect(aggregation).toEqual([
      { $match: { organisationId: 'exampleId' } },
      { $match: { date: { $gte: '2023-01-01', $lte: '2023-12-31' } } },
      { $match: { 'items.0': { $exists: false } } },
      {
        $group: {
          _id: '$status',
          total: {
            $sum: { $multiply: ['$totalNet', { $add: [1, '$vatType.value'] }] },
          },
        },
      },
      {
        $project: {
          _id: 1,
          total: { $round: ['$total', 2] },
        },
      },
    ]);
  });
});
