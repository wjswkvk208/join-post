import { _post } from "./post";

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
