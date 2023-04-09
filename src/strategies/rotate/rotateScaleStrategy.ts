import { setRotationStyleProperty } from "../../utils/setRotationStyleProperty"
import { setScaleStyleProperty } from "../../utils/setScaleStyleProperty"
import { setSizeStyleProperty } from "../../utils/setSizeStyleProperty"
import { IRotateStrategy } from "./mainRotateStrategy"

const sizeStepOne = () => {
  setSizeStyleProperty(window.innerHeight, window.innerHeight)
}
const sizeStepTwo = () => {}
const sizeStepThree = () => {
  setScaleStyleProperty('1, 1, 1');
}

function* generateSizeSteps() {
  yield sizeStepOne()
  yield sizeStepTwo()
  return sizeStepThree()
}

const rotateStepOne = (side?: string) => {
  setRotationStyleProperty(side);
}
const rotateStepTwo = () => {
  setSizeStyleProperty(window.innerWidth, window.innerHeight)
}
function* generateRotateSteps(nextSide?: string) {
  yield rotateStepOne(nextSide)
  return rotateStepTwo()
}

export class RotateScaleStrategy implements IRotateStrategy {
  label = 'rotate after scale'
  sizeSteps = generateSizeSteps()
  rotateSteps = generateRotateSteps()

  rotate(props: Parameters<IRotateStrategy['rotate']>[0]) {
    const { scale, nextSide } = props
    setScaleStyleProperty(scale)
    this.sizeSteps = generateSizeSteps()
    this.rotateSteps = generateRotateSteps(nextSide)
  }

  handleTransitionEnd({ event, cubeRef, containerRef }: Parameters<IRotateStrategy['handleTransitionEnd']>[0]) {
    event.stopPropagation();

    if (event.target === containerRef) {
      this.sizeSteps.next()
    }

    if (event.target === cubeRef) {
      this.rotateSteps.next()
    }
  }
}