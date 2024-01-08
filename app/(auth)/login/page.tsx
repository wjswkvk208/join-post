"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { signIn } from "next-auth/react";

// TODO remove, this demo shouldn't need to reset the theme.

export default function Login() {
  // const emailRef = React.useRef<HTMLInputElement | null>(null);
  // const passwordRef = React.useRef(null);

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   // console.log(emailRef.current);
  // };

  return (
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
        로그인
      </Typography>
      <Box component="form" sx={{ mt: 1 }}>
        {/* <TextField
          ref={emailRef}
          onChange={(e: any) => {
            emailRef.current = e.currentTarget.value;
          }}
          margin="normal"
          type="email"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onInvalid={e => (e.target as HTMLInputElement).setCustomValidity("이메일을 입력해주세요.")}
        />
        <TextField
          ref={passwordRef}
          onChange={(e: any) => (passwordRef.current = e.target.value)}
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        /> */}
        {/* <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" /> */}

        {/* {loginError && <Alert severity="error">{loginError.message}</Alert>} */}
        {/* <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              로그인
            </Button> */}
        <Button
          type="button"
          color="warning"
          fullWidth
          variant="outlined"
          sx={{ mt: 3, mb: 2 }}
          onClick={async () => {
            await signIn("kakao", { redirect: true, callbackUrl: "/" });
          }}
        >
          Kakao 로그인
        </Button>

        <Button
          type="button"
          color="warning"
          fullWidth
          variant="outlined"
          sx={{ mt: 3, mb: 2 }}
          onClick={async () => {
            await signIn("google", { redirect: true, callbackUrl: "/" });
          }}
        >
          Google 로그인
        </Button>
        {/* <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="/register" variant="body2">
              {"계정이 없나요? 가입하기"}
            </Link>
          </Grid>
        </Grid> */}
      </Box>
    </Box>
  );
}
