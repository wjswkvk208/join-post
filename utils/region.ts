const getRegion = (region: string) => {
  if (region === "수도권") return ["서울", "경기", "인천"];
  if (region === "충청권") return ["대전", "세종", "충북", "충남"];
  if (region === "강원권") return ["강원"];
  if (region === "경북권") return ["대구", "경북"];
  if (region === "경남권") return ["부산", "울산", "경남"];
  if (region === "호남권") return ["광주", "전북", "전남"];
  if (region === "제주") return ["제주"];
  return [];
};

export const getRegions = (regions: string[] | undefined) => {
  if (!regions) return null;
  return regions.map(r => getRegion(r)).reduce((prev, next) => prev.concat(next), []);
};
