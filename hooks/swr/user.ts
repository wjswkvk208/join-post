import axios from "@/app/axios";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export const useUserMe = () => {
  const { data, isLoading, mutate } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/users/me`);
  return { data, isLoading, mutate };
};

export const useUpdateUser = (me?: any) => {
  const { data, trigger, error } = useSWRMutation(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, (url: string, { arg }: { arg: any }) => {
    if (me && arg.picture && arg.picture.length > 0) {
      console.log({
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: {
          files: arg.picture,
        },
      });
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/upload?id=${me.picture.id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: {
          files: arg.picture,
        },
      });
      // .then(r => {
      //   console.log("r", r);
      //   return r.data;
      // });
    }
    return axios
      .put(url, {
        body: { ...arg },
        // caches: "no-store",
      })
      .then(res => {
        if (res.status === 401) {
          const error = new Error("로그인을 해주세요.");
          throw error;
        }

        return res.data;
      });
  });
  return { data, trigger, error };
};

export const updateUser = async ({ arg }: { arg: any }) => {
  const isPicUpload = arg.me && arg.picture && arg.picture.length > 0;
  if (isPicUpload) {
    // const picResponse =
  } else {
    delete arg.picture;
  }

  // try {
  return axios
    .put(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
      ...arg,
    })
    .then(res => {
      if (res.status === 401) {
        const error = new Error("로그인을 해주세요.");
        throw error;
      }

      if (isPicUpload) {
        // ?${qs.stringify({ id: arg.me.id }, { skipNulls: true })}
        return axios
          .post(
            `${process.env.NEXT_PUBLIC_API_URL}/upload`,
            {
              files: arg.picture[0],
              ref: "plugin::users-permissions.user",
              refId: arg.me.id,
              field: "picture",
            },
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then(r => {
            console.log("re", r);
            return r.data[0];
          })
          .catch(e => {
            console.log("e", e);
          });
      } else {
        return res.data;
      }
    })
    .catch(function (error) {
      console.log(error.toJSON());
    });
  // .catch(error => {
  //   console.log("eeeee", error);
  //   // throw error;
  // });
  // } catch (error) {
  //   console.log(error);
  //   return error;
  // }
};
