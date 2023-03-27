export const setSizeStyleProperty = (scale3d: string = '.3, .3, .3') => {
    document.documentElement.style.setProperty("--scale-cube", scale3d);
};