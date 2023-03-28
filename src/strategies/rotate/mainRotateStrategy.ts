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
  currentSide: string
  getStrategy: () => IRotateStrategy
  setStrategy: (strategy: IRotateStrategy) => void
  runRotate: (props: IRunRotateProps<Values>) => void
}

export class MainRotateStrategy<Values = any> implements IMainRotateStrategy<Values> {
  strategy: IRotateStrategy
  currentSide: string

  constructor(data: { strategy: IRotateStrategy }) {
    this.strategy = data.strategy
    this.currentSide = '/front_side'
  }

  getStrategy() {
    return this.strategy
  }

  setStrategy(strategy: IRotateStrategy) {
    this.strategy = strategy
  }

  setCurrentSide(nextSide: string) {
    this.currentSide = nextSide
  }

  runRotate({ nextSide, scale }: IRunRotateProps<Values>) {
    if (this.currentSide !== nextSide) {
      this.setCurrentSide(nextSide)
      this.strategy.rotate({ nextSide, scale })
    }
  }
}