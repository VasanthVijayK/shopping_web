import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { AllDataProvider } from "../DataProvider/DataProvider";
import { Slide, Typography } from "@mui/material";

export function AdditionalUses() {
  let { Notifi, setNotifi ,message} = AllDataProvider();

  const handleClose = (   event: React.SyntheticEvent | Event,
    reason?: string): void => {
    if (reason === "clickaway") {
      setNotifi(false);
      return;
    }else{
      setNotifi(false);
    }
    
  };


  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={(event) => handleClose(event, "clickaway")}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
    
      <Snackbar
        open={Notifi}       
        autoHideDuration={4000}
        TransitionComponent={Slide}
        onClose={handleClose}
        message={<Typography  color="inherit">{message}</Typography>}
        action={action}
      />
    </div>
  );
}
