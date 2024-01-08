"use client";
import { getSession } from "next-auth/react";
import { SWRConfig } from "swr";
import axios from "./axios";

export const SWRProvider = async ({ children }: { children: React.ReactNode }) => {
  return (
    <SWRConfig
      value={{
        fetcher: url => axios.get(url).then(res => res.data), //url => fetch(url, options).then(res => res.json()),
      }}
    >
      {children}
    </SWRConfig>
  );
};

// async function updateOptions(options: any) {
//   const data = await getSession();
//   const update = { ...options };
//   //if (localStorage.jwt) {
//   update.headers = {
//     ...update.headers,
//     Authorization: `Bearer ${data?.jwt}`,
//   };
//   //}
//   return update;
// }

// export default async function fetcher(url: string, options: any) {
//   return fetch(url, await updateOptions(options));
// }
