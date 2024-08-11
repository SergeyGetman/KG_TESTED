import * as React from 'react';
import { Buy } from '@/types/Buy';
import { Total } from '@/types/Total';
import { styled } from '@mui/system';
import { selectProductsState } from "@/store/productsSlice";
import { useSelector } from "react-redux";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Link from "next/link";
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

const Block = styled(Box)`
  flex-grow: 1;
`;

export default function Nav() {
  let currentProducts: Buy[] = useSelector(selectProductsState).productsList;
  const ProductsTotal: Total = currentProducts.reduce((acc: Total, product: Buy) => {
    acc.totalNumber = acc.totalNumber + product.amount;
    acc.totalAmount = acc.totalAmount + product.amount * product.price;
    
    return acc;
  }, {totalNumber: 0, totalAmount: 0});
  
  return (
    <Block>
      <AppBar position="static">
        <Toolbar>
          <Block>
            <Link href="/">
                <IconButton aria-label='house' size="large">
                  <AutoStoriesIcon fontSize="large" />
                </IconButton>
            </Link>
          </Block>
          <Link href="/cart">
          <IconButton aria-label="cart">
            <Badge badgeContent={ProductsTotal.totalNumber} color="secondary">
              <Badge 
                badgeContent={`$${ProductsTotal.totalAmount}`}
                max={999}
                color="info"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
              >
                <ShoppingCart fontSize="large" />
              </Badge>
             </Badge>
          </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </Block>
  );
}
