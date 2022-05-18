import type { NextPage } from "next";
import Item from "@components/item";
import Layout from "@components/layout";
import useSWR from "swr";
import { ProductWithCounts } from "pages";
import ProductList from "@components/product-list";

const Sold: NextPage = () => {
  return (
    <Layout title="판매내역" canGoBack seoTitle="Profile">
      <div className="flex flex-col space-y-5 pb-10  divide-y">
        <ProductList kind="sales" />
      </div>
    </Layout>
  );
};

export default Sold;
