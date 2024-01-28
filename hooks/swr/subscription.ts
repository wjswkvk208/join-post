import { getSession } from "next-auth/react";
import useSWRMutation from "swr/mutation";

export const useSubscription = (postId: string) => {
  const { trigger, isMutating } = useSWRMutation(`${process.env.NEXT_PUBLIC_API_URL}/subscriptions`, async (url: string, { arg }: { arg: any }) => {
    const session = await getSession();
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.jwt}`,
      },
      body: JSON.stringify({ data: { postId: postId } }),
      // caches: "no-store",
    }).then(res => {
      if (res.status === 401) {
        const error = new Error("로그인을 해주세요.");
        throw error;
      }

      return res.json();
    });
  });
  return { trigger, isMutating };
};

export const useUnsubscription = (postId: string) => {
  const { trigger, isMutating } = useSWRMutation(`${process.env.NEXT_PUBLIC_API_URL}/subscriptions/${postId}`, async (url: string, { arg }: { arg: any }) => {
    const session = await getSession();
    return fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.jwt}`,
      },
      // body: JSON.stringify({ data: { post:postId } }),
      // caches: "no-store",
    }).then(res => {
      if (res.status === 401) {
        const error = new Error("로그인을 해주세요.");
        throw error;
      }

      return res.json();
    });
  });
  return { trigger, isMutating };
};
