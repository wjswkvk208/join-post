import { useState } from "react";

export const useDialog = () => {
  const [display, setDisplay] = useState(false);
  const [postId, setPostId] = useState<string>("");
  const openDialog = (postId: string) => {
    setDisplay(true);
    setPostId(postId);
  };
  const handleClose = () => {
    setDisplay(false);
  };

  const props = {
    open: display,
    postId: postId,
    handleClose,
  };
  return [openDialog, props] as const;
};
