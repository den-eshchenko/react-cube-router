import { HomeOutlined } from "@ant-design/icons";
import { Switch, Tooltip } from "antd";
import { rotateStrategy } from "../..";
import { changeType } from "../../app/simpleAnimation";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { RotateDefaultStrategy } from "../../strategies/rotate/rotateDefaultStrategy";
import { RotateScaleStrategy } from "../../strategies/rotate/rotateScaleStrategy";
import { NavigationButton } from "../NavigationButton";

import styles from './NavigationBar.module.css';

export const NavigationBar = () => {
  const isSimpleAnimation = useAppSelector(state => state.simpleAnimation.isSimpleAnimation)
  const dispatch = useAppDispatch()

  const handleChangeAnimationType = () => {
    dispatch(changeType())
    if (isSimpleAnimation) {
      rotateStrategy.setStrategy(new RotateScaleStrategy())
    }

    if (!isSimpleAnimation) {
      rotateStrategy.setStrategy(new RotateDefaultStrategy())
    }
  }

  return (
    <div className={styles.container}>
      <Tooltip title="Animation type" placement="right" color="blue">
        <Switch checked={isSimpleAnimation} onChange={handleChangeAnimationType} />
      </Tooltip>
      <NavigationButton title="H" tooltipTitle="Home" icon={<HomeOutlined />} path="front_side" />
      <NavigationButton title="B" tooltipTitle="Back" path="back_side" />
      <NavigationButton title="F" tooltipTitle="Front" path="front_side" />
      <NavigationButton title="L" tooltipTitle="Left" path="left_side" />
      <NavigationButton title="R" tooltipTitle="Right" path="right_side" />
      <NavigationButton title="T" tooltipTitle="Top" path="top_side" />
      <NavigationButton title="B" tooltipTitle="Bottom" path="bottom_side" />
    </div>
  );
};