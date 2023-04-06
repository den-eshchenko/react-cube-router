import { setRotationStyleProperty } from "../../utils/setRotationStyleProperty"
import { setSizeStyleProperty } from "../../utils/setSizeStyleProperty"
import { IRotateStrategy } from "./mainRotateStrategy"

const stepOne = () => {
  document.documentElement.style.setProperty("--window-width", `${window.innerHeight}px`);
  document.documentElement.style.setProperty("--window-height", `${window.innerHeight}px`);
}
const stepTwo = () => {}
const stepThree = () => {
  document.documentElement.style.setProperty("--window-width", `${window.innerWidth}px`);
  document.documentElement.style.setProperty("--window-height", `${window.innerHeight}px`);
}

function* generateSteps() {
  yield stepOne()
  yield stepTwo()
  return stepThree()
}

export class RotateScaleStrategy implements IRotateStrategy {
  label = 'rotate after scale'
  steps = generateSteps()

  rotate(props: Parameters<IRotateStrategy['rotate']>[0]) {
    const { scale } = props
    setSizeStyleProperty(scale)
    this.steps = generateSteps()
  }

  handleTransitionEnd({ event, side, cubeRef, containerRef }: Parameters<IRotateStrategy['handleTransitionEnd']>[0]) {
    event.stopPropagation();
    
    // уменьшение, поворот, увеличение
    // анимация после уменьшения куба
    if (event.target === containerRef) {
      setRotationStyleProperty(`/${side}`);
      this.steps.next()
    }

    // анимация после поворота куба
    if (event.target === cubeRef) {
      setSizeStyleProperty('1, 1, 1');
    }
  }
}