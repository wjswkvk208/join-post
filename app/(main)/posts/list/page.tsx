"use client";
import Loading from "@/components/common/Loading";
import DialogView from "@/app/(main)/posts/_components/DialogView";

import { Datepicker, DatepickerEvent } from "@meinefinsternis/react-horizontal-date-picker";
import { useDialog } from "@/hooks/dialog";

import { useList, useView } from "@/hooks/swr/post";

import { Box, Button, DialogContentText, Grid, Stack } from "@mui/material";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ko } from "date-fns/locale";
import TourCard from "@/app/(main)/posts/_components/TourCard";

import CommentList from "../_components/CommentList";
import { _post } from "@/app/(main)/posts/_types/post";

const Post = () => {
  const router = useRouter();
  const [date, setDate] = useState<{
    endValue: Date | null;
    startValue: Date | null;
    rangeDates: Date[] | null;
  }>({
    startValue: null,
    endValue: null,
    rangeDates: [],
  });

  const handleChange = (d: DatepickerEvent) => {
    const [startValue, endValue, rangeDates] = d;
    setDate(prev => ({ ...prev, endValue, startValue, rangeDates }));
  };

  const { data, isLoading } = useList({
    path: `/posts`,
    page: 1,
    pageSize: 10,
    startDate: date.startValue,
    endDate: date.endValue,
  });

  const { data: view, trigger, reset } = useView();

  const [openDialog, dialogProps] = useDialog({ onClose: reset });

  if (isLoading) {
    return <Loading />;
    //return <></>;
  }

  if (data && data.data) {
    const rows = data.data;
    const meta = data.meta;
    return (
      <Box>
        <Stack direction={"row"} spacing={2} sx={{ mb: 2 }}>
          <Datepicker onChange={handleChange} locale={ko} startValue={date.startValue} endValue={date.endValue} />
        </Stack>

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
                  golfCourse={r.attributes.golfCourse.data.attributes}
                  user={r.attributes.user.data.attributes}
                  tags={r.attributes.tags}
                  kakao={r.attributes.kakao}
                  phone={r.attributes.phone}
                  onView={() => {
                    trigger(r.id.toString());
                    openDialog({ row: r.id.toString() });
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

        <DialogView
          title={view ? view.data.attributes.title : "Loading..."}
          {...dialogProps}
          // onClose={() => {
          //   reset();
          // }}
          handleEdit={() => {
            router.push(`/posts/edit/${view?.data.id}`);
            //console.log(view.data.id);
          }}
          handleDelete={() => {
            console.log("delete");
          }}
          commentBox={<CommentList postId={view && view.data.id} />}
        >
          {view && <DialogContentText>{view.data.attributes.content}</DialogContentText>}
        </DialogView>
      </Box>
    );
  }
};

export default Post;
