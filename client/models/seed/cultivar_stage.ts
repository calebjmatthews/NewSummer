export default class CultivarStage implements CultivarStageInterface {
  sprite: string;
  duration: number;

  constructor(stage: CultivarStageInterface) {
    Object.assign(this, stage);
  }
}

interface CultivarStageInterface {
  sprite: string;
  duration: number;
}
