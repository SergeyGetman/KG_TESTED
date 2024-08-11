import { useState, useEffect } from "react";
import { useGetProductsQuery } from "@/store/products.api";
import { setProductsList } from "@/store/productsSlice";
import { selectProductsState } from "@/store/productsSlice";
import { useSelector, useDispatch } from "react-redux";
import Layout from "@/components/Layout";
import { Product } from '@/types/Product';
import { Buy } from '@/types/Buy';
import ProductList from "@/components/ProductList";

export default function Home() {
  const [products, setProducts] = useState<Buy[]>([]);
  const dispatch = useDispatch();
  let productList: Buy[] = [];
  const { isLoading, isError, isFetching, currentData } = useGetProductsQuery("");
  const currentProducts: any = useSelector(selectProductsState).productsList;
  
  useEffect(() => {
    if (currentData) {
      if (currentProducts.length === 0) {
        productList = currentData.map((product: Product) => ({ ...product, amount: 0}));
        setProducts(productList);
        dispatch(setProductsList(productList));
      }
    }
  }, [currentData]);
  useEffect(() => {
    if (currentProducts) {
      setProducts(currentProducts);
    }
  }, [currentProducts]);

  
  return (
    <>
      <Layout title="Home">
        <ProductList page='home' products={products} />
      </Layout>
    </>
  );
}
