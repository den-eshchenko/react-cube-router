import { setRotationStyleProperty } from "../../utils/setRotationStyleProperty";
import { IRotateStrategy } from "./mainRotateStrategy"

export class RotateDefaultStrategy implements IRotateStrategy {
  label = 'default rotate'

  rotate(props: Parameters<IRotateStrategy['rotate']>[0]) {
    const { nextSide } = props
    setRotationStyleProperty(nextSide)
  }

  handleTransitionEnd() {}
}