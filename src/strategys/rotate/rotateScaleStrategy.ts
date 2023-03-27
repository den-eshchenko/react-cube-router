import { setRotationStyleProperty } from "../../utils/setRotationStyleProperty"
import { setSizeStyleProperty } from "../../utils/setSizeStyleProperty"
import { IRotateStrategy } from "./mainRotateStrategy"

export class RotateScaleStrategy implements IRotateStrategy {
  label = 'rotate after scale'

  rotate(props: Parameters<IRotateStrategy['rotate']>[0]) {
    const { scale } = props
    setSizeStyleProperty(scale)
  }

  handleTransitionEnd({ event, side, cubeRef, containerRef }: Parameters<IRotateStrategy['handleTransitionEnd']>[0]) {
    event.stopPropagation();
    
    // анимация после уменьшения куба
    if (event.target === containerRef) {
      console.log(1)
      setRotationStyleProperty(`/${side}`);
    }

    // анимация после поворота куба
    if (event.target === cubeRef) {
      setSizeStyleProperty('1, 1, 1');
    }
  }
}