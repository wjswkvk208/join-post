import useSWR from "swr";

export const useList = () => {
  //const fetcher = (url: string) => fetch(url).then(r => r.json());

  const { data, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/golf-course-lists`);
  //data?.data
  return { data, isLoading };
};

interface golfCourse {
  id: Number;
  Name: string;
  Location: string;
  Address: string;
  Holes: Number;
  Type: "Membership" | "Public";
  createAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}
