"use client";
// ** React Imports
import { SyntheticEvent, useState } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import { styled } from "@mui/material/styles";
import MuiTab, { TabProps } from "@mui/material/Tab";

// ** Icons Imports
import AccountOutline from "mdi-material-ui/AccountOutline";
//import LockOpenOutline from "mdi-material-ui/LockOpenOutline";
import InformationOutline from "mdi-material-ui/InformationOutline";
import TabAccount from "./tabAccount";
//import TabSecurity from "./tabSecurity";
import TabInfo from "./tabInfo";

const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    minWidth: 100,
  },
  [theme.breakpoints.down("sm")]: {
    minWidth: 67,
  },
}));

const TabName = styled("span")(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: "0.875rem",
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const Account = ({ username, picture }: { username: string; picture?: string }) => {
  const [value, setValue] = useState<string>("account");

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Card>
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label="account-settings tabs" sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}>
          <Tab
            value="account"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AccountOutline />
                <TabName>개인정보</TabName>
              </Box>
            }
          />
          {/* <Tab
            value="security"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LockOpenOutline />
                <TabName>비밀번호</TabName>
              </Box>
            }
          /> */}
          <Tab
            value="info"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <InformationOutline />
                <TabName>활동내역</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value="account">
          <TabAccount picture={picture} />
        </TabPanel>
        {/* <TabPanel sx={{ p: 0 }} value="security">
          <TabSecurity />
        </TabPanel> */}
        <TabPanel sx={{ p: 0 }} value="info">
          <TabInfo username={username} picture={picture} />
        </TabPanel>
      </TabContext>
    </Card>
  );
};

export default Account;
