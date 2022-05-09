import { ProductWithCounts } from "pages";
import useSWR from "swr";
import Item from "./item";

interface Records {
  id: number;
  product: ProductWithCounts;
}
type KindsOfProduct = "sales" | "boughts" | "favorites";

const ProductList = ({ kind }: { kind: KindsOfProduct }) => {
  const { data: json } = useSWR<Record<KindsOfProduct, Records[]>>(
    `/api/users/me/${kind}`
  );
  return json ? (
    <>
      {json[kind]?.map((item) => (
        <Item
          id={item.id}
          key={item.id}
          title={item.product.name}
          price={item.product.price}
          comments={item.product._count.favorites}
          hearts={item.product._count.favorites}
        />
      ))}
    </>
  ) : null;
};

export default ProductList;
