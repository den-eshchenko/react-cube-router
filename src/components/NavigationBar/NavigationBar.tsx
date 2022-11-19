import { useNavigateWithSearchParams } from "../../hooks/useNavigateWithSearchParams";

export const NavigationBar = () => {
  const { navigateWithSearchParams } = useNavigateWithSearchParams();

  const handleChangeSide = (path: string) => {
    // начинается уменьшение куба, далее transitionend у containerRef.current
    navigateWithSearchParams(path);
  };

  return (
    <div style={{ fontSize: '100%' }}>
      <button
        style={{ fontSize: '100%' }}
        onClick={() => {
            // при клике меняется url на /back_side, сохраняется текущее положение отрисованным,
            // начинается анимация перехода, после анимации меняется previousSide на текущий url
            handleChangeSide('/back_side');
        }}
      >
        back_side
      </button>
      <button
        style={{ fontSize: '100%' }}
        onClick={() => {
          handleChangeSide('/front_side');
        }}
      >
        front_side
      </button>
      <button
        style={{ fontSize: '100%' }}
        onClick={() => {
          handleChangeSide('/left_side');
        }}
      >
        left_side
      </button>
      <button
        style={{ fontSize: '100%' }}
        onClick={() => {
          handleChangeSide('/right_side');
        }}
      >
        right_side
      </button>
      <button
        style={{ fontSize: '100%' }}
        onClick={() => {
          handleChangeSide('/top_side');
        }}
      >
        top_side
      </button>
      <button
        style={{ fontSize: '100%' }}
        onClick={() => {
          handleChangeSide('/bottom_side');
        }}
      >
        bottom_side
      </button>
    </div>
  );
};