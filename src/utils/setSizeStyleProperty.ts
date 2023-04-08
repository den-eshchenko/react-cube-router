export const setSizeStyleProperty = (width: number, height: number) => {
  document.documentElement.style.setProperty("--window-width", `${width}px`);
  document.documentElement.style.setProperty("--window-height", `${height}px`);
};