import { Backdrop, Box, CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    // <Box sx={{ display: "flex" }}>
    //   <CircularProgress />
    // </Box>
    <Backdrop
      sx={{ color: "#1976d2" }}
      open={true}
      // onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;
