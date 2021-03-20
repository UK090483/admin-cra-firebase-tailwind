const round = (num: number) => {
  return Math.round(num * 100) / 100;
};

const getSumIn100 = (num: number) => {
  return round((num / 64) * 100);
};

export { round, getSumIn100 };
