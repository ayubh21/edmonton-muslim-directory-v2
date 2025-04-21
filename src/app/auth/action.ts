import { authClient } from "@/lib/auth-client";
import { LoginForm } from "./login/page";
import { RegisterForm } from "./register/page";

// export async function SignIn(formData: ILoginForm) {
//   const { data, error } = await authClient.signIn.email({
//     email: formData.email,
//     password: formData.password,
//   });

//   if (error) {
//     throw new Error("failed to create user");
//   }
// }

export async function SignUp(formData: RegisterForm) {
  const { data, error } = await authClient.signUp.email({
    email: formData.email,
    password: formData.password,
    company_name: formData.companyName,
    name: formData.firstName + " " + formData.lastName,
  });

  if (error || !data) {
    throw new Error("failed to create user");
  }
}
