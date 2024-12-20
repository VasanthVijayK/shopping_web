import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import { PhotoView, PhotoProvider } from "react-photo-view";
import { yellow } from "@mui/material/colors";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import "react-photo-view/dist/react-photo-view.css";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Container, Button, Stack } from "@mui/material";
import { AllDataProvider } from "../../DataProvider/DataProvider";
import { getItemsFromFirestore, updateItemField } from "../../../FireBase/Auth";
import Grid from "@mui/material/Grid2";
import { AdditionalUses } from "../../AdditionalUses/AdditionalUses";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CardActionArea from '@mui/material/CardActionArea';
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));
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

type FilterDataType = {
  alldata: ProductData[];
  fashion: ProductData[];
  applicant: ProductData[];
};
interface ApiResponse {
  message: string;
  success?: boolean;
}
export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState<string | null>("" || null);
  const [Category, setCategory] = React.useState<string>("All");

  const { setMessage, setNotifi, Notifi, Refresh, setRefresh, setCartCount } =
    AllDataProvider();
  const [mapData, setMapData] = React.useState<ProductData[]>([]);
  const [Filterdata, setFilterData] = React.useState<FilterDataType>({
    alldata: [],
    fashion: [],
    applicant: [],
  });
  const handleChange = (event: SelectChangeEvent) => {
    let val = event.target.value as string;
    setCategory(val);
    switch (val) {
      case "Fashion":
        setMapData([...Filterdata.fashion]);
        break;
      case "Appliances":
        setMapData([...Filterdata.applicant]);
        break;
      case "All":
      default:
        setMapData([...Filterdata.alldata]);
        break;
    }
  };
  React.useEffect(() => {
    const fetchUserData = async (): Promise<void> => {
      try {
        let ans: any = await getItemsFromFirestore();
        setMapData([...ans]);
        let cart = ans.filter((e: ProductData) => e.is_cart);
        let fashion = ans.filter((e: ProductData) => e.category === "Fashion");
        let applicant = ans.filter(
          (e: ProductData) => e.category === "Appliances"
        );
        setFilterData({
          alldata: [...ans],
          fashion,
          applicant,
        });
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
  const UpdateData = async (id: string, field: string, value: boolean) => {
    try {
      const response: any = await updateItemField(id, field, !value);
      setMessage(response.message);
      setNotifi(true);
      setRefresh(!Refresh);
    } catch (err: any) {
      setMessage(err.message);
      setNotifi(true);
    }
  };

  const handleExpandClick = (data: string) => {
    if (expanded) {
      setExpanded(null);
    } else {
      setExpanded(data);
    }
  };

  return (
    <>
      {Notifi && <AdditionalUses />}
      <Container maxWidth="lg">
        <Stack spacing={2}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">{`Category ${Category}`}</Typography>
            <Box sx={{ minWidth: 180 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={Category}
                  label="Category"
                  onChange={handleChange}
                >
                  <MenuItem value={"All"}>All</MenuItem>
                  <MenuItem value={"Fashion"}>Fashion</MenuItem>
                  <MenuItem value={"Appliances"}>Appliances</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {mapData.map((e) => {
                return (
                  <Grid key={e.id} size={{ xs: 2, sm: 4, md: 4 }}>
                    <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardHeader
                        action={
                          <IconButton
                            aria-label="add to favorites"
                            onClick={() => UpdateData(e.id, "is_fav", e.is_fav)}
                          >
                            <FavoriteIcon
                              color={e.is_fav ? "error" : "inherit"}
                            />
                          </IconButton>
                        }
                        title={e.p_name}
                      />
                      <PhotoProvider>
                        <PhotoView
                          key={e.id}
                          src={e.p_img}
                          speed={() => 800}
                          easing={(type: any) =>
                            type === 2
                              ? "cubic-bezier(0.36, 0, 0.66, -0.56)"
                              : "cubic-bezier(0.34, 1.56, 0.64, 1)"
                          }
                        >
                          <CardMedia
                            component="img"
                            height="194"
                            image={e.p_img}
                            alt="Paella dish"
                          />
                        </PhotoView>
                      </PhotoProvider>
                      <CardActions disableSpacing>
                        {/* <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton> */}
                        <Button
                          onClick={() => UpdateData(e.id, "is_cart", e.is_cart)}
                          startIcon={<AddShoppingCartIcon />}
                          variant="text"
                          size="small"
                          sx={{ backgroundColor: yellow[500] }}
                        >
                          {e.is_cart ? "Remove from Cart" : "Add to Cart"}
                        </Button>
                        <ExpandMore
                          expand={expanded === e.id}
                          onClick={() => handleExpandClick(e.id)}
                          aria-expanded={expanded === e.id}
                          aria-label="show more"
                        >
                          <ExpandMoreIcon />
                        </ExpandMore>
                      </CardActions>
                      <Collapse
                        in={expanded === e.id}
                        timeout="auto"
                        unmountOnExit
                      >
                        <CardContent>
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                          >
                            {e.description}
                          </Typography>
                        </CardContent>
                      </Collapse>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Stack>
      </Container>
    </>
  );
}
