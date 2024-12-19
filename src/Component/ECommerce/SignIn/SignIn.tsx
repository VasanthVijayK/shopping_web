import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AllDataProvider } from "../../DataProvider/DataProvider";
import { useNavigate } from "react-router-dom";
import { gradientPrimary } from "../../../Theme";
import { AdditionalUses } from "../../AdditionalUses/AdditionalUses";
import { SignInUser, SignInWithGoogle } from "../../../FireBase/Auth";
import GoogleButton from "react-google-button";
import { Stack } from "@mui/material";
// Define the interface for the form state
interface SignInFormState {
  email: string;
  password: string;
}

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://Ecommerce.com/">
        www.vasanthecommerce.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { setMessage, setNotifi, Notifi } = AllDataProvider();
  const [formState, setFormState] = React.useState<SignInFormState>({
    email: "",
    password: "",
  });
  const [isValid, setIsValid] = React.useState(false);

  // Handle input changes and update state
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const validateEmail = (): void => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    setIsValid(gmailRegex.test(formState.email));
  };

  const UserprofileLogins = async ({
    email,
    password,
  }: SignInFormState): Promise<void> => {
    try {
      let res = await SignInUser({ email, password });
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      navigate("/", { replace: true });
    } catch (err: any) {
      setMessage(err.message);
      setNotifi(true);
    }
  };
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    if (isValid) {
      UserprofileLogins(formState);
    } else {
      setMessage("Invalid Email");
      setNotifi(true);
    }
  };
  const HandelGooglesignin = async(event: React.MouseEvent<HTMLDivElement>): Promise<void>=>{
    event.preventDefault();
    try {
      let res = await SignInWithGoogle();
      console.log(res)
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      navigate("/", { replace: true });
    } catch (err: any) {
      setMessage(err.message);
      setNotifi(true);
    }
  }

  return (
    <>
      {Notifi && <AdditionalUses />}
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 5,
            marginTop: "5rem",
            boxShadow:
              "rgba(0, 0, 0, 0.14) 0rem 0.25rem 1.25rem 0rem, rgba(0, 187, 212, 0.4) 0rem 0.4375rem 0.625rem -0.3125rem",
          }}
        >
          <Avatar sx={{ m: 1, background: gradientPrimary }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              type="email"
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formState.email}
              onChange={handleChange}
              onBlur={validateEmail}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formState.password}
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, background: gradientPrimary }}
            >
              Sign In
            </Button>
            <Stack spacing={2}>
            <Grid container justifyContent="center">
              <Grid size={{ xs: 12 }}>
                <GoogleButton style={{width:"100%"}} type="dark" onClick={HandelGooglesignin}/>
              </Grid>
            </Grid>
            <Grid container justifyContent="space-between">
              <Grid>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid>
                <Link href="SignUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            </Stack>
           
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </>
  );
};

export default SignIn;
