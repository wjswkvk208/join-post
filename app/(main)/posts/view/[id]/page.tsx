import PostActionButtons from "@/app/(main)/posts/_components/PostActionButtons";
import ViewerBox from "@/app/(main)/posts/_components/ViewerBox";
import { useView } from "@/hooks/swr/post";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const View = ({ params }: { params: { id: string; username: string } }) => {
  const { data: post, error, isLoading } = useView({ ...params });
  const { data: session } = useSession();
  const isOwnPost = (post && post.user.id) === session?.user.id;
  const router = useRouter();

  return (
    <ViewerBox
      post={post}
      error={error}
      isLoading={isLoading}
      actionButtons={
        isOwnPost && (
          <PostActionButtons
            onEdit={() => router.push(`/board/edit/${post._id}`)}
            onRemove={() => {
              //trigger();
              router.push(`/board/list`);
            }}
          />
        )
      }
    />
  );
};

export default View;
