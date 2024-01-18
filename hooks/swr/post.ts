import { getSession } from "next-auth/react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import qs from "qs";
import { _post } from "@/app/(main)/posts/_types/post";
import { getRegions } from "@/utils/region";

export const useList = ({
  // path,
  page = 1,
  pageSize = 10,
  startDate,
  endDate,
  username,
  region,
}: //rangeDate,
{
  // path: string;
  page?: number | null;
  pageSize?: number | null;
  startDate?: Date | null;
  endDate?: Date | null;
  //rangeDate?: Date[] | null;
  username?: string | null;
  region?: string[];
}) => {
  const obj: any = {
    "pagination[page]": page,
    "pagination[pageSize]": pageSize,
    "filters[user][username][$eq]": username,
    "filters[gameDate][$gte]": startDate?.toISOString(),
    "filters[gameDate][$lte]": endDate?.toISOString(),
    //"filters[golfCourse][location][$in]":
    "populate[user][populate][0]": "picture",
    "populate[golfCourse]": "*",
    "sort[0]": "id:desc",
  };

  const regionArr = getRegions(region);

  regionArr &&
    regionArr.forEach((r, i) => {
      obj[`filters[golfCourse][location][$in][${i}]`] = r;
    });

  const query = qs.stringify(obj, { skipNulls: true });

  const { data, isLoading, mutate } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/posts?${query}`);
  return { data, isLoading, mutate };
};

const fetcherPOST = async (url: string, { arg }: { arg: any }) => {
  const session = await getSession();
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.jwt}`,
    },
    body: JSON.stringify({ data: { ...arg } }),
    // caches: "no-store",
  }).then(res => {
    if (res.status === 401) {
      const error = new Error("로그인을 해주세요.");
      throw error;
    }

    return res.json();
  });
};

const fetcherPUT = async (url: string, { arg }: { arg: any }) => {
  const session = await getSession();
  return fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.jwt}`,
    },
    body: JSON.stringify({ data: { ...arg } }),
    // caches: "no-store",
  }).then(res => {
    if (res.status === 401) {
      const error = new Error("로그인을 해주세요.");
      throw error;
    }

    return res.json();
  });
};

export const useWrite = () => {
  const { trigger, isMutating } = useSWRMutation(`${process.env.NEXT_PUBLIC_API_URL}/posts`, fetcherPOST);
  return { trigger, isMutating };
};

export function useEdit(id: string) {
  const { data, trigger, error, isMutating } = useSWRMutation(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, fetcherPUT);
  return { data, trigger, error, isMutating };
}

export function useView() {
  const { data, trigger, isMutating, reset, error } = useSWRMutation(`${process.env.NEXT_PUBLIC_API_URL}/posts`, async (url: string, { arg }: { arg: string }) => {
    const session = await getSession();
    return fetch(`${url}/${arg}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.jwt}`,
      },
    }).then(res => {
      if (res.status === 401) {
        const error = new Error("로그인을 해주세요.");
        throw error;
      }

      return res.json();
    });
  });
  return { data, trigger, isMutating, reset, error };
}

export function useViewWithoutTrigger({ id }: { id: string }) {
  const { data, error, isLoading, mutate } = useSWR<{ data: _post; meta: object }>(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`);
  return { data, error, isLoading, mutate };
}
