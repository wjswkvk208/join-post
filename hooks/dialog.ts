import { useQueryState } from "nuqs";
import { useState } from "react";

export const useDialog = () => {
  const [display, setDisplay] = useState(false);
  const [post, setPost] = useQueryState("post");
  const [postId, setPostId] = useState<string>("");

  const openDialog = async (postId: string) => {
    setDisplay(true);
    setPostId(postId);
    setPost(postId);
  };
  const handleClose = () => {
    setPost(null);
    setDisplay(false);
  };

  const props = {
    open: display,
    postId: postId,
    handleClose,
  };
  return [openDialog, props] as const;
};
