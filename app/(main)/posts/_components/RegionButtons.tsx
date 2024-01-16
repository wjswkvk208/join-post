import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { ComponentProps, useState } from "react";

const RegionButtons = (props: ComponentProps<typeof ToggleButtonGroup>) => {
  return (
    <ToggleButtonGroup size="large" color="primary" aria-label="지역 설정" fullWidth {...props}>
      <ToggleButton value={"수도권"}>수도권</ToggleButton>

      <ToggleButton value={"충청권"}>충청권</ToggleButton>

      <ToggleButton value={"강원권"}>강원권</ToggleButton>

      <ToggleButton value={"경북권"}>경북권</ToggleButton>

      <ToggleButton value={"경남권"}>경남권</ToggleButton>

      <ToggleButton value={"호남권"}>호남권</ToggleButton>

      <ToggleButton value={"제주"}>제주</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default RegionButtons;
