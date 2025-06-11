export const compareIps = (ipA: string, ipB: string): number => {
  const partsA = ipA.split(".").map(Number);
  const partsB = ipB.split(".").map(Number);

  for (let i = 0; i < 4; i++) {
    if (partsA[i] !== partsB[i]) {
      return partsA[i] - partsB[i];
    }
  }
  return 0;
};
