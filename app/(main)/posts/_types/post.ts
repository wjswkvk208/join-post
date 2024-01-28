import { golfCourse } from "@/types/golfCourse";

export type _post = {
  id: number;
  attributes: {
    title: string;
    content: string;
    gameDate: string;
    golfCourse: {
      data: {
        id: number;
        attributes: golfCourse;
      };
    };
    user: any;
    tags: string[];
    kakao: boolean;
    phone: boolean;
    subscription: boolean;
  };
};
