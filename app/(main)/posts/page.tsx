"use client";
import Loading from "@/components/common/Loading";
import DialogView from "@/app/(main)/posts/_components/DialogView";
import MyDataGrid from "@/app/(main)/posts/_components/MyDataGrid";
import { Datepicker, DatepickerEvent } from "@meinefinsternis/react-horizontal-date-picker";
import { useDialog } from "@/hooks/dialog";

import { useEdit, useList, useView } from "@/hooks/swr/post";
import { getDayMinuteCounter } from "@/utils/date";
import { Box, Button, DialogContentText, Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ko } from "date-fns/locale";

const columns: GridColDef[] = [
  { field: "id", headerName: "No", width: 70 },
  {
    field: "title",
    headerName: "제목",
    minWidth: 200,
    sortable: false,
    valueGetter: (params: any) => {
      return params.row.attributes.title;
    },
  },

  {
    field: "attributes.user",
    headerName: "작성자",
    minWidth: 200,
    sortable: false,
    valueGetter: (params: any) => {
      return params.row.attributes.user?.data?.attributes.username ?? "";
    },
  },
  {
    field: "attributes.createdAt",
    headerName: "등록일",
    valueGetter: (params: any) => {
      // Convert the decimal value to a percentage
      return getDayMinuteCounter(new Date(params.row.attributes.createdAt));
    },
    // type: "dateTime",
    // width: 150,
    headerAlign: "center",
    minWidth: 200,
  },
];

type Props = {
  calendar?: boolean;
  write?: boolean;
  username?: string | undefined | null;
};

const Post = ({ calendar = true, write = true, username = null }: Props) => {
  const router = useRouter();

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

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
    page: paginationModel.page + 1,
    pageSize: paginationModel.pageSize,
    startDate: date.startValue,
    endDate: date.endValue,
    username: username,
  });

  const { data: view, trigger, reset } = useView();
  const [openDialog, dialogProps] = useDialog({ onClose: reset });

  if (isLoading) {
    return <Loading />;
  }

  if (data.data) {
    const rows = data.data;

    const meta = data.meta;
    return (
      <Box>
        {calendar && (
          <Stack direction={"row-reverse"} spacing={2} sx={{ mb: 2 }}>
            <Datepicker onChange={handleChange} locale={ko} startValue={date.startValue} endValue={date.endValue} />
          </Stack>
        )}

        <MyDataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[10]}
          rowCount={meta ? meta.pagination.total : 0}
          paginationMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          disableRowSelectionOnClick
          onRowClick={row => {
            trigger(row.id.toString());
            openDialog({ id: row.id });
          }}
          // sx={{
          //   "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
          //     outline: "none !important",
          //   },
          // }}
          // onRowClick={openDialog}
        />

        {write && (
          <Stack direction={"row-reverse"} spacing={2} sx={{ mb: 2 }}>
            <Button variant="outlined" href="./posts/write">
              글쓰기
            </Button>
          </Stack>
        )}

        <DialogView
          title={view ? view.data.attributes.title : "Loading..."}
          {...dialogProps}
          // handleSubmit={() => {}}
          // onClose={() => {
          //   reset();
          // }}
          handleEdit={() => {
            router.push(`/posts/edit/${view.data.id}`);
            //console.log(view.data.id);
          }}
          handleDelete={() => {
            console.log("delete");
          }}
        >
          {view && <DialogContentText>{view.data.attributes.content}</DialogContentText>}
        </DialogView>
      </Box>
    );
  }
};

export default Post;
