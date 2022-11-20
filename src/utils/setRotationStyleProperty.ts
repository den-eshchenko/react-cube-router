export const SIDE_ROTATION_DATA: Record<string, string> = {
    front_side: '0',
    back_side: '0, 1, 0, 180deg',
    right_side: '0, 1, 0, -90deg', 
    left_side: '0, 1, 0, 90deg',
    top_side: '1, 0, 0, -90deg',
    bottom_side: '1, 0, 0, 90deg',
};

export const setRotationStyleProperty = (nextSide : string | null = 'front_side') => {
    const side = nextSide?.split?.('/')?.[1] || 'front_side';

    document.documentElement.style.setProperty("--side-3d", `${SIDE_ROTATION_DATA[side]}`);
};