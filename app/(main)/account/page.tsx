import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Account from "./Account";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const Page = async () => {
  const data = await getServerSession(authOptions);

  if (!data) {
    return redirect("api/auth/signin");
  }

  return <Account username={data.user.username} picture={data.user.image} />;
};

export default Page;
