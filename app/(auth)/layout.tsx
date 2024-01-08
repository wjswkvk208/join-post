"use client";
import Copyright from "@/components/common/Copyright";
import { Container, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  // const cookieStore = cookies().get("gameId");
  // const gameId = cookieStore?.value;
  const defaultTheme = createTheme();
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {children}
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
