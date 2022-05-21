export function isIos() {
  return [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod",
  ].includes(navigator.platform);
}

export function useToPngHack() {
  return (
    isIos() ||
    (navigator.userAgent.includes("Mac") &&
      navigator.userAgent.includes("Safari") &&
      !navigator.userAgent.includes("Chrome"))
  );
}
