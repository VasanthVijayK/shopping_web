import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import * as Aos from "aos";
import "aos/dist/aos.css" 
import { useEffect } from "react";
import { DataProvider } from "./Component/DataProvider/DataProvider";
import ECommerce from "./Component/ECommerce";
function App() {
  useEffect(()=>{
   Aos.init({
    duration: 1000,
   })
  },[])
  return (
    <>
    <DataProvider>
      <CssBaseline />
       
      < ECommerce/>
      </DataProvider>
    </>
  );
}

export default App;
