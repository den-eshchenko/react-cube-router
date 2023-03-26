const SIDE_ROTATION_DATA: Record<string, string> = {
    front_side: '0',
    back_side: '0, 1, 0, 180deg',
    right_side: '0, 1, 0, -90deg', 
    left_side: '0, 1, 0, 90deg',
    top_side: '1, 0, 0, -90deg',
    bottom_side: '1, 0, 0, 90deg',
};

// const SIDE_ROTATION_DATA_ERROR: Record<string, string> = {
//     front_side: '0',
//     back_side: '0, 1, 0, 180deg',
//     right_side: '0, 1, 0, 90deg', 
//     left_side: '0, 1, 0, -90deg',
//     top_side: '1, 0, 0, 90deg',
//     bottom_side: '1, 0, 0, -90deg',
// };

export const setRotationStyleProperty = (nextSide : string | null = 'front_side') => {
    const side = nextSide?.split?.('/')?.[1] || 'front_side';

    console.log('side', side)
    console.log('nextSide', nextSide)
    console.log('nextSide?.split', nextSide?.split?.('/')?.[1])
    console.log('SIDE_ROTATION_DATA[side]', SIDE_ROTATION_DATA[side])

    document.documentElement.style.setProperty("--current-turn", `${SIDE_ROTATION_DATA[side] || '0'}`);
    // document.documentElement.style.setProperty("--current-turn-error", `${SIDE_ROTATION_DATA_ERROR[side] || '0'}`);
};