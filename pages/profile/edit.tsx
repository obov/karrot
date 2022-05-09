import type { NextPage } from "next";
import Button from "@components/button";
import Input from "@components/input";
import Layout from "@components/layout";
import useUser from "@libs/client/useUser";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useMutaion from "@libs/client/useMutation";

interface EditProfileForm {
  email?: string;
  phone?: string;
  name: string;
  formErrors?: string;
}
interface EditProfileResponse {
  ok: boolean;
  error?: string;
}

const EditProfile: NextPage = () => {
  const { user } = useUser();
  // get user data
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<EditProfileForm>(); // useForm setting
  useEffect(() => {
    if (user?.email) setValue("email", user.email);
    if (user?.phone) setValue("phone", user.phone);
    if (user?.name) setValue("name", user.name);
  }, [user, setValue]); // when page open show previous values
  const [editProfile, { data: jsonProfile, loading: loadingProfile }] =
    useMutaion<EditProfileResponse>(`/api/users/me`);
  const onValid = ({ email, phone, name }: EditProfileForm) => {
    if (loadingProfile) return;
    if (name === "")
      return setError("formErrors", {
        message: "Name should be submitted",
      });
    if (email === "" && phone === "")
      return setError("formErrors", {
        message: "Email or Phone number should be submitted",
      });
    editProfile({ email, phone, name });
  };
  useEffect(() => {
    if (jsonProfile && !jsonProfile.ok) {
      setError("formErrors", { message: jsonProfile.error });
    }
  }, [jsonProfile, setError]);

  return (
    <Layout canGoBack title="Edit Profile">
      <form onSubmit={handleSubmit(onValid)} className="py-10 px-4 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 rounded-full bg-slate-500" />
          <label
            htmlFor="picture"
            className="cursor-pointer py-2 px-3 border hover:bg-gray-50 border-gray-300 rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-gray-700"
          >
            Change
            <input
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <Input
          register={register("name")}
          required
          label="Name"
          name="name"
          type="text"
        />
        <Input
          register={register("email")}
          required={false}
          label="Email address"
          name="email"
          type="email"
        />
        <Input
          register={register("phone")}
          required={false}
          label="Phone number"
          name="phone"
          type="number"
          kind="phone"
        />
        {errors.formErrors ? (
          <span className="text-red-600 my-2 font-bold text-center block">
            {errors.formErrors.message}
          </span>
        ) : null}
        <Button
          onClick={() => clearErrors()}
          text="Update profile"
          loading={loadingProfile}
        />
      </form>
    </Layout>
  );
};

export default EditProfile;
