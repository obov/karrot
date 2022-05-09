import type { NextPage } from "next";
import Button from "@components/button";
import Input from "@components/input";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import { useForm } from "react-hook-form";
import useMutaion from "@libs/client/useMutation";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Stream, User } from "@prisma/client";

interface StreamWithUser extends Stream {
  user: User;
}
interface CreateForm {
  name: string;
  price: string;
  description: string;
}
interface CreateResponse {
  ok: boolean;
  stream: StreamWithUser;
}

const Create: NextPage = () => {
  const router = useRouter();
  const [createStream, { data: json, loading: loadingLive }] =
    useMutaion<CreateResponse>(`/api/streams`);
  const { register, handleSubmit } = useForm<CreateForm>();
  const onValid = (form: CreateForm) => {
    if (loadingLive) return;
    createStream(form);
  };
  useEffect(() => {
    if (json && json.ok) {
      router.push(`/streams/${json.stream.id}`);
    }
  }, [json, router]);
  return (
    <Layout canGoBack title="Go Live">
      <form onSubmit={handleSubmit(onValid)} className=" space-y-4 py-10 px-4">
        <Input
          register={register("name", { required: true })}
          required
          label="Name"
          name="name"
          type="text"
        />
        <Input
          register={register("price", { required: true, valueAsNumber: true })}
          required
          label="Price"
          name="price"
          type="number"
          kind="price"
        />
        <TextArea
          register={register("description", { required: true })}
          name="description"
          label="Description"
        />
        <Button loading={loadingLive} text="Go live" />
      </form>
    </Layout>
  );
};

export default Create;
