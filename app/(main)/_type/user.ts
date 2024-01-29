import { _picture } from "../posts/_types/picture";

export type _user = {
  id: number;
  attributes: {
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
    nickname: string;
    sex: string;
    kakaoLink: string;
    status: string;
    phone: string;
    picture: {
      data: _picture;
    };
  };
};
