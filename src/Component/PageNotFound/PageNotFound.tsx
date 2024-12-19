import  Box  from "@mui/material/Box";
import Button from "@mui/material/Button";
import  Container  from "@mui/material/Container";
import { Stack } from "@mui/system";
import * as React from "react";
import { Link } from "react-router-dom";
import img from "./404_error.webp";
const PageNotFound = () => {
  return (
    <Stack >
      <Box sx={{display:"flex",justifyContent:"center"}}>
    
        <img src={img} width="100%" height="100%" alt="404 page not founded" />
      </Box>
      <Box sx={{padding:"15px",textAlign:"center"}}>
      <Button component={Link} to="/" >Return to Homepage</Button>

      </Box>
    </Stack>
  );
};

export default PageNotFound;
