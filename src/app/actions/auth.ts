"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db/db";
import { user } from "@/lib/db/schema";
import { User } from "@/types/user";
import { eq } from "drizzle-orm";

export async function SignUp(user: User) {
  const res = await auth.api.signUpEmail({
    body: {
      email: user.email,
      password: user.password,
      name: `${user.firstname} ${user.lastname}`,
      is_admin: false,
    },
  });

  return res;
}

export async function isEmailAvailable(email: string) {
  const emailResult = await db.query.user.findFirst({
    where: eq(user.email, email),
  });
  if (emailResult) {
    return true;
  }
  return false;
}
