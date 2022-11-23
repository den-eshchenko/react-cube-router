import { HomeOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigateWithSearchParams } from "../../hooks/useNavigateWithSearchParams";

export const NavigationBar = () => {
  const { navigateWithSearchParams } = useNavigateWithSearchParams();

  const handleChangeSide = (path: string) => {
    // начинается уменьшение куба, далее transitionend у containerRef.current
    navigateWithSearchParams(path);
  };

  return (
    <>
      <Button
          style={{ fontSize: '100%' }}
          onClick={() => {
            handleChangeSide('/front_side');
          }}
        >
          <HomeOutlined />
          home
        </Button>
      <Button
        style={{ fontSize: '100%' }}
        onClick={() => {
          // при клике меняется url на /back_side, сохраняется текущее положение отрисованным,
          // начинается анимация перехода, после анимации меняется previousSide на текущий url
          handleChangeSide('/back_side');
        }}
      >
        back_side
      </Button>
      <Button
        style={{ fontSize: '100%' }}
        onClick={() => {
          handleChangeSide('/front_side');
        }}
      >
        front_side
      </Button>
      <Button
        style={{ fontSize: '100%' }}
        onClick={() => {
          handleChangeSide('/left_side');
        }}
      >
        left_side
      </Button>
      <Button
        style={{ fontSize: '100%' }}
        onClick={() => {
          handleChangeSide('/right_side');
        }}
      >
        right_side
      </Button>
      <Button
        style={{ fontSize: '100%' }}
        onClick={() => {
          handleChangeSide('/top_side');
        }}
      >
        top_side
      </Button>
      <Button
        style={{ fontSize: '100%' }}
        onClick={() => {
          handleChangeSide('/bottom_side');
        }}
      >
        bottom_side
      </Button>
    </>
  );
};