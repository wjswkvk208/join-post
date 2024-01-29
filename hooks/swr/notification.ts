import { _notification } from "@/app/(main)/_type/notification";
import useSWR from "swr";

export const useNotification = () => {
  // const obj: any = {
  //   "filters[user][id][$eq]": userId,
  //   "sort[0]": "id:desc",
  // };

  // const query = qs.stringify(obj, { skipNulls: true });

  const { data, isLoading, mutate } = useSWR<{ data: _notification[]; meta: {} }>(`${process.env.NEXT_PUBLIC_API_URL}/notifications`);
  return { data: data?.data, isLoading, mutate };
};
