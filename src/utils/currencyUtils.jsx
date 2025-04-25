export const convertToINR = (usd) => {
  if (typeof usd !== "number") return "0";
  return (usd * 83.5).toFixed(0);
};
