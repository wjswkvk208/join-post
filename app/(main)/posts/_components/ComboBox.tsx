import { useList } from "@/hooks/swr/golfCourse";
import { Autocomplete, Box, TextField } from "@mui/material";
import Loading from "../../../../components/common/Loading";
import { golfCourse } from "@/types/golfCourse";

import React from "react";

export default function ComboBox(comboBoxProps: any) {
  const { data, isLoading } = useList();

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return <></>;
  }

  return (
    <Autocomplete
      disablePortal
      options={data ? data : []}
      sx={{ width: 300 }}
      renderInput={params => {
        return <TextField {...params} label="골프장 선택" />;
      }}
      getOptionLabel={(option: golfCourse) => {
        // console.log("op", option);
        return option.name || "";
      }}
      renderOption={(props, option: golfCourse) => {
        return (
          <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props} key={option.id.toString()}>
            {option.name} {option.type === "Public" ? "[P]" : ""}
          </Box>
        );
      }}
      {...comboBoxProps}
    />
  );
}
