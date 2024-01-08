import { Box, Button } from "@mui/material";
import { styled } from "@mui/system";
import React, { useState } from "react";
import Confirm from "../../../../components/common/Confirm";

const PostActionButtonsBlock = styled(Box)`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
  margin-top: -1.5rem;
`;
const PostActionButtons = ({ onEdit, onRemove }: any) => {
  const [open, setOpen] = useState<boolean>(false);
  const onRemoveClick = () => {
    setOpen(true);
  };
  const onCancel = () => {
    setOpen(false);
  };

  const onConfirm = () => {
    setOpen(false);
    onRemove();
  };
  return (
    <>
      <PostActionButtonsBlock>
        <Button onClick={onEdit}>수정</Button>
        <Button onClick={onRemoveClick}>삭제</Button>
      </PostActionButtonsBlock>
      <Confirm open={open} onCancel={onCancel} onConfirm={onConfirm} title={"게시글 삭제"} text={"게시글을 삭제하시겠습니까?"} />
    </>
  );
};

export default PostActionButtons;
