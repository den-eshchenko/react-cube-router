export interface IRunRotateProps<Values = any> {
  nextSide: string,
  scale?: string,
  values?: Values
}

export interface IRotateStrategy<Values = any> {
  rotate: (props: { nextSide: string, scale?: string, values?: Values }) => void
  handleTransitionEnd: (props: {
    side: string,
    event: TransitionEvent,
    containerRef: HTMLDivElement | null
    cubeRef: HTMLDivElement | null
  }) => void
}

interface IMainRotateStrategy<Values> {
  strategy: IRotateStrategy
  getStrategy: () => IRotateStrategy
  setStrategy: (strategy: IRotateStrategy) => void
  runRotate: (props: IRunRotateProps<Values>) => void
}

export class MainRotateStrategy<Values = any> implements IMainRotateStrategy<Values> {
  strategy: IRotateStrategy

  constructor(data: { strategy: IRotateStrategy }) {
    this.strategy = data.strategy
  }

  getStrategy() {
    return this.strategy
  }

  setStrategy(strategy: IRotateStrategy) {
    this.strategy = strategy
  }

  runRotate({ nextSide, scale }: IRunRotateProps<Values>) {
    this.strategy.rotate({ nextSide, scale })
  }
}