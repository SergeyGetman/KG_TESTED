import { styled } from "@mui/system";
import { useState, useEffect } from "react";
import { setProductsList } from "@/store/productsSlice";
import { selectProductsState } from "@/store/productsSlice";
import { useSelector, useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const Block = styled(Box)`
  width: 80%;
`;

const StyledBox = styled(Box)<any>`
  visibility: ${(props) =>
    props.page === "cart" && props.amount !== 0 ? "visible" : "hidden"};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledCard = styled(Card)<any>`
  visibility: ${(props) =>
    (props.amount === 0 && props.page === "home") ||
    (props.amount !== 0 && props.page === "cart")
      ? "visible"
      : "hidden"};
  min-height: 220px;
`;

const StyledCardContent = styled(CardContent)<any>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  text-transform: uppercase;
  margin-bottom: 3%;
`;

const StyledCardActions = styled(CardActions)<any>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledSlider = styled(Slider)({
  color: "#808080",
  height: 5,
  "& .MuiSlider-thumb": {
    backgroundColor: "#ffffff",
  },
});

export default function ProductCard(data: any) {
  console.log();
  const [amount, setAmount] = useState(data.data.amount);
  const left = data.data.quantity - amount;
  let currentProducts: any = useSelector(selectProductsState).productsList;
  const dispatch = useDispatch();

  const handleSlider = (event: any) => {
    setAmount(event.target.value);
    currentProducts = currentProducts.map((product: any, index: number) => {
      if (+data.data.id === index + 1) {
        product = { ...product, amount: event.target.value };
      }

      return product;
    });
    
    setTimeout(() => dispatch(setProductsList(currentProducts)), 300);
  };
  return (
    <StyledCard amount={data.data.amount} page={data.data.page} raised={true}>
      <StyledCardContent>
        <Typography>{data.data.product}</Typography>
        <Typography>price: ${data.data.price}</Typography>
        <StyledBox page={data.data.page} amount={data.data.amount}>
          <Typography>amount:</Typography>
          <Typography>${amount * data.data.price}</Typography>
        </StyledBox>
      </StyledCardContent>
      <StyledCardActions disableSpacing={true}>
        <Block>
          <StyledSlider
            area-label="Always visible"
            defaultValue={0}
            value={amount}
            step={1}
            max={data.data.quantity}
            marks
            valueLabelDisplay="on"
            onChange={handleSlider}
          />
        </Block>
        <Typography>how many? only {left} left!</Typography>
      </StyledCardActions>
    </StyledCard>
  );
}
