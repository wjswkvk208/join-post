"use client";
// ** React Imports
import { useState, ElementType, ChangeEvent, SyntheticEvent, useEffect } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import Button, { ButtonProps } from "@mui/material/Button";

// ** Icons Imports
import Close from "mdi-material-ui/Close";
import { updateUser, useUpdateUser, useUserMe } from "@/hooks/swr/user";
import Loading from "@/components/common/Loading";

import { SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import accountUpdateSchema from "@/app/validationSchema";
import { useSession } from "next-auth/react";

const ImgStyled = styled("img")(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius,
}));

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    textAlign: "center",
  },
}));

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginLeft: 0,
    textAlign: "center",
    marginTop: theme.spacing(4),
  },
}));

// const initialState = {
//   errors: {
//     status: undefined,
//     email: undefined,
//     nickname: undefined,
//     sex: undefined,
//     kakaoLink: undefined,
//   },
//   result: "",
// };

type FormInputs = {
  email: string;
  nickname: string;
  phone: string;
  sex: string;
  kakaoLink: string;
  status: string;
  picture: FileList;
  // pictureId:string;
};

const TabAccount = ({ picture }: { picture: string | undefined }) => {
  const { data: session, status, update } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormInputs>({
    resolver: zodResolver(accountUpdateSchema),
  });

  // ** State
  const { data: me, isLoading, mutate } = useUserMe();
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(picture);

  const newPicture = watch("picture");
  useEffect(() => {
    if (newPicture && newPicture.length > 0) {
      const file = newPicture[0];
      setPreviewUrl(URL.createObjectURL(file));
    }
  }, [newPicture]);

  // const onChange = (file: ChangeEvent) => {
  // const reader = new FileReader();
  // const { files } = file.target as HTMLInputElement;
  // if (files && files.length !== 0) {
  //   reader.onloadend = () => setPreviewUrl(reader.result as string);
  //   reader.readAsDataURL(files[0]);
  // }
  // };

  const onSubmit: SubmitHandler<FormInputs> = data => {
    if (!confirm("변경된 사항을 저장하겠습니까?")) {
      return;
    }
    // Handle form submission with validated data
    updateUser({ arg: { ...data, me } }).then(r => {
      //todo 세션 업데이트
      update({ image: r.url, name: "" });
      mutate();
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <CardContent>
      <form noValidate onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ImgStyled src={previewUrl} alt="Profile Pic" />
              <Box>
                <ButtonStyled component="label" variant="contained" htmlFor="account-settings-upload-image">
                  Upload New Photo
                  <input type="file" hidden {...register("picture")} accept="image/png, image/jpeg" id="account-settings-upload-image" />
                </ButtonStyled>
                <ResetButtonStyled color="error" variant="outlined" onClick={() => setPreviewUrl(picture)}>
                  Reset
                </ResetButtonStyled>
                <Typography variant="body2" sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              {...register("nickname")}
              fullWidth
              label="이름"
              placeholder=""
              defaultValue={me.nickname}
              required
              // error={state && !!state.errors.nickname}
              // helperText={
              //   state && state.errors.nickname && state.errors.nickname[0]
              // }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              {...register("phone")}
              fullWidth
              type="phone"
              label="휴대폰번호"
              placeholder="01012345678"
              defaultValue={me.phone}
              required
              // error={state && !!state.errors.email}
              // helperText={state && state.errors.email && state.errors.email[0]}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              {...register("email")}
              fullWidth
              type="email"
              label="Email"
              placeholder="johnDoe@example.com"
              defaultValue={me.email}
              required
              // error={state && !!state.errors.email}
              // helperText={state && state.errors.email && state.errors.email[0]}
            />
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select label="Role" defaultValue="admin">
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="author">Author</MenuItem>
                <MenuItem value="editor">Editor</MenuItem>
                <MenuItem value="maintainer">Maintainer</MenuItem>
                <MenuItem value="subscriber">Subscriber</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>성별</InputLabel>
              <Select {...register("sex")} label="성별" defaultValue={me.sex}>
                <MenuItem value="male">남</MenuItem>
                <MenuItem value="female">여</MenuItem>
                {/* <MenuItem value="secret">비공개</MenuItem> */}
                {/* <MenuItem value="pending">Pending</MenuItem> */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>현재 골프를 </InputLabel>
              <Select {...register("status")} label="상태" defaultValue={me.status}>
                <MenuItem value="active">활동중</MenuItem>
                <MenuItem value="inactive">휴식중</MenuItem>
                {/* <MenuItem value="pending">Pending</MenuItem> */}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              {...register("kakaoLink")}
              fullWidth
              label="카카오 링크"
              placeholder="ABC Pvt. Ltd."
              defaultValue={me.kakaoLink}
              required
              // error={state && !!state.errors.kakaoLink}
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="outlined" type="submit" sx={{ marginRight: 3.5 }}>
              Save Changes
            </Button>
            <Button type="reset" variant="outlined" color="secondary">
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  );
};

export default TabAccount;
