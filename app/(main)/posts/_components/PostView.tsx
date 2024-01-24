import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Slide, TextField, Toolbar, Typography } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import AppBar from "../../../../components/common/AppBar";

import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import React, { MouseEventHandler, useEffect } from "react";
import { useViewWithoutTrigger } from "@/hooks/swr/post";
import CommentList from "./CommentList";
import Loading from "@/components/common/Loading";

const handleDelete = () => {};
const handleEdit = () => {};

const PostView = ({
  open,
  postId,
  handleClose,
  onClose,
}: {
  open: boolean;
  postId: string;
  handleClose: MouseEventHandler<HTMLButtonElement>;
  onClose?: MouseEventHandler<HTMLButtonElement> | undefined;
}) => {
  const { data: view, isLoading, mutate } = useViewWithoutTrigger({ id: postId });

  if (isLoading) {
    return <Loading />;
  }
  if (view && postId) {
    return (
      <Dialog open={open} fullScreen onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {view.data.attributes.title}
            </Typography>

            <IconButton edge="start" color="inherit" onClick={handleEdit} aria-label="edit">
              <EditIcon />
            </IconButton>

            <IconButton edge="start" color="inherit" onClick={handleDelete} aria-label="delete" sx={{ ml: 1 }}>
              <DeleteIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* <form onSubmit={handleSubmit}>
        <DialogTitle>{title}</DialogTitle> */}

        <DialogContent dangerouslySetInnerHTML={{ __html: view.data.attributes.content }} />
        {/* <DialogActions>
        <Button type="button" onClick={handleClose}>
          닫기
        </Button>
        <Button type="submit">등록</Button>
      </DialogActions> */}
        {/* </form> */}

        <CommentList postId={view.data.id} />
      </Dialog>
    );
  }
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default PostView;
