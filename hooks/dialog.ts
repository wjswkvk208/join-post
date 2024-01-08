import { useState } from "react";

export const useDialog = ({ onClose }: { onClose: Function | undefined }) => {
  const [display, setDisplay] = useState(false);

  const openDialog = ({ row }: any | undefined) => {
    setDisplay(true);
  };
  const handleClose = () => {
    setDisplay(false);
    onClose && onClose();
  };

  // const handleSubmit =() => {

  // }
  const props = {
    open: display,

    handleClose,
    //handleSubmit
  };
  return [openDialog, props] as const;
};
