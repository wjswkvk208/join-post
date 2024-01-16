export type golfCourse = {
  id: number;
  name: string;
  address: string;
  holes: number;
  location: string;
  type: "Membership" | "Public";
  createdAt: Date;
  locale: string;
  publishedAt: Date;
  updatedAt: Date;
};

// enum Location {
//   "서울",
//   "경기",
//   "인천",
//   "강원",
//   "충북",
//   "충남",
//   "대전",
//   "대구",
//   "경북",
//   "경남",
//   "부산",
//   ",울산",
//   "전북",
//   "전남",
//   "광주",
// }
