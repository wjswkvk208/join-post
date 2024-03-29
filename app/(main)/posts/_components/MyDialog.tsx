import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Slide, TextField, Toolbar, Typography } from "@mui/material";
import AppBar from "../../../../components/common/AppBar";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import { TransitionProps } from "@mui/material/transitions";
import CommentList from "./CommentList";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MyDialog = ({ open, handleClose, handleSubmit, title, children, onClose, handleDelete, handleEdit }: any) => {
  if (!children) return <></>;
  // console.log(onClose);
  return (
    <Dialog open={open} fullScreen onClose={handleClose} TransitionComponent={Transition}>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {title}
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

      <DialogContent dangerouslySetInnerHTML={{ __html: children.props.children }} />
      {/* <DialogActions>
        <Button type="button" onClick={handleClose}>
          닫기
        </Button>
        <Button type="submit">등록</Button>
      </DialogActions> */}
      {/* </form> */}

      <CommentList />
    </Dialog>
  );
};

export default MyDialog;
