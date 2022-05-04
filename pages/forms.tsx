import { useForm, FieldErrors } from "react-hook-form";

interface LoginForm {
  username: string;
  password: string;
  email: string;
  errors?: string;
}

const Forms = () => {
  const { register, watch, handleSubmit,formState:{errors},setError } = useForm<LoginForm>();
  const onValid = (data: LoginForm) => {
    console.log("hi I'm Valid");
    setError("errors",{message:"Backed is offline"})
  };
  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
    
  };
  console.log("watch : ", watch());
  console.log('errors : ', errors);
  
  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <input
        {...register("username", {
          required: "Username is required",
          minLength: {
            message: "The username should be longer than 5 chars",
            value: 5,
          },
        })}
        type="text"
        placeholder="Username"
      />
      <input
        {...register("email", {
          required: "Email is required",
          validate: {
            notGmail: (value) =>
              !value.includes("@gmail.com") || "Gmail is not allowed",
          },
        })}
        type="email"
        placeholder="Email"
      />
      <input
        {...register("password", {
          required: "Password is required",
        })}
        type="password"
        placeholder="Password"
      />
      <input type="submit" value="submit" />
      {errors.errors?.message}
    </form>
  );
};

export default Forms;
