"use client";
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Input, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import TagBox from "@/app/(main)/posts/_components/TagBox";
import { useEdit, useView, useViewWithoutTrigger, useWrite } from "@/hooks/swr/post";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import ComboBox from "@/app/(main)/posts/_components/ComboBox";
import { SubmitHandler, useForm } from "react-hook-form";

import QuillEditor from "@/app/(main)/posts/_components/QuillEditor";
import Loading from "@/components/common/Loading";
import { _post } from "../../_types/post";

type FormInputs = {
  title: string;
  content: string;
  golfCourse: string;
  gameDate: Date | null;
  kakao: boolean;
  phone: boolean;
  tags: string[];
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#ffffff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Edit = ({ params }: { params: { id: string; username: string } }) => {
  const { data: view, isLoading } = useViewWithoutTrigger<{ data: _post; meta: object }>({ id: params.id });
  const { trigger, isMutating } = useEdit(params.id);

  // console.log("v", view);

  // const { trigger, isMutating } = useWrite();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormInputs>({
    // resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
      kakao: false,
      phone: false,
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = data => {
    trigger(data, {
      onSuccess: () => router.push("/posts/list"),
    });
  };

  const editorContent = watch("content");

  const onEditorStateChange = (editorState: any) => {
    setValue("content", editorState);
  };

  useEffect(() => {
    if (view) {
      setValue("title", view.data.attributes.title);
      setValue("content", view.data.attributes.content);
      setValue("tags", view.data.attributes.tags);
      setValue("kakao", view.data.attributes.kakao);
      setValue("phone", view.data.attributes.phone);
      setValue("gameDate", new Date(view.data.attributes.gameDate));
    }
  }, [setValue, view]);

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
        {isMutating && <Loading />}
        <Stack spacing={2}>
          {/* <Item>
            <TextField id="standard-basic" label="" fullWidth placeholder="제목을 입력해 주세요." value={data.title} onChange={e => setTitle(e.target.value)} />
          </Item> */}
          <form noValidate onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <Item>
              {/* <Controller
                name="editor"
                control={control}
                render={({ field, fieldState }) => {
                  console.log("field", field);
                  return <Editor {...field} title={field.value.title} content={field.value.content} />;
                }}
              ></Controller> */}
              <Input
                placeholder="제목을 입력하세요."
                // onChange={e => onChangeField({ key: "title", value: e.target.value })}
                // onChange={event =>
                //   props.onChange((e: any) => {
                //     return { ...e, title: event.target.value };
                //   })
                // }
                // value={props.value.title}
                {...register("title")}
                // value={view?.attributes.title}
                sx={{ fontSize: "2rem", outline: "none", pb: "0.5rem", border: "none", borderBottom: 1, borderColor: "primary.main", mb: "2rem", width: 1 }}
              />

              <QuillEditor value={editorContent} onChange={onEditorStateChange} />
              <FormControl component="fieldset">
                <FormLabel component="legend">연락처 공개</FormLabel>
                <FormGroup row>
                  <FormControlLabel control={<Checkbox defaultChecked {...register("kakao")} />} label="카카오톡" />
                  <FormControlLabel control={<Checkbox defaultChecked {...register("phone")} />} label="휴대폰번호" />
                </FormGroup>
              </FormControl>
            </Item>
            <Item>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <DateTimePicker
                    label="Tee Off Time"
                    onChange={(value: Date | null) => {
                      setValue("gameDate", value);
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ComboBox
                    onChange={(event: any, newValue: any) => {
                      // setCourse(newValue.id);
                      setValue("golfCourse", newValue.id);
                    }}
                  />
                </Grid>
              </Grid>
            </Item>
            <Item>
              <Stack spacing={2}>
                <TagBox
                  tags={watch("tags")}
                  onChangeTags={(nextTags: any) => {
                    setValue("tags", nextTags);
                  }}
                />
              </Stack>
              <Stack direction="row-reverse" spacing={2}>
                <Button variant="outlined" startIcon={<DeleteIcon />}>
                  취소
                </Button>
                <Button type="submit" variant="outlined" startIcon={<SendIcon />} disabled={isMutating}>
                  확인
                </Button>
              </Stack>
            </Item>
          </form>
        </Stack>
      </Box>
    </Box>
  );
};

export default Edit;
