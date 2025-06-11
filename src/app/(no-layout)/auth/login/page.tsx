"use client";

import { useEffect, useState } from "react";
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
import { useMediaQuery } from "@react-hook/media-query";
import dynamic from "next/dynamic";
import LoadingComponent from "@/components/loading-indicator";

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

	return (
		<div>
			<div className="text-center text-3xl my-6">
				Welcome Back
			</div>
			<hr className="h-2 mb-6 w-full" />
			<div className="min-h-screen flex justify-center p-8">
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
								{!showPassword ? (
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

						<div>
							<a href="/auth/forget-password" className="font-bold underline">
								Forgot Password?
							</a>
						</div>
						<Button
							type="submit"
							className="w-full hover:bg-emerald-700 py-6 bg-gradient-to-r from-emerald-600 to-emerald-700"
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
							Don &apos;t have an account?
							<Link
								href="/auth/register"
								className="text-black underline font-medium pl-2"
							>
								Sign up
							</Link>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
}
