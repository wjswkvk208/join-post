"use client";
import { Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography, Link, Alert } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
import Copyright from "@/components/common/Copyright";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme({
  palette: {
    primary: {
      light: blue[300],
      main: blue[500],
      dark: blue[700],
      // darker: blue[900],
    },
  },
});

export default function Register() {
  const router = useRouter();

  const [passCheck, setPassCheck] = useState(false);
  const [nameCheck, setNameCheck] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="이메일"
                  name="email"
                  type="email"
                  autoComplete="email"
                  // error={!!error}
                  // onFocus={() => {
                  //   reset();
                  // }}
                  // helperText={error?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="닉네임"
                  name="username"
                  autoComplete="user-name"
                  InputProps={{ inputProps: { minLength: 3, maxLength: 10 } }}
                  helperText={nameCheck && "3 ~ 10 길이의 닉네임을 입력해주세요."}
                  error={nameCheck}
                  onInvalid={e => {
                    setNameCheck(true);

                    // (e.target as HTMLInputElement).setCustomValidity(" ");
                    // console.log(e);
                  }}
                  onChange={() => setNameCheck(false)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="비밀번호"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  InputProps={{ inputProps: { minLength: 8, maxLength: 20 } }}
                  error={passCheck}
                  onInvalid={e => {
                    setPassCheck(true);
                    //(e.target as HTMLInputElement).setCustomValidity(" ");
                    // console.log(e);
                  }}
                  helperText={"8 ~ 20 길이의 비밀번호를 설정해주세요."}
                  onChange={() => setPassCheck(false)}
                />
              </Grid>
              {/* {error && (
                <Grid item xs={12}>
                  <Alert severity="error">{error.message}</Alert>
                </Grid>
              )} */}
            </Grid>

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              회원가입
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  이미 회원이신가요?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
