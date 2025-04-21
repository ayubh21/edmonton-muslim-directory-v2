"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const session = authClient.useSession();
  //   if (!session.data) return null;

  const { handleSubmit, setValue, watch } = useForm<LoginForm>();
  useEffect(() => {
    console.log(session);
  }, [session]);
  return (
    <div className="h-screen flex justify-center items-center">
      <form action="">
        <div>
          <label htmlFor="">Email</label>
          <input type="email" />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input type="password" />
        </div>
        <Button className="bg-violet-400">Login</Button>
      </form>
    </div>
  );
}
