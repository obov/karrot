import Layout from "@components/layout";
import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { GetStaticProps, NextPage } from "next";
import remarkHtml from "remark-html";
import remarkParse from "remark-parse";
import { unified } from "unified";

const Post: NextPage<{ post: string; data: any }> = ({ post, data }) => {
  return (
    <Layout title={data.title} seoTitle="Blog">
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: post }}
      />
    </Layout>
  );
};
export const getStaticPaths = () => {
  const blogPosts = readdirSync("./posts").map((file) => {
    const [slug] = file.split(".");
    return { params: { slug } };
  });
  return {
    paths: blogPosts,
    fallback: false,
  };
};
export const getStaticProps: GetStaticProps = async (context) => {
  const { content, data } = matter.read(`./posts/${context.params?.slug}.md`);
  const { value } = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(content);
  return {
    props: { data, post: value },
  };
};
export default Post;
