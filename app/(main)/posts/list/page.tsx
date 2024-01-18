"use client";

import { useEffect, useState } from "react";
import { Box, Button, Grid, Stack, TextField } from "@mui/material";

import { useDialog } from "@/hooks/dialog";
import { useList } from "@/hooks/swr/post";

import TourCard from "@/app/(main)/posts/_components/TourCard";
import RegionButtons from "../_components/RegionButtons";
import Loading from "@/components/common/Loading";

import { _post } from "@/app/(main)/posts/_types/post";
import { ko } from "date-fns/locale";
import { Datepicker, DatepickerEvent } from "@meinefinsternis/react-horizontal-date-picker";
import { useQueryState } from "nuqs";
import PostView from "../_components/PostView";

const Post = () => {
  const [post, setPost] = useQueryState("post");
  const [date, setDate] = useState<{
    endValue: Date | null;
    startValue: Date | null;
    rangeDates: Date[] | null;
  }>({
    startValue: null,
    endValue: null,
    rangeDates: [],
  });

  const [region, setRegion] = useState<string[]>([]);

  const handleDate = (d: DatepickerEvent) => {
    const [startValue, endValue, rangeDates] = d;
    setDate(prev => ({ ...prev, endValue, startValue, rangeDates }));
  };

  const handleRegion = (event: React.MouseEvent<HTMLElement>, newRegions: string[]) => {
    setRegion(newRegions);
  };

  const { data, isLoading, mutate } = useList({
    page: 1,
    pageSize: 10,
    startDate: date.startValue,
    endDate: date.endValue,
    region: region,
  });

  // const { data: view, trigger, reset } = useView();

  const [openDialog, dialogProps] = useDialog();

  useEffect(() => {
    if (post && dialogProps.open === false) {
      return () => openDialog(post);
    }
  }, [dialogProps.open, openDialog, post]);

  if (isLoading) {
    return <Loading />;
  }

  if (data && data.data) {
    const rows = data.data;
    const meta = data.meta;
    return (
      <Box>
        <Stack direction={"row"} spacing={2} sx={{ mb: 2 }}>
          <Datepicker onChange={handleDate} locale={ko} startValue={date.startValue} endValue={date.endValue} />
        </Stack>

        <Grid container spacing={3} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={9} md={9}>
            <RegionButtons value={region} onChange={handleRegion} />
          </Grid>
          <Grid item xs={12} sm={3} md={3}>
            <TextField fullWidth label="검색" id="fullWidth" />
          </Grid>
        </Grid>

        <Grid
          container
          spacing={3}
          // className={classes.gridContainer}
          // justify="center"
        >
          {rows.map((r: _post) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={r.id.toString()}>
                <TourCard
                  cardId={r.id.toString()}
                  title={r.attributes.title}
                  content={r.attributes.content}
                  gameDate={r.attributes.gameDate}
                  golfCourse={r.attributes.golfCourse.data?.attributes}
                  user={r.attributes.user.data.attributes}
                  tags={r.attributes.tags}
                  kakao={r.attributes.kakao}
                  phone={r.attributes.phone}
                  onView={() => {
                    setPost(r.id.toString());
                  }}
                />
              </Grid>
            );
          })}
        </Grid>

        <Stack direction={"row-reverse"} spacing={2} sx={{ mb: 2 }}>
          <Button variant="outlined" href="/posts/write">
            글쓰기
          </Button>
        </Stack>

        <PostView {...dialogProps}></PostView>
      </Box>
    );
  }
};

export default Post;
