import { Box } from "@mui/material";
import MyDataGrid from "./MyDataGrid";
import { useState } from "react";
import { getDayMinuteCounter } from "@/utils/date";
import { GridColDef } from "@mui/x-data-grid";
import { useComments } from "@/hooks/swr/comment";
import Loading from "@/components/common/Loading";

const columns: GridColDef[] = [
  { field: "id", headerName: "No", width: 70 },
  {
    field: "comment",
    headerName: "내용",
    minWidth: 200,
    sortable: false,
    valueGetter: (params: any) => {
      return params.row.attributes.comment;
    },
  },

  {
    field: "attributes.nickname",
    headerName: "작성자",
    minWidth: 200,
    sortable: false,
    valueGetter: (params: any) => {
      return params.row.attributes.user?.data?.attributes.nickname ?? "";
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

const MyComments = ({ username }: { username: string | undefined }) => {
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

  const { data, isLoading } = useComments({
    postId: null,
    page: paginationModel.page + 1,
    pageSize: paginationModel.pageSize,
    // startDate: date.startValue,
    // endDate: date.endValue,
    username: username,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (data) {
    // const rows = data.data;

    // const meta = data.meta;

    return (
      <Box>
        <MyDataGrid
          rows={data}
          columns={columns}
          pageSizeOptions={[10]}
          rowCount={0}
          paginationMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          disableRowSelectionOnClick
          onRowClick={() => {}}
          // sx={{
          //   "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
          //     outline: "none !important",
          //   },
          // }}
          // onRowClick={openDialog}
        />
      </Box>
    );
  }
};

export default MyComments;
