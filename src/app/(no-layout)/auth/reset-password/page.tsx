"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"


const resetPasswordSchema = z.object({
	password: z
		.string()
		.min(8, "Password must be at least 8 characters")
		.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
		.regex(/[a-z]/, "Password must contain at least one lowercase letter")
		.regex(/[0-9]/, "Password must contain at least one number"),
	confirmPassword: z
		.string()
		.min(8, "Password must be at least 8 characters")
		.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
		.regex(/[a-z]/, "Password must contain at least one lowercase letter")
		.regex(/[0-9]/, "Password must contain at least one number"),
})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});


type ResetPasswordForm = z.infer<typeof resetPasswordSchema>
export default function ForgotPassword() {
	const searchParams = useSearchParams()
	const token = searchParams.get('token')
	if (!token) return null;

	const router = useRouter()
	const [isSuccessful, setIsSuccessful] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);


	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ResetPasswordForm>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
	});



	const onSubmit = async (values: ResetPasswordForm) => {
		setIsLoading(true);
		const { data, error } = await authClient.resetPassword({
			newPassword: values.confirmPassword,
			token,
		});

		if (error) {
			console.log("failed to send password reset link ")
		}
		setIsSuccessful(true)
		router.push('/')
		console.log(data)
	}

	return (
		<>
			<h2 className="text-2xl font-semibold text-emerald-700 p-6">
				<Link href="/"
					className="text-3xl"
				>
					Edmonton Khair <span className="text-black">Network</span>
				</Link>
			</h2>
			<div className="mt-20 w-full flex justify-center items-center px-6">
				<div className=" w-[450px]">
					<div className="space-y-6">
						{!isSuccessful && <div>
							<h2 className="text-gray-800 text-4xl  font-bold text-left mx-auto mb-20">Create your new password</h2>

							<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full flex  flex-col justify-center">
								<Card className=" w-full">
									<CardHeader>
										<CardDescription className="text-gray-700
						text-lg	">Enter the email associated with your account to reset your password</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="space-y-2">
											<Label htmlFor="password">Password</Label>
											<div className="relative">
												<Input
													id="password"
													type={showPassword ? "text" : "password"}
													autoComplete="new-password"
													{...register("password")}
												/>

												<Button
													type="button"
													variant="ghost"
													size="sm"
													className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
													onClick={() => setShowPassword(!showPassword)}
													aria-label={showPassword ? "Hide password" : "Show password"}
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

											<div className="space-y-2">
												<Label htmlFor="confirmPassword">Confirm Password</Label>
												<div className="relative">
													<Input
														id="confirmPassword"
														type={showConfirmPassword ? "text" : "password"}
														autoComplete="new-password"
														{...register("confirmPassword")}
														aria-invalid={errors.confirmPassword ? "true" : "false"}
													/>
													<Button
														type="button"
														variant="ghost"
														size="sm"
														className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
														onClick={() => setShowConfirmPassword(!showConfirmPassword)}
														aria-label={
															showConfirmPassword ? "Hide password" : "Show password"
														}
													>
														{showConfirmPassword ? (
															<EyeOff className="h-4 w-4 text-gray-500" />
														) : (
															<Eye className="h-4 w-4 text-gray-500" />
														)}
													</Button>
												</div>
												{errors.confirmPassword && (
													<p className="text-sm text-red-500">
														{errors.confirmPassword.message}
													</p>
												)}
											</div>
										</div>
									</CardContent>

								</Card>
								<div className="w-full flex justify-center ">
									<Button type="submit" className=" items-center w-60 py-6 px-20 bg-emerald-900 hover:bg-emerald-600">

										{isLoading ? (
											<>
												<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											</>
										) : (
											"Save Changes and sign in"
										)}

									</Button>
								</div>
							</form>
						</div>}

					</div >
				</div>
			</div>

		</>
	)

}
