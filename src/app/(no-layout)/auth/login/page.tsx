"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { isEmailAvailable } from "@/app/actions/auth";
import { User } from "@/types/user";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { revalidateAll } from "@/app/actions/revalidate";
import { authClient } from "@/lib/auth-client";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@react-hook/media-query";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
} from "@/components/ui/dialog";

const LoginSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters")
		.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
		.regex(/[a-z]/, "Password must contain at least one lowercase letter")
		.regex(/[0-9]/, "Password must contain at least one number"),
});

type LoginForm = z.infer<typeof LoginSchema>;

export default function Login() {
	const isDesktop = useMediaQuery("(min-width: 768px)");
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [clientError, setClientError] = useState("");
	const [serverError, setServerError] = useState("");

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginForm>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: LoginForm) => {
		console.log(values);
		try {
			setIsLoading(true);
			const doesEmailExist = await isEmailAvailable(values.email);
			if (!doesEmailExist) {
				setClientError("This email does not exist, please try again");
				setIsLoading(false);
				return;
			}

			console.log(values);
			const user: Partial<User> = {
				email: values.email,
				password: values.password,
			};

			const res = await authClient.signIn.email({
				email: user.email!,
				password: user.password!,
			});
			console.log(res);
			if (!res) {
				setServerError("Error Logging in");
			}

			// setRegistrationSuccess(true);
			setIsLoading(false);
			revalidateAll();
			setTimeout(() => {
				router.push("/");
			}, 2000);
		} catch (error) {
			console.error("login error:", error);
			setIsLoading(false);
		}
	};

	// const resetLink = async (values: LoginForm) => {
	//   const { data, error } = await authClient.forgetPassword({
	//     email: values.email,
	//     redirectTo: "auth/reset-password",
	//   });
	//   if (error) {
	//     console.log(error);
	//   }
	// };

	if (!isDesktop) {
		return (
			<div>
				<Drawer open={true}>
					<DrawerContent className="rounded-none">
						<DrawerHeader className="p-0">
							<DrawerTitle className="text-center text-3xl mb-2">
								Welcome Back
							</DrawerTitle>
							<hr className="h-2" />
						</DrawerHeader>
						<div className="min-h-screen flex justify-center   p-8">
							<div className="w-full max-w-md">
								{clientError && (
									<Alert variant="destructive" className="mb-6">
										<AlertDescription>{clientError}</AlertDescription>
									</Alert>
								)}

								{serverError && (
									<Alert variant="destructive" className="mb-6">
										<AlertDescription>{serverError}</AlertDescription>
									</Alert>
								)}

								<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
									<div className="">
										<Input
											type="email"
											className="py-8 rounded-md"
											placeholder="Email"
											{...register("email")}
										/>
									</div>

									<div className="relative">
										<Input
											placeholder="Password"
											id="password"
											className="py-8"
											type={showPassword ? "text" : "password"}
											autoComplete="new-password"
											{...register("password")}
											aria-invalid={errors.password ? "true" : "false"}
										/>
										<Button
											type="button"
											variant="ghost"
											size="sm"
											className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
											onClick={() => setShowPassword(!showPassword)}
											aria-label={
												showPassword ? "Hide password" : "Show password"
											}
										>
											{showPassword ? (
												<EyeOff className="h-4 w-4 text-gray-500" />
											) : (
												<Eye className="h-4 w-4 text-gray-500" />
											)}
										</Button>
									</div>
									{errors.password && (
										<p className="text-sm text-red-500 font-semibold">
											{errors.password.message}
										</p>
									)}

									{/* <div className="flex gap-3">
                    <hr className="basis-1/2 mt-3" />
                    or
                    <hr className="basis-1/2 mt-3" />
                  </div> */}

									<div>
										<a href="/auth/forget-password" className="font-bold underline">
											Forgot Password?
										</a>
									</div>
									<Button
										type="submit"
										className="w-full bg-emerald-900 hover:bg-emerald-700 py-6"
										disabled={isLoading}
									>
										{isLoading ? (
											<>
												<Loader2 className="mr-2 h-4 w-4 animate-spin" />
												Logging in...
											</>
										) : (
											"Log in"
										)}
									</Button>
									<p className="text-md text-gray-600 mt-3 text-center">
										Dont have an account
										<Link
											href="/auth/register"
											className="text-black underline font-medium pl-2"
										>
											Sign up
										</Link>
									</p>

									{/* <div className="w-full flex justify-between border py-6 px-4 rounded-md">
                    <svg
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      style={{ display: "block", height: 20, width: 20 }}
                      role="presentation"
                      focusable="false"
                    >
                      <g fill="none" fill-rule="nonzero">
                        <path
                          d="m31.36 16.36368c0-1.13456-.10176-2.22544-.29088-3.2728h-15.06912v6.18912h8.61088c-.37088 2-1.49808 3.69456-3.19264 4.82912v4.01456h5.17088c3.02544-2.78544 4.77088-6.88736 4.77088-11.76z"
                          fill="#4285f4"
                        ></path>
                        <path
                          d="m16 32c4.32 0 7.94176-1.4328 10.58896-3.87632l-5.17088-4.01456c-1.43264.96-3.26544 1.5272-5.41808 1.5272-4.16736 0-7.69456-2.81456-8.9528-6.59632h-5.34544v4.14544c2.6328 5.22912 8.04368 8.81456 14.29824 8.81456z"
                          fill="#34a853"
                        ></path>
                        <path
                          d="m7.0472 19.04c-.32-.96-.50176-1.98544-.50176-3.04s.18176-2.08.50176-3.04v-4.14544h-5.34544c-1.08352 2.16-1.70176 4.60368-1.70176 7.18544s.61824 5.02544 1.70176 7.18544z"
                          fill="#fbbc04"
                        ></path>
                        <path
                          d="m16 6.36368c2.34896 0 4.45808.8072 6.11632 2.39264l4.58912-4.58912c-2.77088-2.58176-6.3928-4.1672-10.70544-4.1672-6.25456 0-11.66544 3.58544-14.29824 8.81456l5.34544 4.14544c1.25824-3.78176 4.78544-6.59632 8.9528-6.59632z"
                          fill="#e94235"
                        ></path>
                      </g>
                    </svg>
                    <p className="text-center">Continue With Google</p>
                  </div> */}
								</form>
							</div>
						</div>

						<DrawerFooter>
							<DrawerClose className="text-right"></DrawerClose>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			</div>
		);
	}
	if (isDesktop) {
		return (
			<div>
				<Dialog defaultOpen={true}>
					<DialogTrigger className="absolute right-0 bottom-0"></DialogTrigger>
					<DialogContent className="rounded-none">
						<DialogHeader className="p-0">
							<DrawerTitle className="text-center text-3xl">
								Welcome Back
							</DrawerTitle>
						</DialogHeader>
						<div className=" flex justify-center   p-8">
							<div className="w-full max-w-md">
								{clientError && (
									<Alert variant="destructive" className="mb-6">
										<AlertDescription>{clientError}</AlertDescription>
									</Alert>
								)}

								{serverError && (
									<Alert variant="destructive" className="mb-6">
										<AlertDescription>{serverError}</AlertDescription>
									</Alert>
								)}

								<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
									<div className="">
										<Input
											type="email"
											className="py-8 rounded-md"
											placeholder="Email"
											{...register("email")}
										/>
									</div>

									<div className="relative">
										<Input
											placeholder="Password"
											id="password"
											className="py-8"
											type={showPassword ? "text" : "password"}
											autoComplete="new-password"
											{...register("password")}
											aria-invalid={errors.password ? "true" : "false"}
										/>
										<Button
											type="button"
											variant="ghost"
											size="sm"
											className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
											onClick={() => setShowPassword(!showPassword)}
											aria-label={
												showPassword ? "Hide password" : "Show password"
											}
										>
											{showPassword ? (
												<EyeOff className="h-4 w-4 text-gray-500" />
											) : (
												<Eye className="h-4 w-4 text-gray-500" />
											)}
										</Button>
									</div>
									{errors.password && (
										<p className="text-sm text-red-500 font-semibold">
											{errors.password.message}
										</p>
									)}

									{/* <div className="flex gap-3">
                    <hr className="basis-1/2 mt-3" />
                    or
                    <hr className="basis-1/2 mt-3" />
                  </div> */}

									<div>
										<a href="" className="font-bold underline">
											Forgot Password?
										</a>
									</div>
									<Button
										type="submit"
										className="w-full bg-emerald-900 hover:bg-emerald-700 py-6"
										disabled={isLoading}
									>
										{isLoading ? (
											<>
												<Loader2 className="mr-2 h-4 w-4 animate-spin" />
												Logging in...
											</>
										) : (
											"Log in"
										)}
									</Button>
									<p className="text-md text-gray-600 mt-3 text-center">
										Dont have an account
										<Link
											href="/auth/login"
											className="text-black underline font-medium pl-2"
										>
											Sign up
										</Link>
									</p>

									{/* <div className="w-full flex justify-between border py-6 px-4 rounded-md">
                    <svg
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      style={{ display: "block", height: 20, width: 20 }}
                      role="presentation"
                      focusable="false"
                    >
                      <g fill="none" fill-rule="nonzero">
                        <path
                          d="m31.36 16.36368c0-1.13456-.10176-2.22544-.29088-3.2728h-15.06912v6.18912h8.61088c-.37088 2-1.49808 3.69456-3.19264 4.82912v4.01456h5.17088c3.02544-2.78544 4.77088-6.88736 4.77088-11.76z"
                          fill="#4285f4"
                        ></path>
                        <path
                          d="m16 32c4.32 0 7.94176-1.4328 10.58896-3.87632l-5.17088-4.01456c-1.43264.96-3.26544 1.5272-5.41808 1.5272-4.16736 0-7.69456-2.81456-8.9528-6.59632h-5.34544v4.14544c2.6328 5.22912 8.04368 8.81456 14.29824 8.81456z"
                          fill="#34a853"
                        ></path>
                        <path
                          d="m7.0472 19.04c-.32-.96-.50176-1.98544-.50176-3.04s.18176-2.08.50176-3.04v-4.14544h-5.34544c-1.08352 2.16-1.70176 4.60368-1.70176 7.18544s.61824 5.02544 1.70176 7.18544z"
                          fill="#fbbc04"
                        ></path>
                        <path
                          d="m16 6.36368c2.34896 0 4.45808.8072 6.11632 2.39264l4.58912-4.58912c-2.77088-2.58176-6.3928-4.1672-10.70544-4.1672-6.25456 0-11.66544 3.58544-14.29824 8.81456l5.34544 4.14544c1.25824-3.78176 4.78544-6.59632 8.9528-6.59632z"
                          fill="#e94235"
                        ></path>
                      </g>
                    </svg>
                    <p className="text-center">Continue With Google</p>
                  </div> */}
								</form>
							</div>
						</div>

						{/* <DrawerFooter>
              <DrawerClose className="text-right"></DrawerClose>
            </DrawerFooter> */}
					</DialogContent>
				</Dialog>
			</div>
		);
	}
}
