export const setSizeStyleProperty = (size: number) => {
    document.documentElement.style.setProperty("--size", `${size}px`);
};