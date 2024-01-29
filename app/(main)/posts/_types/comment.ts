import { _post } from "./post";
import { _user } from "../../_type/user";

export type _comment = {
  id: number;
  attributes: {
    comment: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    post: {
      data: _post;
    };
    user: {
      data: _user;
    };
  };
};
