import createTheme from "@mui/material/styles/createTheme";
import { Box, outlinedInputClasses, Paper, styled, Typography } from "@mui/material";
import Button from "@mui/material/Button";

export const customTheme = createTheme({
  palette: {
    primary: {
      // main: "#222E50",
      main: "#36497d",
      contrastText: "rgb(255, 255, 255)",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "--TextField-brandBorderColor": "#E0E3E7",
          "--TextField-brandBorderHoverColor": "#B2BAC2",
          "--TextField-brandBorderFocusedColor": "#6F7E8C",
          "& label.Mui-focused": {
            color: "var(--TextField-brandBorderFocusedColor)",
          },
        },
      },
    },
    // MuiFormControlLabel: {
    //   styleOverrides: {
    //     root: {
    //       color: "warning !important",
    //     },
    //   },
    // },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "var(--TextField-brandBorderColor)",
        },
        root: {
          [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: "var(--TextField-brandBorderHoverColor)",
          },
          [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: "var(--TextField-brandBorderFocusedColor)",
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          "&:before, &:after": {
            borderBottom: "2px solid var(--TextField-brandBorderColor)",
          },
          "&:hover:not(.Mui-disabled, .Mui-error):before": {
            borderBottom: "2px solid var(--TextField-brandBorderHoverColor)",
          },
          "&.Mui-focused:after": {
            borderBottom: "2px solid var(--TextField-brandBorderFocusedColor)",
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          "&:before": {
            borderBottom: "2px solid var(--TextField-brandBorderColor)",
          },
          "&:hover:not(.Mui-disabled, .Mui-error):before": {
            borderBottom: "2px solid var(--TextField-brandBorderHoverColor)",
          },
          "&.Mui-focused:after": {
            borderBottom: "2px solid var(--TextField-brandBorderFocusedColor)",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          "--TextField-brandBorderColor": "#E0E3E7",
          "--TextField-brandBorderHoverColor": "#B2BAC2",
          "--TextField-brandBorderFocusedColor": "#6F7E8C",
          "& .MuiSelect-select:focus": {
            borderColor: "var(--TextField-brandBorderFocusedColor)",
          },
          "& .MuiSelect-icon": {
            color: "var(--TextField-brandBorderFocusedColor)",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          color: "darkslategray",
        },
      },
    },
  
    MuiPaper:{
      styleOverrides:{
        root:{
          borderRadius:"0.8rem",
          boxShadow:`rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem, rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem`,
          // "&:hover":{
          //   boxShadow:`rgba(0, 0, 0, 0.2) 0px 4px 5px 0px,
          //   rgba(0, 0, 0, 0.12) 0px 3px 14px 3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px`,
          //   transition:"ease-in-out"
          // }
          
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          // boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.2)'
        },
      },
    },
  },
});



export const StyledButton = styled(Button)({
  backgroundColor: "rgb(0, 255, 204)",
  color: "black",
  "&:hover": {
    backgroundColor: "rgb(0, 255, 204)",
    color: "white",
  },
  fontSize: 13,
});

