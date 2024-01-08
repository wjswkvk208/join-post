import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const Confirm = ({ open, onCancel, onConfirm, title, text }: any) => {
  return (
    <Dialog open={open} onClose={onCancel} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm} autoFocus>
          확인
        </Button>
        <Button onClick={onCancel}>취소</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Confirm;
