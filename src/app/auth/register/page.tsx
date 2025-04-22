"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignUp } from "../action";
import { toast } from "sonner";

export interface RegisterForm {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export default function Register() {
  const session = authClient.useSession();
  //   if (!session.data) return null;

  const { register } = useForm<RegisterForm>({
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });
  useEffect(() => {
    console.log(session);
  }, [session]);

  const mutation = useMutation({
    mutationFn: async (formData: RegisterForm) => {
      await SignUp(formData);
    },
    onSuccess: (data) => {
      toast("login successful");
      // redirect
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const onSubmit: SubmitHandler<RegisterForm> = (formData) => {
    console.log(formData);
    mutation.mutate(formData);
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <form action="">
        <div>
          <label htmlFor="">Email</label>
          <input type="email" {...register("email")} />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input type="password" {...register("password")} />
        </div>
        <div>
          <label htmlFor="">First Name</label>
          <input type="text" {...register("firstName")} />
        </div>
        <div>
          <label htmlFor="">Last Name</label>
          <input type="text" {...register("lastName")} />
        </div>
        <Button className="bg-violet-400">Login</Button>
      </form>
    </div>
  );
}