export const StyledPaper = styled(Paper)(({ theme }) => ({
  borderTop: `4px solid rgb(248, 249, 250)`,
}));
export const StyledReportPaper = styled(Paper)(({ theme }) => ({
  borderTop: `4px solid ${theme.palette.primary.light}`,
  // borderBottomLeftRadius:"1.2rem",
  // borderTopRightRadius:"1.2rem",
  padding: "5px",
}));
export const BoxFlex = styled(Box)(({ theme }) => ({
  display: "flex",
  gap:4,
  alignItems:"baseline",
  justifyContent:"space-between"
}));
export const CardData = styled(Box)(({ theme }) => ({
  color: "rgb(255, 255, 255)",
  boxShadow:
    "rgba(0, 0, 0, 0.14) 0rem 0.25rem 1.25rem 0rem, rgba(0, 187, 212, 0.4) 0rem 0.4375rem 0.625rem -0.3125rem",
  width: "60px",
  height: "60px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "1rem",
  position:"absolute",
  bottom:50,
  left:20
  
}));
export const CardDatas = styled(Box)(({ theme }) => ({
  color: "rgb(255, 255, 255)",
  boxShadow:
    "rgba(0, 0, 0, 0.14) 0rem 0.25rem 1.25rem 0rem, rgba(0, 187, 212, 0.4) 0rem 0.4375rem 0.625rem -0.3125rem",
  width: "60px",
  height: "60px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "1rem",
  position:"absolute",
  bottom:50,
  left:20  
}));
export const QuestionPaper = styled(Paper)(({ theme }) => ({
 backgroundColor:"rgb(248, 249, 250)"
}));
export const gradientPrimary= `linear-gradient(195deg, rgb(73, 163, 241), rgb(34,46,80))`
export const gradientsecondary = `linear-gradient(195deg, rgb(73, 163, 241), rgb(156,39,176))`
export const gradientinfo = `linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))`
export const gradientWarning = `linear-gradient(195deg, rgb(73, 163, 241), rgb(237,108,2))`
export const gradientsuccess = `linear-gradient(195deg, rgb(73, 163, 241), rgb(46,125,50))`
export const gradienterror = `linear-gradient(195deg, rgb(73, 163, 241), rgb(211,47,47))`
export const gradientblack = `linear-gradient(195deg, rgb(0 0 0), rgb(0 0 0 / 40%))`
export const gradientCandi = `linear-gradient(195deg, rgb(25 232 195), rgb(34, 46, 80))`
export const gradientNewCandi = `linear-gradient(195deg, rgb(252 83 163), rgb(34, 46, 80))`
export const gradientrevenue = `linear-gradient(195deg, rgb(122 104 218 / 96%), rgb(68 72 83))`
export const ShadowProp = `rgba(0, 0, 0, 0.14) 0rem 0.25rem 1.25rem 0rem, rgba(0, 187, 212, 0.4) 0rem 0.4375rem 0.625rem -0.3125rem`
export const RadiusProp = "0.8rem"

 export const glassmorphismeff  = {
  // background: rgba(34, 46, 80, 0.72),
  // border-radius: 16px,
  // box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1),
  // backdrop-filter: blur(5px),
  // -webkit-backdrop-filter: blur(5px),
  // border: 1px solid rgba(34, 46, 80, 0.3),
  // color: white,

  backdropFilter: 'blur(1px) saturate(180%)',
  '-webkit-backdrop-filter': 'blur(1px) saturate(180%)',
  color: 'white',
  // backgroundColor:"rgba(0, 0, 0, 0.85)",
  border: '1px solid rgba(34, 46, 80, 0.3)',
  boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.2)',
}
export const StyledCardTypo= styled(Typography)(({ theme }) => ({
  fontWeight: 500,
 
}));
export const StyledCardData = styled(Paper)(({ theme }) => ({
  minWidth: 180, height: 90, position: "relative", padding: "1rem"
}));
// const GlassmorphismButton = styled(Button)(({ theme }) => ({
//   background: `rgba(${theme.palette.primary.main.replace('#', '')}, 0.72)`,
//   borderRadius: '16px',
//   boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
//   backdropFilter: 'blur(5px)',
//   '-webkit-backdrop-filter': 'blur(5px)',
//   border: `1px solid rgba(${theme.palette.primary.main.replace('#', '')}, 0.3)`,
//   color: theme.palette.primary.contrastText,
//   '&:hover': {
//     background: `rgba(${theme.palette.primary.main.replace('#', '')}, 0.8)`,
//   },
// }));
export const StyledCardBox = styled(Box)(({ theme }) => ({
  display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
}));

export const captionStyle = {
  margin: "0px",
  
  lineHeight: "1.25",
  letterSpacing: "0.03333em",
 
  opacity: 1,
  textTransform: "none",
  verticalAlign: "unset",
  textDecoration: "none",
  color: "rgb(123, 128, 154)",
  fontWeight: 600,
}