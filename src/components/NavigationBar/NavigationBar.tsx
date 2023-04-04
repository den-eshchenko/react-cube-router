import { HomeOutlined } from "@ant-design/icons";
import { Button, Switch } from "antd";
import { rotateStrategy } from "../..";
import { changeType } from "../../app/simpleAnimation";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { useNavigateWithSearchParams } from "../../hooks/useNavigateWithSearchParams";
import { RotateDefaultStrategy } from "../../strategies/rotate/rotateDefaultStrategy";
import { RotateScaleStrategy } from "../../strategies/rotate/rotateScaleStrategy";

import styles from './NavigationBar.module.css';

export const NavigationBar = () => {
  const { navigateWithSearchParams } = useNavigateWithSearchParams()
  const isSimpleAnimation = useAppSelector(state => state.simpleAnimation.isSimpleAnimation)
  const dispatch = useAppDispatch()

  const handleChangeAnimationType = () => {
    dispatch(changeType())
    if (!isSimpleAnimation) {
      rotateStrategy.setStrategy(new RotateScaleStrategy())
    }

    if (isSimpleAnimation) {
      rotateStrategy.setStrategy(new RotateDefaultStrategy())
    }
  }

  const handleChangeSide = (path: string) => () => {
    // начинается уменьшение куба, далее transitionend у containerRef.current
    navigateWithSearchParams({ nextSide: path })
  }

  return (
    <div className={styles.container}>
      <Switch checked={isSimpleAnimation} onChange={handleChangeAnimationType} />
      <Button onClick={handleChangeSide('/front_side')}>
          <HomeOutlined />
        </Button>
      <Button onClick={handleChangeSide('/back_side')}> {/*при клике меняется url на /back_side, сохраняется текущее положение отрисованным, начинается анимация перехода, после анимации меняется previousSide на текущий url */}
        B
      </Button>
      <Button onClick={handleChangeSide('/front_side')}>
        F
      </Button>
      <Button onClick={handleChangeSide('/left_side')}>
        L
      </Button>
      <Button onClick={handleChangeSide('/right_side')}>
        R
      </Button>
      <Button onClick={handleChangeSide('/top_side')}>
        T
      </Button>
      <Button onClick={handleChangeSide('/bottom_side')}>
        B
      </Button>
    </div>
  );
};