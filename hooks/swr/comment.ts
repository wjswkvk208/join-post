import { _comment } from "@/app/(main)/posts/_types/comment";
import axios from "@/app/axios";
import qs from "qs";
import useSWR from "swr";

export const useComments = ({ postId }: { postId: number | string | undefined }) => {
  const query = qs.stringify(
    {
      "populate[0]": "post.id",
      "populate[1]": "user.picture",
      "filters[post][id][$eq]": postId,
    },
    { skipNulls: true }
  );

  const { data, isLoading, mutate } = useSWR<{ data: _comment[] }>(`${process.env.NEXT_PUBLIC_API_URL}/comments?${query}`);
  return { data: data?.data, isLoading, mutate };
};

export const updateComment = async ({ arg }: { arg: any }) => {
  return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/comments`, { data: { ...arg } }).then(res => res.data);
};
