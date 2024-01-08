//"use server";
import { Backdrop, CircularProgress } from "@mui/material";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <Backdrop
      sx={{ color: "#fff" }}
      open={true}
      // onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
