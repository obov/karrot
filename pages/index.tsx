import type { NextPage } from "next";
import Layout from "@components/layout";
import FloatingButton from "@components/floating-button";
import Item from "@components/item";
import Head from "next/head";
import { Product } from "@prisma/client";
import Pagenation from "@components/pagination";
import usePage from "@libs/client/usePage";

export interface ProductWithCounts extends Product {
  _count: { [key: string]: number };
}

const Home: NextPage = () => {
  const [{ data: json }, pagination] =
    usePage<ProductWithCounts>("/api/products");
  return (
    <Layout title="home" hasTabBar>
      <Head>
        <title>Home</title>
      </Head>
      <div className="flex flex-col space-y-5 divide-y-2">
        {json?.list?.map((product) => (
          <Item
            id={product.id}
            key={product.id}
            imgId={product.image}
            title={product.name}
            price={product.price}
            comments={1}
            hearts={product._count.favorites}
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

export default Home;
