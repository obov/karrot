import type { NextPage } from "next";
import Layout from "@components/layout";
import FloatingButton from "@components/floating-button";
import Item from "@components/item";
import Head from "next/head";
import { Product } from "@prisma/client";
import Pagenation from "@components/pagination";
import usePage from "@libs/client/usePage";
import client from "@libs/server/client";
import { jsonSP } from "@libs/client/utils";
import { SWRConfig } from "swr";

export interface ProductWithCounts extends Product {
  _count: { [key: string]: number };
}

const Home: NextPage = () => {
  const [{ data: json }, pagination] =
    usePage<ProductWithCounts>("/api/products");
  return (
    <Layout title="home" hasTabBar seoTitle="Home">
      <div className="flex flex-col space-y-5 divide-y-2">
        {json?.list?.map((product) => (
          <Item
            id={product.id}
            key={product.id}
            imgId={product.image}
            title={product.name}
            price={product.price}
            comments={1}
            hearts={product._count?.favorites}
          />
        ))}
        <FloatingButton href="/products/upload">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloatingButton>
        <Pagenation {...pagination} />
      </div>
    </Layout>
  );
};

const Page: NextPage<{ list: ProductWithCounts[] }> = ({ list }) => {
  return (
    <SWRConfig
      value={{
        fallback: {
          "/api/products?page=0": {
            ok: true,
            list,
          },
        },
      }}
    >
      <Home />
    </SWRConfig>
  );
};
export const getServerSideProps = async () => {
  console.log("ssr");
  const products = await client.product.findMany({});
  return {
    props: { list: jsonSP(products) },
  };
};

export default Page;
