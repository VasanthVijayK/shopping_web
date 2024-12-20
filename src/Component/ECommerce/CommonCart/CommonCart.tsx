import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid2";
import { Box, Button, CardActions, Stack, styled, Tooltip } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { updateItemField } from "../../../FireBase/Auth";
import { AllDataProvider } from "../../DataProvider/DataProvider";
import { AdditionalUses } from "../../AdditionalUses/AdditionalUses";
type ProductData = {
  category: string;
  description: string;
  id: string;
  is_cart: boolean;
  is_fav: boolean;
  p_amount: number;
  p_count: number;
  p_img: string;
  p_name: string;
  price: number;
};
interface CardComponentProps {
  cardData: ProductData;
  setMapData: React.Dispatch<React.SetStateAction<ProductData[]>>;
}
const BoxFlex = styled(Box)(({ theme }) => ({
  display: "flex",

  alignItems: "baseline",
  justifyContent: "space-between",
}));
const StyledTypo = styled(Typography)(({ theme }) => ({
  variants: "caption",
  display: "block",
}));
export const CommonCart: React.FC<CardComponentProps> = ({
  cardData,
  setMapData,

}) => {
    const {  setMessage,
        setNotifi,Notifi} = AllDataProvider()
  const handleIncrement = (id: string) => {
    setMapData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, p_count: (item.p_count || 1) + 1 } : item
      )
    );
  };

  const handleDecrement = (id: string) => {
    setMapData((prevData) =>
      prevData.map((item) =>
        item.id === id && item.p_count > 1
          ? { ...item, p_count: item.p_count - 1 }
          : item
      )
    );
  };
  const UpdateData = async (id: string, field: string, value: boolean) => {
    try {
      const response: any = await updateItemField(id, field, !value);
      setMapData((pre)=>pre.filter((i)=>i.id !== id))
      setMessage("Removed Successfully");
      setNotifi(true);
    } catch (err: any) {
      setMessage(err.message);
      setNotifi(true);
    }
  };

  
  return (
   <>
      {Notifi && <AdditionalUses />}

    <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image={cardData.p_img}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {cardData.p_name}
          </Typography>
          <Stack spacing={2}>
            <BoxFlex>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <StyledTypo>{`Price (${cardData.p_count || 1})`}</StyledTypo>

                <Fab
                  sx={{
                    fontSize: "0.8rem",
                    width: "30px",
                    height: "30px",
                    minHeight: "30px",
                  }}
                  color="success"
                  disabled={cardData.p_count <= 1}
                  aria-label="add"
                  onClick={() => handleDecrement(cardData.id)}
                >
                  <RemoveIcon />
                </Fab>
                {cardData.p_count || 1}
                <Fab
                  sx={{
                    fontSize: "0.8rem",
                    width: "30px",
                    height: "30px",
                    minHeight: "30px",
                  }}
                  color="success"
                  aria-label="add"
                  onClick={() => handleIncrement(cardData.id)}
                >
                  <AddIcon />
                </Fab>
              
              </Box>

              <StyledTypo>
                {`₹ ${
                  cardData.p_count
                    ? cardData.p_count * cardData.price
                    : 1 * cardData.price
                }`}
              </StyledTypo>
            </BoxFlex>
      
          
          </Stack>
        </CardContent>
        <CardActions >
            <Box sx={{width:"-webkit-fill-available",textAlign:"end"}}>
                <Tooltip title="Remove from Cart" arrow>
                <Fab
                  sx={{
                    fontSize: "0.8rem",
                    width: "30px",
                    height: "30px",
                    minHeight: "30px",
                  }}
                  color="error"
                  aria-label="remove"
                  onClick={() => UpdateData(cardData.id, "is_cart", cardData.is_cart)}
                >
                  <DeleteOutlineIcon />
                </Fab>
                </Tooltip>
          
            </Box>
    
        </CardActions>
    
    </Card>
   </>
  );
};
