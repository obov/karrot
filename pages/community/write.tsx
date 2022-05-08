import type { NextPage } from "next";
import Button from "@components/button";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import { useForm } from "react-hook-form";
import useMutaion from "@libs/client/useMutation";
import { useEffect } from "react";
import { Post } from "@prisma/client";
import { useRouter } from "next/router";
import useCoords from "@libs/client/useCoords";

interface WriteForm {
  question: string;
}
interface WriteResponse {
  ok: boolean;
  postEnlisted: Post;
}
const Write: NextPage = () => {
  const { latitude, longitude } = useCoords();
  const router = useRouter();
  const { register, handleSubmit } = useForm<WriteForm>();
  const [enlistPost, { loading, data: jsonPost }] =
    useMutaion<WriteResponse>("/api/posts");
  const onValid = (data: WriteForm) => {
    if (loading) return;
    enlistPost({ ...data, latitude, longitude });
  };
  useEffect(() => {
    if (jsonPost && jsonPost.ok) {
      router.push(`/community/${jsonPost.postEnlisted.id}`);
    }
  }, [jsonPost, router]);
  return (
    <Layout canGoBack title="Write Post">
      <form onSubmit={handleSubmit(onValid)} className="p-4 space-y-4">
        <TextArea
          register={register("question", { required: true, minLength: 5 })}
          required
          placeholder="Ask a question!"
        />
        <Button text={loading ? "loading..." : "Submit"} />
      </form>
    </Layout>
  );
};

export default Write;
