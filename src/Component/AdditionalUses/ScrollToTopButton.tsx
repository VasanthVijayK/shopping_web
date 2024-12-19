import  { useState, useEffect } from "react";
import { Fab, useTheme } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ScrollToTopButton = () => {
  const theme = useTheme();

  let stylesBottom = {
    backdropFilter: "blur(1px) saturate(180%)",
    "-webkit-backdrop-filter": "blur(1px) saturate(180%)",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    color: "white",
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    transition: "opacity 0.3s ease-in-out",
    "&.visible": {
      opacity: 1,
    },
    "&:hover": {
      backdropFilter: "blur(1px) saturate(180%)",
      "-webkit-backdrop-filter": "blur(1px) saturate(180%)",
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      color: "white",
    },
  };
  let stylesTop = {
    opacity: 0,
  };
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    if (scrollTop > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Fab
      aria-label="scroll back to top"
      sx={isVisible ? stylesBottom : { ...stylesBottom, ...stylesTop }}
      onClick={scrollToTop}
    >
      <KeyboardArrowUpIcon />
    </Fab>
  );
};

export default ScrollToTopButton;
