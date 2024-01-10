// ** React Imports
import { SyntheticEvent, useState } from "react";
// ** MUI Imports

import CardContent from "@mui/material/CardContent";
import { Box, Card, CardMedia, Tab, Typography } from "@mui/material";
import TabList from "@mui/lab/TabList";
import Post from "../posts/page";
import { TabContext, TabPanel } from "@mui/lab";

import MyComments from "../posts/_components/MyComments";
import { useUserMe } from "@/hooks/swr/user";
import { useList } from "@/hooks/swr/post";
import { useComments } from "@/hooks/swr/comment";

import moment from "moment";
import "moment/locale/ko";
// ** Third Party Imports
// import DatePicker from "react-datepicker";

// ** Styled Components

const TabInfo = ({ username, picture }: { username: string | undefined; picture: string | undefined }) => {
  // ** State
  const { data: user, isLoading } = useUserMe();
  const { data: post } = useList({ username: username });
  const { data: comment, meta: commentMeta } = useComments({ username: username });
  const [value, setValue] = useState<string>("myPost");

  if (user && post)
    return (
      <CardContent>
        <Card sx={{ display: "flex" }}>
          <CardMedia component="img" sx={{ width: 151, height: 151 }} image={picture} alt={username} />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                {user.nickname}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                작성글 <b>{post.meta.pagination.total}</b> 작성댓글 <b>{commentMeta?.pagination.total}</b> 가입일 <b>{moment(user.createdAt).format("LL")}</b>
              </Typography>
            </CardContent>
            <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}></Box>
          </Box>
        </Card>

        {/* <Stack direction={"row"}>
        <ImgStyled alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        <TextField
          fullWidth
          multiline
          label="Bio"
          minRows={2}
          placeholder="Bio"
          defaultValue="The name’s John Deo. I am a tireless seeker of knowledge, occasional purveyor of wisdom and also, coincidentally, a graphic designer. Algolia helps businesses across industries quickly create relevant 😎, scalable 😀, and lightning 😍 fast search and discovery experiences."
        />
      </Stack> */}
        <TabContext value={value}>
          <TabList
            onChange={(event: SyntheticEvent, newValue: string) => {
              setValue(newValue);
            }}
            aria-label="account-settings tabs"
            sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}`, mb: 1 }}
          >
            <Tab value="myPost" label={<Box sx={{ display: "flex", alignItems: "center" }}>나의 작성글</Box>} />
            <Tab value="myComment" label={<Box sx={{ display: "flex", alignItems: "center" }}>작성한 댓글</Box>} />
            {/* <Tab
            value="info"
            label={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <InformationOutline />
                <TabName>Info</TabName>
              </Box>
            }
          /> */}
          </TabList>
          <TabPanel sx={{ p: 0 }} value="myPost">
            <Post username={username} calendar={false} write={false} />
          </TabPanel>

          <TabPanel sx={{ p: 0 }} value="myComment">
            <MyComments username={username} />
          </TabPanel>
        </TabContext>
      </CardContent>
    );
};

export default TabInfo;
