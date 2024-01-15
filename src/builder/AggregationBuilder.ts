export enum SortStatus {
  TOP_DOWN = 1,
  BOTTON_UP = -1,
}

interface Stage {
  [key: string]: unknown;
}

interface SortStage {
  [key: string]: SortStatus;
}

interface MatchStage extends Stage {}

interface GroupStage extends Stage {
  _id: string;
}

interface ProjectStage extends Stage {}

export class MonkBuildAggregate {
  private stages: any[];

  constructor() {
    this.stages = [];
  }

  match(query: MatchStage): MonkBuildAggregate {
    this.stages.push({ $match: query });
    return this;
  }

  group(stage: GroupStage): MonkBuildAggregate {
    this.stages.push({ $group: stage });
    return this;
  }

  project(stage: ProjectStage): MonkBuildAggregate {
    this.stages.push({ $project: stage });
    return this;
  }

  sort(stage: SortStage): MonkBuildAggregate {
    this.stages.push({ $sort: stage });
    return this;
  }

  build(): any[] {
    return this.stages;
  }
}