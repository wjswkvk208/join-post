"use client";
import { Backdrop, Box, Button, Checkbox, CircularProgress, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import TagBox from "@/app/(main)/posts/_components/TagBox";
import { useEdit, useView } from "@/hooks/swr/post";
import { useCallback, useEffect, useState } from "react";
import Editor from "@/app/(main)/posts/_components/Editor";
import { useRouter } from "next/navigation";
import Loading from "@/components/common/Loading";
import { DateTimePicker } from "@mui/x-date-pickers";
import ComboBox from "@/app/(main)/posts/_components/ComboBox";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Edit = ({ params }: { params: { id: string; username: string } }) => {
  const { data: view, trigger } = useView();
  const { trigger: triggerEdit, isMutating } = useEdit(params.id);
  const [data, setData] = useState({
    title: "",
    content: "",
  });
  const router = useRouter();
  const [tags, setTags] = useState<string[]>([]);
  const [course, setCourse] = useState<number | null>(null);
  const [gameDate, setGameDate] = useState<Date | null>(null);
  const [kakao, setKakao] = useState<boolean>(true);
  const [phone, setPhone] = useState<boolean>(true);

  const onchangeField = useCallback(
    (p: any) => {
      setData({ ...data, [p.key]: p.value }); // 뮤테이션 재검증 생략
    },
    [data]
  );

  useEffect(() => {
    trigger(params.id, {
      onSuccess: d => {
        const { title, content } = d.data.attributes;
        setData({ title, content });
        setTags(d.data.attributes.tags);
        setKakao(d.data.attributes.kakao);
        setPhone(d.data.attributes.phone);
        setCourse(d.data.attributes.course);
        setGameDate(d.data.attributes.gameDate);
      },
    });
  }, [params.id, trigger]);

  if (isMutating) {
    return <Loading />;
  }

  return (
    <Box sx={{ flex: 1, width: "100%" }}>
      <Box
        sx={{
          position: "sticky",
          top: { sm: -100, md: -110 },
          bgcolor: "background.body",
          //zIndex: 9995,
        }}
      >
        <Stack spacing={2}>
          <Item>
            <Editor title={data.title} content={data.content} onChangeField={onchangeField} />

            <FormControl component="fieldset">
              <FormLabel component="legend">연락처 공개</FormLabel>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setKakao(event.target.checked);
                      }}
                      checked={kakao}
                    />
                  }
                  label="카카오톡"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setPhone(event.target.checked);
                      }}
                      checked={phone}
                    />
                  }
                  label="휴대폰번호"
                />
              </FormGroup>
            </FormControl>
          </Item>

          <Item>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <DateTimePicker
                  label="Tee Off Time"
                  onChange={(value: Date | null) => {
                    //console.log(typeof e, e);
                    setGameDate(value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ComboBox
                  onChange={(event: any, newValue: any) => {
                    setCourse(newValue.id);
                  }}
                />
              </Grid>
            </Grid>
          </Item>

          <Item>
            <Stack spacing={2}>
              <TagBox
                tags={tags}
                onChangeTags={(nextTags: any) => {
                  setTags(nextTags);
                }}
              />
            </Stack>
            <Stack direction="row-reverse" spacing={2}>
              <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => router.back()}>
                취소
              </Button>
              <Button
                onClick={
                  () => {
                    triggerEdit(
                      { ...data, tags },
                      {
                        onSuccess: () => router.push("/posts/list"),
                      }
                    );
                  }
                  // trigger(
                  //   { ...data, tags },
                  //   {
                  //     onSuccess: () => router.push("/board/list"),
                  //   }
                  // )
                }
                variant="outlined"
                startIcon={<SendIcon />}
              >
                확인
              </Button>
            </Stack>
          </Item>
        </Stack>
      </Box>
    </Box>
  );
};

export default Edit;
