import { useState, useEffect } from "react";
import { selectProductsState } from "@/store/productsSlice";
import { setProductsList } from "@/store/productsSlice";
import { useSelector, useDispatch } from "react-redux";
import Layout from "@/components/Layout";
import { Buy } from '@/types/Buy';
import ProductList from "@/components/ProductList";

export default function Cart() {
  const [products, setProducts] = useState<Buy[]>([]);
  const currentProducts: any = useSelector(selectProductsState).productsList;
  let storage: any = [];
  const dispatch = useDispatch();
  
  if (typeof window !== 'undefined' && currentProducts.length === 0) {
    storage = localStorage.getItem('storage');
    storage = JSON.parse(storage);
  };

  useEffect(() => {
    if (currentProducts.length !== 0) {
      localStorage.setItem('storage', JSON.stringify(currentProducts));
      setProducts(currentProducts);
    } else {
      setProducts(storage);
      dispatch(setProductsList(storage));
    }
  }, [currentProducts]);
    return (
      <>
        <Layout title="Cart">
           <ProductList page='cart' products={products} />
        </Layout>
      </>
    );
  }