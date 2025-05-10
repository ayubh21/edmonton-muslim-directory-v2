"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useEffect } from "react";
// import { useForm } from "react-hook-form";

export interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const session = authClient.useSession();

  // const { handleSubmit, setValue, watch } = useForm<LoginForm>();
  useEffect(() => {
    console.log(session);
  }, [session]);
  return (
    <div className="h-screen flex justify-center items-center">
      <form action="">
        <div>
          <label htmlFor="">Email</label>
          <Input type="email" />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <Input type="password" />
        </div>
        <Button className="bg-emerald-600">Login</Button>
      </form>
    </div>
  );
}
