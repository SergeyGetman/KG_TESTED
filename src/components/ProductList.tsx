import { Buy } from '@/types/Buy';
import { Props } from '@/types/Props';
import ProductCard from './ProductCard';

export default function ProductList(page: any, products: Buy[]) {
  const output = page.products.map((product: Buy) => {
    const props: Props = {
      id: product.id,
      product: product.product,
      price: product.price,
      quantity: product.quantity,
      amount: product.amount,
      page: page.page,
    };
        
    return <ProductCard key={product.id} data={props} />
  });
   
  return (
    <>
      {output}
    </>
  )
}