import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import {
  addKeyToUser,
  getItemsFromFirestore,
  updateItemField,
} from "../../../FireBase/Auth";
import { AdditionalUses } from "../../AdditionalUses/AdditionalUses";
import { AllDataProvider } from "../../DataProvider/DataProvider";
import Grid from "@mui/material/Grid2";
import { CommonCart } from "../CommonCart/CommonCart";
import { replace, useNavigate } from "react-router-dom";

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

const BoxFlex = styled(Box)(({ theme }) => ({
  display: "flex",

  alignItems: "baseline",
  justifyContent: "space-between",
}));
const StyledTypo = styled(Typography)(({ theme }) => ({
  variants: "caption",
  display: "block",
}));
const CartPage = () => {
  const navigate = useNavigate();

  const {
    setMessage,
    setNotifi,
    Notifi,
    Refresh,
    setRefresh,
    setCartCount,
    CustomNoRowsOverlay,
    UserData,
  } = AllDataProvider();
  const [mapData, setMapData] = useState<ProductData[]>([]);
  const [totalPrize, setTotalPrize] = useState<number>(0);

  useEffect(() => {
    const fetchUserData = async (): Promise<void> => {
      try {
        let ans: any = await getItemsFromFirestore();

        let cart = ans.filter((e: ProductData) => e.is_cart);
        setMapData([...cart]);
        setCartCount(cart.length);
        console.log(ans);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setMessage(err.message);
          setNotifi(true);
        }
      }
    };

    fetchUserData();
  }, [Refresh]);
  const memoizedMapData: ProductData[] = useMemo(() => mapData, [mapData]);

  const PurchasedData = async () => {
    try {
      const response: any = await addKeyToUser(
        UserData.uid,
        "purchased_history",
        memoizedMapData
      );
      const updatePromises = memoizedMapData.map((item) =>
        updateItemField(item.id, "is_cart", false)
      );
      await Promise.all(updatePromises);
      setMessage(response.message);
      setNotifi(true);
      navigate("/home",{replace:true})
    } catch (err: any) {
      setMessage(err.message);
      setNotifi(true);
    }
  };
  useEffect(() => {
    let ans = memoizedMapData.reduce((a: number, b: ProductData) => {
      return a + (b.p_count || 1) * b.price;
    }, 0);
    setTotalPrize(ans);
  }, [memoizedMapData]);

  return (
    <>
      {Notifi && <AdditionalUses />}
      <Container maxWidth="lg">
        <Stack spacing={2}>
          {memoizedMapData.length > 0 ? (
            <>
              {" "}
              <Box sx={{ flexGrow: 1 }}>
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  {memoizedMapData.map((e) => {
                    return (
                      <Grid key={e.id} size={{ xs: 2, sm: 4, md: 4 }}>
                        <CommonCart cardData={e} setMapData={setMapData} />
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
              <Paper sx={{ p: 5 }} elevation={3}>
                <Stack spacing={2}>
                  <BoxFlex>
                    <StyledTypo>{`Platform Fee `}</StyledTypo>
                    <StyledTypo>{`₹ 3`}</StyledTypo>
                  </BoxFlex>
                  <BoxFlex>
                    <StyledTypo>{`Delivery Charge `}</StyledTypo>
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{ textDecoration: "line-through", color: "gray" }}
                      >
                        ₹150
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "green", marginLeft: 1 }}
                      >
                        Free Delivery
                      </Typography>
                    </Box>
                  </BoxFlex>
                  <BoxFlex>
                    <StyledTypo>{`Total `}</StyledTypo>
                    <Box>
                      <Typography variant="caption" sx={{ color: "green" }}>
                        including Tax
                      </Typography>
                      <Typography variant="h5" sx={{ color: "black" }}>
                        {`₹ ${totalPrize}`}
                      </Typography>
                    </Box>
                  </BoxFlex>
                  <Box sx={{ display: "grid", placeItems: "flex-end" }}>
                    <Box sx={{ width: "20rem" }}>
                      <Button
                        fullWidth
                        color="warning"
                        variant="contained"
                        onClick={PurchasedData}
                      >
                        Checkout Payment
                      </Button>
                    </Box>
                  </Box>
                </Stack>
              </Paper>
            </>
          ) : (
            <Stack>
              {CustomNoRowsOverlay()}
              <Button
                variant="text"
                color="success"
                onClick={() => navigate("/home", { replace: true })}
              >
                Shop More to get Exciting Gifts!
              </Button>
            </Stack>
          )}
        </Stack>
      </Container>
    </>
  );
};

export default CartPage;
