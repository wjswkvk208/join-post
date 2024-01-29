import { _user } from "./user";

export type _notification = {
  id: number;
  attributes: {
    message: string;
    link: string;
    read: boolean;
    createdAt: string;
    updatedAt: string;

    user: {
      data: _user;
    };
  };
};
