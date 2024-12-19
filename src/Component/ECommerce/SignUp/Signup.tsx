import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";

import { AllDataProvider } from "../../DataProvider/DataProvider";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Button from "@mui/material/Button";

import CircularProgress from "@mui/material/CircularProgress";
import KeyboardDoubleArrowUpSharpIcon from "@mui/icons-material/KeyboardDoubleArrowUpSharp";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { AdditionalUses } from "../../AdditionalUses/AdditionalUses";
import {
  gradientblack,
  gradientPrimary,
  gradientrevenue,
  gradientsuccess,
} from "../../../Theme";
import { Avatar, Link, Stack } from "@mui/material";
import { CreateUser } from "../../../FireBase/Auth";
import { useNavigate } from "react-router-dom";
// import { CompanyRegisterForm } from "../AxiosFetch/AllFetchMethod";

const SignUp = () => {
  const navigation = useNavigate()
  const { Notifi, setNotifi, setMessage } = AllDataProvider();

  const [loading, setLoading] = useState(false);
  const [UserData, setUserData] = useState({
    user_email: "",
    user_name: "",
    mobile_no: "",
    password: "",
  });
  /////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    if (value[0] === " ") return;

    setUserData((values) => ({ ...values, [name]: value }));
  };

  const [isValid, setIsValid] = useState(false);

  ///////////////////////////////////////////////
  const validateEmail = (value: string) => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(value);
  };
  const validatePassword = (value: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()-_=+{};:,<.>]).{8,}$/;
    const gmailRegex = passwordRegex.test(value.trim());
    return gmailRegex;
  };
  const CheckPassword = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (validatePassword(value.trim())) {
      setIsValid(true);
    } else {
      setMessage(
        "The password mismatching it must be atleast 8 characters long and contain atleast one uppercase, one lowercase, and one special character."
      );
      setNotifi(true);
      setIsValid(false);
    }
  };
  const CheckEmail = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (validateEmail(value)) {
      setIsValid(true);
    } else {
      setMessage("InValid EmailId");
      setNotifi(true);
      setIsValid(false);
    }
  };
  /////////////////////////////////////////////////////
  let PostVal = {
    ...UserData,
  };
  console.log(PostVal);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(UserData);
    e.preventDefault();

    if (!UserData.mobile_no) {
      setMessage("Please Fill the mobile no");
      setNotifi(true);
      return;
    }

    if (isValid) {
      try {
        const response = await CreateUser(UserData);
        setMessage(response.message);
        setNotifi(true);
        navigation("/SignIn",{replace:true})
      } catch (err: any) {
        setMessage(err.message);
        setNotifi(true);
      }
    } else {
      setMessage("Email id or Password is Invalud");
      setNotifi(true);
    }
  };
  /////////////////////////////////////////////////////
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  return (
    <>
      {Notifi && <AdditionalUses />}

      <Container
        maxWidth="md"
        sx={{
          padding: "1rem 0px",
          marginTop: "10rem",
          boxShadow:
            "rgba(0, 0, 0, 0.14) 0rem 0.25rem 1.25rem 0rem, rgba(0, 187, 212, 0.4) 0rem 0.4375rem 0.625rem -0.3125rem",
        }}
      >
        <Stack spacing={2} alignItems="center">
          <Avatar sx={{ m: 1, background: gradientPrimary }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            sx={{ flexGrow: 1 }}
            component="form"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  required
                  label="Name"
                  type="text"
                  name="user_name"
                  value={UserData.user_name || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  required
                  label="Email Id"
                  type="email"
                  name="user_email"
                  value={UserData.user_email || ""}
                  onChange={handleChange}
                  onBlur={CheckEmail}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  size="medium"
                  label="Create Password"
                  type="text"
                  value={UserData.password || ""}
                  onChange={(e) =>
                    setUserData({
                      ...UserData,
                      password: e.target.value.trim(),
                    })
                  }
                  onBlur={CheckPassword}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                {/* <TextField
                fullWidth
                required
                label="Mobile no"
                type="number"
                name="mobile_no"
                value={UserData.mobile_no || ""}
                onChange={handleChange}
              /> */}
                <PhoneInput
                  inputStyle={{
                    width: "100%",
                  }}
                  required
                  country={"in"}
                  id="outlined-number"
                  label="Mobile No"
                  type="number"
                  name="mobile_no"
                  value={UserData?.mobile_no.toString()}
                  onChange={(value: any) => {
                    setUserData({ ...UserData, mobile_no: value.trim() });
                  }}
                  inputProps={{
                    required: true,
                  }}

                  // inputStyle={{
                  //   width: '100%',
                  //   height: '41px',
                  //   // fontSize: '13px',
                  //   // paddingLeft: '48px',
                  //   borderRadius: '5px',
                  // }}
                  // // buttonStyle={{ borderRadius: '5px 0 0 5px' }}
                  // // dropdownStyle={{ width: '300px' }}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Grid container>
                  <Link href="SignIn" variant="body2">
                    {"Already Signed Up ? Sign In"}
                  </Link>
                </Grid>
                <Grid textAlign="end">
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ background: gradientPrimary }}
                    startIcon={
                      loading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        <KeyboardDoubleArrowUpSharpIcon />
                      )
                    }
                  >
                    Sign Up
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default SignUp;
