import { _comment } from "@/app/(main)/posts/_types/comment";
import axios from "@/app/axios";
import { _pagination } from "@/types/pagination";
import qs from "qs";
import useSWR from "swr";

export const useComments = ({
  postId,
  page,
  pageSize,
  // startDate,
  // endDate,
  username,
}: {
  postId?: number | string | undefined | null;
  page?: string | number;
  pageSize?: string | number;

  username?: string | undefined;
}) => {
  const query = qs.stringify(
    {
      "populate[0]": "post.id",
      "populate[1]": "user.picture",
      "filters[post][id][$eq]": postId,
      "filters[user][username][$eq]": username,
      "sort[0]": "id:desc",
    },
    { skipNulls: true }
  );

  const { data, isLoading, mutate } = useSWR<{ data: _comment[]; meta: _pagination }>(`${process.env.NEXT_PUBLIC_API_URL}/comments?${query}`);
  return { data: data?.data, meta: data?.meta, isLoading, mutate };
};

export const updateComment = async ({ arg }: { arg: any }) => {
  return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/comments`, { data: { ...arg } }).then(res => res.data);
};
